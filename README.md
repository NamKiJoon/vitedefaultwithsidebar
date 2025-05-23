# Vite + TypeScript + MUI + Styled-Components + TanStack Router 프로젝트

이 프로젝트는 React(Vite 기반)에서 TypeScript, Material UI(MUI), styled-components, TanStack Router를 활용한 예제입니다.

---

## 기술 스택

- Vite
- TypeScript
- MUI (Material UI)
- styled-components
- TanStack Router

---

## 폴더 구조

```
src/
├── components/             # 재사용 가능한 UI 컴포넌트
│   └── Contents/           # 데이터 편집 컴포넌트 (복합 기능)
│       ├── Contents.tsx                    # 메인 컴포넌트 (80줄)
│       ├── ContentsHook.ts                 # 커스텀 훅 모음 (400줄)
│       ├── ContentsApi.ts                  # API 호출 훅
│       ├── Contents.styles.ts              # 스타일 컴포넌트
│       ├── tableStyles.ts                  # 테이블 스타일
│       └── table/                          # 테이블 관련 컴포넌트들
│           ├── DataTable.tsx               # 개별 테이블 컴포넌트
│           ├── DataTables.tsx              # 좌우 테이블 묶음
│           ├── DataViewer.tsx              # 데이터 표시 컴포넌트
│           ├── DataEditor.tsx              # 편집 모드 컴포넌트
│           ├── DataViewerSection.tsx       # 좌우 뷰어 묶음
│           └── PreviewTableSection.tsx     # 미리보기 테이블
├── layout/
│   ├── HomeLayout.tsx      # AppBar, Drawer 포함된 메인 레이아웃
│   └── HomeLayout.styles.ts# styled-components로 분리된 스타일 정의
├── pages/
│   ├── Home.tsx            # '/' 경로 페이지
│   ├── Home.styles.ts      # Home styles components
│   └── About.tsx           # '/about' 경로 페이지
├── router/
│   └── router.tsx          # TanStack Router 설정
├── App.tsx                 # React 앱 진입점
└── main.tsx                # RouterProvider 적용
```

---

## 실행 방법

```bash
# 패키지 설치
yarn

# 개발 서버 실행
yarn dev
```

---

## 프로젝트 특징

- MainLayout에서 Drawer + AppBar + Outlet 조합으로 공통 레이아웃 구성
- TanStack Router의 Outlet을 통해 페이지 라우팅 처리
- 스타일은 모두 styled-components로 분리하여 관리

---

## Contents 컴포넌트 (데이터 편집 시스템)

### 컴포넌트 구조

```
Contents (메인)
├── DateRangeSelector           # 날짜 선택
├── MatchingModeToggle          # 매칭 모드 토글
├── DataTables                  # 좌우 테이블
│   ├── DataTable (Left)        # 좌측 테이블 (편집 대상)
│   └── DataTable (Right)       # 우측 테이블 (참조용)
├── DataViewerSection           # 데이터 뷰어
│   ├── DataViewer (Left)       # 좌측 데이터 표시 + 편집
│   └── DataViewer (Right)      # 우측 데이터 표시
└── PreviewTableSection         # 미리보기 테이블
```

### 🔧 훅 기반 상태 관리

#### ContentsHook.ts의 5개 훅

1. **`useDateRange()`**: 날짜 선택 상태 관리
2. **`useContentsData()`**: API 데이터 호출 및 관리
3. **`useTableSelection()`**: 테이블 클릭 핸들러 + 매칭 로직
4. **`useDataEditor()`**: 편집 모드 상태 관리
5. **`usePreviewData()`**: 미리보기 데이터 + 저장 로직

### 📊 데이터 흐름

```
API 호출 → 데이터 초기화 → 테이블 렌더링 → 사용자 클릭 →
데이터 편집 → 미리보기 추가 → 최종 저장
```

#### 매칭 필드 변경 가능

```typescript
// 현재: ID 매칭
leftData.id === rightData.id;

// 향후 확장 예시
leftData.es_id === rightData.id; // 다른 필드 매칭
leftData.title === rightData.title; // 제목으로 매칭
```

#### 컴포넌트 재사용

- `DataTable`, `DataEditor`, `DataViewer`는 독립적으로 재사용 가능
- 각 훅은 다른 컴포넌트에서도 활용 가능

#### Props Drilling 구조

```
각 페이지 (전체 상태) → 중간 컴포넌트 (전달) → UI 컴포넌트 (사용)
```

#### 관심사 분리

- **메인 컴포넌트**: 컴포넌트 조합만
- **훅**: 비즈니스 로직 담당
- **UI 컴포넌트**: 렌더링만 담당
