# ✨ JKLEE Portfolio (이재광 포트폴리오)

> **"디자인과 코드의 경계를 허무는 20년 차 UI/UX 디자이너 겸 웹 퍼블리셔"**  
> 모던 인터랙티브 웹 기술(React 19, Vite, GSAP, WebGL Shader, Lenis, Tailwind CSS v4)을 집약하여 구축한 인터랙티브 포트폴리오 웹사이트입니다.

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02?style=flat-square&logo=greensock&logoColor=white)](https://greensock.com/gsap/)
[![Lenis](https://img.shields.io/badge/Lenis-Smooth_Scroll-black?style=flat-square)](https://lenis.darkroom.engineering/)

---

## 🌟 주요 특징 (Key Features)

- **🎨 WebGL Liquid Shader Hero**: 
  - 커스텀 프래그먼트 셰이더(`hero-liquid.frag`) 기반의 생동감 넘치는 반응형 리퀴드 배경 애니메이션 구현.
- **🚀 부드러운 스크롤 & 모션 인터랙션 (Smooth Motion)**:
  - **Lenis Smooth Scroll**과 **GSAP ScrollTrigger**를 연동하여 극대화된 스크롤 모션 및 시각적 깊이감 제공.
- **⚡ 최신 프론트엔드 스택**:
  - React 19 및 Vite 초고속 번들러, 최신 Tailwind CSS v4 엔진 적용.
- **📱 반응형 웹 & 웹 접근성 (Responsive & A11y)**:
  - 데스크톱, 태블릿, 모바일 전 기기 완벽 대응 및 `prefers-reduced-motion` 모션 배려 설정.
- **💼 풍부한 포트폴리오 쇼케이스**:
  - 20여 년간 공공기관, 대기업, 이커머스 등 다양한 분야에서 구축한 프로젝트의 기여도 및 기술 상세 아카이빙.

---

## 🛠 기술 스택 (Tech Stack)

### Core & Framework
- **Language**: JavaScript (ESNext)
- **Framework**: [React 19](https://react.dev/)
- **Bundler**: [Vite 8](https://vite.dev/)

### Styling & Motion
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`)
- **Animation**: [GSAP 3](https://greensock.com/gsap/) (`gsap`, `@gsap/react`), [ScrollTrigger](https://greensock.com/scrolltrigger/)
- **Smooth Scroll**: [@studio-freight/lenis (Lenis)](https://lenis.darkroom.engineering/)
- **Graphics**: WebGL Custom Fragment Shader

### Code Quality & Tools
- **Linter**: [Oxlint](https://oxc.rs/)

---

## 📂 프로젝트 구조 (Project Structure)

```text
portfolio_framer/
├── public/                 # 정적 리소스 (파비콘, 이미지, 비디오 등)
├── src/
│   ├── assets/             # 로고 및 번들링 에셋
│   ├── components/         # 컴포넌트 단위 구성
│   │   ├── sections/       # 페이지별 주요 섹션 컴포넌트
│   │   │   ├── Hero.jsx        # 히어로 인터랙션 섹션
│   │   │   ├── About.jsx       # 소개 및 철학
│   │   │   ├── Services.jsx    # 제공 서비스 및 역량
│   │   │   ├── Projects.jsx    # 프로젝트 갤러리 및 상세 쇼케이스
│   │   │   ├── Career.jsx      # 20년 경력 타임라인
│   │   │   ├── Contact.jsx     # 프로젝트 문의 폼
│   │   │   └── ...
│   │   ├── Header.jsx      # 글로벌 네비게이션 헤더
│   │   ├── Footer.jsx      # 푸터
│   │   ├── HeroBg.jsx      # WebGL 리퀴드 셰이더 캔버스
│   │   └── Preloader.jsx   # 인트로 프리로더 애니메이션
│   ├── data/               # 포트폴리오 및 사이트 메타데이터
│   │   ├── portfolio.js    # 프로젝트 이력 및 경력 상세 데이터
│   │   └── site.js         # 섹션 문구 및 브랜드 구성
│   ├── lib/                # 모션 및 유틸리티 라이브러리
│   │   ├── gsap.js         # GSAP 및 ScrollTrigger 등록 모듈
│   │   └── lenis.js        # Lenis 부드러운 스크롤 인스턴스 팩토리
│   ├── shaders/            # WebGL 셰이더 소스코드
│   │   └── hero-liquid.frag# 리퀴드 셰이더
│   ├── App.jsx             # 메인 앱 레이아웃
│   ├── index.css           # 글로벌 스타일 및 Tailwind CSS 설정
│   └── main.jsx            # 엔트리 포인트
├── index.html              # HTML 템플릿
├── vite.config.js          # Vite 빌드 설정
└── package.json            # 프로젝트 의존성 및 스크립트 정의
```

---

## 🚀 시작하기 (Getting Started)

### 1. 레포지토리 클론 (Clone)

```bash
git clone https://github.com/lebass98/portfolio.git
cd portfolio
```

### 2. 패키지 설치 (Install Dependencies)

```bash
npm install
```

### 3. 개발 서버 실행 (Development Server)

```bash
npm run dev
```
브라우저에서 `http://localhost:5173`으로 접속하여 확인합니다.

### 4. 프로덕션 빌드 (Production Build)

```bash
npm run build
```
빌드된 정적 파일은 `dist/` 폴더에 생성됩니다.

---

## 📬 연락처 (Contact)

- **Name**: 이재광 (JKLEE)
- **Email**: dongbookro@gmail.com
- **Phone**: 010-5244-1251
- **Company**: 워드앤코드 (WordNcode)
- **Portfolio Archive**: [https://lebass98.github.io/Portfolio_2026/](https://lebass98.github.io/Portfolio_2026/)
- **GitHub**: [https://github.com/lebass98](https://github.com/lebass98)
