# CLAUDE.md

이 파일은 Claude Code가 이 저장소에서 작업할 때 참고하는 가이드입니다.

## 프로젝트 개요

**parking24**는 공항 주차장 예약 서비스를 위한 React 웹 애플리케이션입니다. 사용자가 차량 정보를 입력하고, 주차 요금제를 선택하여 예약을 완료할 수 있습니다.

## 기술 스택

- **프론트엔드**: React 18, React Router v6
- **스타일링**: Tailwind CSS
- **백엔드/호스팅**: Firebase (Hosting, Firestore, Cloud Functions)
- **날짜 처리**: date-fns
- **SEO**: react-helmet-async
- **빌드 도구**: Create React App

## 프로젝트 구조

```
parking24/
├── src/
│   ├── components/
│   │   ├── common/      # 공통 UI 컴포넌트 (Button, Header, Footer 등)
│   │   ├── layout/      # 레이아웃 컴포넌트 (HeroTitle, SideDrawer 등)
│   │   └── modals/      # 모달 컴포넌트 (AirportModal, DateTimeModal 등)
│   ├── pages/           # 페이지 컴포넌트
│   ├── config/          # 설정 파일 (Firebase 등)
│   └── utils/           # 유틸리티 함수 (dateUtils, priceUtils)
├── functions/           # Firebase Cloud Functions
├── public/              # 정적 파일 (sitemap.xml, robots.txt 등)
└── build/               # 프로덕션 빌드 출력
```

## 주요 명령어

```bash
# 개발 서버 실행
npm start

# 프로덕션 빌드
npm run build

# 테스트 실행
npm test

# Lighthouse 성능 테스트
npm run lighthouse

# Firebase Functions 로컬 실행
cd functions && npm run serve
```

## 주요 라우트

| 경로 | 페이지 | 설명 |
|------|--------|------|
| `/` | Home | 메인 페이지 |
| `/vehicle-info` | VehicleInfo | 차량 정보 입력 |
| `/reservation-info` | ReservationInfo | 예약 정보 확인 |
| `/reservation-complete` | ReservationComplete | 예약 완료 |
| `/reservation-lookup` | ReservationLookup | 예약 조회 |
| `/admin/*` | Admin* | 관리자 페이지 (login, dashboard, reservations, settings) |

## 개발 가이드라인

### 코드 스타일
- 컴포넌트는 함수형 컴포넌트와 React Hooks 사용
- 페이지 컴포넌트는 lazy loading 적용 (`React.lazy`)
- Tailwind CSS 유틸리티 클래스 사용

### 환경 변수
Firebase 설정을 위해 `.env` 파일에 다음 변수가 필요합니다:
- `REACT_APP_FIREBASE_API_KEY`
- `REACT_APP_FIREBASE_PROJECT_ID`
- 기타 Firebase 관련 환경 변수

### 배포
Firebase Hosting을 통해 배포됩니다:
```bash
npm run build
firebase deploy
```
