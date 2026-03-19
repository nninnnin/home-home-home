# 3D 에디터 아키텍처 설계 노트

## 3D 에디터의 주요 설계 엘리먼트

1. **Scene Graph / State Core** — 씬에 무엇이 있는지를 관리하는 단일 진실 공급원. 오브젝트 목록, 계층 구조, 각 오브젝트의 transform/속성.
2. **Renderer / Viewport** — Scene Graph를 받아서 실제로 그리는 부분. R3F에서는 Canvas + Three.js.
3. **Selection & Interaction** — Raycasting, 선택 상태, 트랜스폼 기즈모.
4. **Command / History** — 모든 조작을 Command 객체로 감싸서 Undo/Redo를 가능하게 함.
5. **Inspector / Property Panel** — 선택된 오브젝트의 속성을 읽고 쓰는 UI. Scene Graph와 양방향 바인딩.
6. **Asset / Resource Manager** — 텍스처, 모델, 사운드 리소스 관리.
7. **Toolbar / Mode Manager** — 현재 어떤 툴/모드인지 관리.

현재 프로젝트에서 필요한 것: **1, 2, 3, 5, 7**. Command/History(4)는 편집 기능 붙을 때 필요해짐.

---

## 현재 상태

Scene Graph가 없음. 가구들이 `Room.tsx` 안에 하드코딩된 JSX로 존재.

```tsx
<Desk position={[-1.5, 0, -1.5]} />
<LPPlayer position={[1.2, 0, -1.5]} />
<Frame position={[-2.9, 1.8, -0.5]} />
```

씬에 뭐가 있는지, 각 오브젝트의 상태를 나타내는 **데이터 자체가 없고**, 렌더링 코드가 곧 씬 정의인 상황. 선택된 오브젝트의 속성을 읽거나 수정하려면 "데이터"가 먼저 있어야 함.

---

## 처음부터 제대로 잡아야 하는 것 vs 만들면서 갖춰가도 되는 것

### 처음부터 잡아야 함

- **Scene Graph 데이터 모델** — 나중에 구조를 바꾸면 선택, 편집 패널, 저장, 렌더링이 전부 연쇄적으로 깨짐.
- **Command / History** — 나중에 끼워넣으려면 기존 모든 상태 변경 코드를 다 갈아엎어야 함. 처음부터 "상태 변경 = Command 실행"으로 잡아두면 Undo/Redo가 자연스럽게 붙음.

### 만들면서 갖춰가도 됨

- 시각적 피드백 (hover, outline, dimming)
- EditMode UI / Inspector 패널 레이아웃
- 카메라 포커스 이동 애니메이션
- Asset 관리

---

## 다음 결정 사항

Scene Graph 데이터 모델을 먼저 설계하고, Command 패턴은 편집 기능 붙일 때 도입할지 — 아니면 둘 다 지금 잡을지.
