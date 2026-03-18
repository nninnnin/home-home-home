# home-home-home: Project Blueprint

## 1. Vision & Philosophy

| | |
|---|---|
| **Concept** | "A digital home, not a social feed." |
| **Mission** | 소프트웨어가 아닌 **'공간'**을 소유하는 감각을 제공 |
| **Atmosphere** | 싸이월드의 정서 + 현대적인 3D 미니멀리즘 + 공원 같은 평온함 |

---

## 2. Core Features (The 3-Home Layer)

### Layer 1 — Entrance
캐릭터 기반의 3D 진입 연출 **(Threshold)**

### Layer 2 — Living Room
가구(Object)와 데이터(CMS)의 결합

| 가구 | 기능 |
|---|---|
| Desk | Text / Notes |
| Frame | Image / Gallery |
| LP Player | Music / Media |

### Layer 3 — Archive
과거의 기록이 쌓여있는 다락방/지하실 (Table-based data)

---

## 3. Technical Stack

| 영역 | 기술 |
|---|---|
| **Frontend** | Next.js (App Router), React Three Fiber (R3F), Three.js |
| **State & Sync** | IndexedDB (Local-first), TanStack Query |
| **Styling** | Tailwind CSS, Framer Motion (Micro-interactions) |
| **Backend/CMS** | Notion API or Self-hosted SQLite (Portability focus) |

---

## 4. Design Principles

| 원칙 | 설명 |
|---|---|
| **Pixel-Perfect Objects** | Low-poly 3D + Pixel texture (물성이 느껴지는 가구) |
| **Natural Light** | 실시간 시간에 따른 조도 및 그림자 변화 |
| **Tactile Feedback** | 가구 클릭 시의 미세한 사운드와 햅틱 반응 |
| **No Clutter** | 불필요한 알림이나 대시보드 배제 (Visual Silence) |

---

## 5. Development Roadmap

| Phase | 이름 | 내용 |
|---|---|---|
| **Phase 1** | The Room | 단일 3D 방 구현 및 캐릭터 이동 로직 |
| **Phase 2** | The Furniture | 가구 클릭 시 나타나는 정갈한 CMS 입력창 UI |
| **Phase 3** | The Key | 독립된 URL 배포 및 로컬 데이터 영속성 확보 |
| **Phase 4** | The Neighborhood | '문'을 통한 느슨한 타인 주거지 연결 (파도타기) |
