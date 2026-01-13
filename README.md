# Typing Practice Frontend

영어 타자 연습 애플리케이션의 프론트엔드입니다.
React와 Vite를 사용하여 빠르고 현대적인 웹 환경을 제공합니다.

## 🛠 기술 스택 (Tech Stack)
- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Vanilla CSS (Glassmorphism Design)
- **HTTP Client**: Axios
- **Routing**: React Router DOM

## ⚙️ 설치 방법 (Installation)

프로젝트 루트(`TypingPractice/frontend`)에서 의존성을 설치합니다.

```bash
npm install
```

## 🚀 실행 방법 (Run)

개발 서버를 실행합니다.

```bash
npm run dev
```

브라우저에서 `http://localhost:5173`으로 접속합니다.

## 💡 주요 기능 (Features)
1. **회원가입/로그인**: JWT 기반 인증 시스템.
2. **단어 관리**:
   - 나만의 영어 단어와 뜻을 추가하고 관리할 수 있습니다.
3. **타자 연습**:
   - 등록한 단어 중 무작위로 단어가 제시됩니다.
   - 화면의 가상 키보드가 눌러야 할 키를 하이라이트 해줍니다.
   - 올바르게 입력하면 다음 단어로 넘어갑니다.

## ⚠️ 문제 해결 (Troubleshooting)
- **서버 연결 오류**: 백엔드 서버가 `8081` 포트에서 실행 중인지 확인하세요.
- **CORS 오류**: 백엔드 `SecurityConfig`에서 CORS 설정이 허용되어 있는지 확인하세요.
