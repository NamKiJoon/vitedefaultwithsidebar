# Vite + TypeScript + MUI + Styled-Components + TanStack Router 프로젝트

이 프로젝트는 React(Vite 기반)에서 TypeScript, Material UI(MUI), styled-components, TanStack Router를 활용하여 사이드바 레이아웃과 반응형 라우팅을 구현한 예제입니다.

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
