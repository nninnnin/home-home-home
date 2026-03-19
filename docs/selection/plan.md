# Selection 시스템 설계 플랜

## 목차

1. [데이터 모델 — Selectable](#1-데이터-모델--selectable)
2. [선택 상태 관리](#2-선택-상태-관리)
3. [Raycasting 방식](#3-raycasting-방식)
4. [EditMode와 선택의 관계](#4-editmode와-선택의-관계)
5. [시각적 피드백](#5-시각적-피드백)
6. [파일 구조](#6-파일-구조)
7. [단계별 구현 계획](#7-단계별-구현-계획)

---

## 1. 데이터 모델 — Selectable

### `src/lib/selectable.ts`

```ts
export type SelectableId = 'desk' | 'lp-player' | 'frame' | 'bird'

export type EditPanelType = 'notes' | 'gallery' | 'music' | 'none'

export interface SelectableMeta {
  id: SelectableId
  label: string           // "책상", "LP 플레이어" — 툴팁, 패널 헤더용
  panel: EditPanelType    // 선택 시 열릴 편집 패널 종류
  cameraFocus?: {         // 선택 시 카메라 목표 위치 (Phase 2)
    position: [number, number, number]
    target: [number, number, number]
  }
}

export const SELECTABLE_REGISTRY: Record<SelectableId, SelectableMeta> = {
  'desk':      { id: 'desk',      label: '책상',        panel: 'notes',   cameraFocus: { ... } },
  'lp-player': { id: 'lp-player', label: 'LP 플레이어', panel: 'music',   cameraFocus: { ... } },
  'frame':     { id: 'frame',     label: '액자',        panel: 'gallery', cameraFocus: { ... } },
  'bird':      { id: 'bird',      label: '새',          panel: 'none' },
}
```

- `SelectableId`를 string literal union으로 고정해 오타를 컴파일 타임에 잡는다
- `cameraFocus`를 메타에 넣어 카메라 이동 로직이 컴포넌트에 분산되지 않는다
- `panel: 'none'`으로 선택은 되지만 편집창이 없는 오브젝트도 표현 가능

---

## 2. 선택 상태 관리

기존 `cameraStorage.ts`의 CustomEvent 패턴을 그대로 따른다.

### `src/lib/selectionState.ts`

```ts
// 모듈 스코프 단일 상태 — Zustand 불필요
const state = {
  selectedId: null as SelectableId | null,
  isEditMode: false,
}

export const getSelectedId  = () => state.selectedId
export const getIsEditMode  = () => state.isEditMode

export function selectObject(id: SelectableId | null) {
  state.selectedId = id
  window.dispatchEvent(new CustomEvent('selection-changed', { detail: { id } }))
}

export function enterEditMode() {
  state.isEditMode = true
  window.dispatchEvent(new Event('editmode-enter'))
}

export function exitEditMode() {
  state.isEditMode = false
  state.selectedId = null
  window.dispatchEvent(new Event('editmode-exit'))
}
```

### `src/lib/useSelection.ts`

React 컴포넌트가 구독할 수 있는 훅. `SaveToast.tsx`의 CustomEvent 구독 패턴과 동일.

```ts
export function useSelection() {
  const [selectedId, setSelectedId] = useState<SelectableId | null>(getSelectedId)
  const [isEditMode, setIsEditMode]  = useState(getIsEditMode)

  useEffect(() => {
    const onChanged = (e: Event) => setSelectedId((e as CustomEvent).detail.id)
    const onEnter   = () => setIsEditMode(true)
    const onExit    = () => { setIsEditMode(false); setSelectedId(null) }

    window.addEventListener('selection-changed', onChanged)
    window.addEventListener('editmode-enter', onEnter)
    window.addEventListener('editmode-exit',  onExit)
    return () => { /* removeEventListener */ }
  }, [])

  return { selectedId, isEditMode }
}
```

---

## 3. Raycasting 방식

**결정: group `onClick` + `e.stopPropagation()`**

R3F의 이벤트는 mesh → group으로 자동 버블링된다.
모든 가구가 이미 `<group>` 구조이므로, group 레벨에 이벤트 하나만 달면 충분.

```tsx
// Desk.tsx
<group
  onClick={(e) => { e.stopPropagation(); selectObject('desk') }}
  onPointerEnter={() => (document.body.style.cursor = 'pointer')}
  onPointerLeave={() => (document.body.style.cursor = 'auto')}
>
```

**배경 클릭으로 선택 해제:**

```tsx
// Scene.tsx
<Canvas onPointerMissed={() => selectObject(null)} ...>
```

`onPointerMissed`는 어떤 mesh도 hit하지 않은 클릭에서만 발생하는 R3F 공식 이벤트.

---

## 4. EditMode와 선택의 관계

```
[기본 탐색]
    │ 가구 클릭
    ▼
[선택됨] ── 배경 클릭 / ESC ──▶ [선택 해제]
    │ "편집" 버튼 or 더블클릭
    ▼
[EditMode] ── ESC / 닫기 ──▶ [기본 탐색]
    ├── OrbitControls 비활성화
    └── 편집 패널 표시
```

| 동작              | 기본 탐색 | 선택됨 | EditMode     |
|-------------------|-----------|--------|--------------|
| OrbitControls     | 활성       | 활성   | **비활성**   |
| 가구 클릭         | 선택       | 재선택 | 패널 이벤트만 |
| ESC               | —          | 선택해제 | EditMode 종료 |

**OrbitControls 제어:**

Canvas 내부에서만 `useThree().controls`에 접근 가능하므로,
`SelectionController` 컴포넌트를 Canvas 안에 마운트해서 `enabled`를 토글한다.

```tsx
// src/scene/SelectionController.tsx
export function SelectionController() {
  const { controls } = useThree()
  const { isEditMode } = useSelection()

  useEffect(() => {
    if (controls) (controls as any).enabled = !isEditMode
  }, [isEditMode, controls])

  return null
}
```

---

## 5. 시각적 피드백

### Hover — emissive 보간 (useFrame)

```ts
// src/scene/hooks/useSelectableObject.ts
useFrame(() => {
  const target = isHovered.current ? 0.08 : 0.0
  groupRef.current.traverse((child) => {
    if (child instanceof Mesh && child.material instanceof MeshStandardMaterial) {
      child.material.emissiveIntensity +=
        (target - child.material.emissiveIntensity) * 0.12
    }
  })
})
```

### 선택됨 — `drei Outlines`

```tsx
import { Outlines } from '@react-three/drei'

// 가구 group 안에 조건부 렌더링
{isSelected && <Outlines thickness={0.015} color="#f5f0e8" opacity={0.6} />}
```

### 공통 훅 — `useSelectableObject`

hover/click 이벤트 바인딩을 가구마다 반복하지 않도록 훅으로 추출.

```ts
const { groupRef, onClick, onPointerEnter, onPointerLeave } =
  useSelectableObject('desk')
```

---

## 6. 파일 구조

```
src/
├── lib/
│   ├── selectable.ts               [신규] SelectableId, SelectableMeta, REGISTRY
│   ├── selectionState.ts           [신규] 모듈 스코프 state + CustomEvent 발행
│   └── useSelection.ts             [신규] React hook
│
├── scene/
│   ├── Scene.tsx                   [수정] onPointerMissed, SelectionController 추가
│   ├── SelectionController.tsx     [신규] OrbitControls enable/disable
│   ├── hooks/
│   │   └── useSelectableObject.ts  [신규] hover/click 공통 로직
│   ├── Desk.tsx                    [수정] useSelectableObject 적용
│   ├── LPPlayer.tsx                [수정] useSelectableObject 적용
│   └── Frame.tsx                   [수정] useSelectableObject 적용
│
└── tools/
    ├── ToolsUI.tsx                 [수정] EditMode 시 툴 숨김
    └── SelectionOverlay.tsx        [신규] 선택 오브젝트 이름 + "편집" 버튼 HUD
```

---

## 7. 단계별 구현 계획

### Step 1 — 데이터 모델 및 상태 기반

- `lib/selectable.ts`
- `lib/selectionState.ts`
- `lib/useSelection.ts`

검증: `tsc --noEmit` 통과

### Step 2 — 가구에 선택 이벤트 연결

- `scene/hooks/useSelectableObject.ts`
- `Desk`, `LPPlayer`, `Frame`에 `useSelectableObject` 적용
- `Scene.tsx`에 `onPointerMissed` 추가

검증: 클릭 시 콘솔에 선택 ID 출력, 배경 클릭 시 null

### Step 3 — 시각적 피드백

- hover emissive 보간 동작 확인
- drei `Outlines` 조건부 렌더링
- `tools/SelectionOverlay.tsx` — 선택 오브젝트 라벨 표시

### Step 4 — EditMode 골격

- `scene/SelectionController.tsx`
- `SelectionOverlay`에 "편집" 버튼 추가
- `App.tsx`에 ESC 키 전역 핸들러

검증: EditMode 진입 시 카메라 회전 불가, ESC로 복귀

---

## 설계 결정 요약

| 항목 | 결정 | 이유 |
|------|------|------|
| 상태 관리 | 모듈 스코프 + CustomEvent | 기존 cameraStorage 패턴 일관성 |
| Raycasting | group `onClick` + stopPropagation | 현재 가구 구조와 자연스럽게 정합 |
| 배경 클릭 해제 | `Canvas onPointerMissed` | R3F 공식 API, 별도 Raycaster 불필요 |
| Hover 피드백 | `useFrame` emissive 보간 | geometry clone 없이 부드러운 전환 |
| 선택 피드백 | `drei Outlines` | 기존 의존성, Low-poly 가구에 적합 |
| EditMode 제어 | `SelectionController` (Canvas 내부) | `useThree` 접근이 Canvas 내부에서만 가능 |
