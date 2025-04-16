# 📝 독스루 (DocThru)
https://doc-thru-fe.vercel.app/

## 📌 프로젝트 소개

**DocThru**는 기술 문서 번역을 통해 개발자들이 함께 성장할 수 있도록 도와주는 **챌린지 기반 협업 번역 플랫폼**입니다.

- 사용자는 원하는 번역 챌린지에 참가 신청을 할 수 있습니다.
- 지정된 문서를 **웹 기반 에디터**에서 번역하고, 다른 사용자로부터 피드백을 받을 수 있습니다.
- 관리자는 번역 챌린지를 **승인/거절**하거나, 사용자의 번역물을 **목록 및 상세 조회**할 수 있습니다.

## 🗓️ 개발 기간

**2025년 3월 24일 (월) ~ 4월 16일 (화)**  
총 약 3주간 진행

## 👨‍👩‍👧‍👦 팀원 정보

| 이름 | 프론트엔드 주요 담당 역할 |
|------|----------------------|
| [김희성](https://github.com/HEES56) | 공통 컴포넌트, 로그인, 회원가입, 챌린지 목록, 챌린지 생성 페이지 |
| [김조순](https://github.com/josunkim) | 공통 컴포넌트, 챌린지 상세(승인, 모집 마감, 시간 마감), 작업물 상세 페이지 |
| [윤민호](https://github.com/Bear4243) | 공통 컴포넌트, 챌린지 상세(승인 대기, 삭제, 거절) 페이지 |
| [이동혁](https://github.com/hyuk-dev) | 작업물 생성(에디터) 페이지 |
| [최은비](https://github.com/silverraining) | 관리자 신청 관리, 나의 챌린지 - 신청한 챌린지 페이지 |
| [김승우](https://github.com/stevenkim18) | 버그 수정 및 유지보수 |

## 기술 스택
| 분류 | 기술스택 |
| --- | --- |
| 언어 | TypeScript |
| 스타일 | Tailwind CSS |
| 프론트 프레임워크 | Next.js(App Router) |
| 컴포넌트 | Storybook |
| 상태관리 | Context API, Zustand, Tanstack-Query |
| 에디터 | React-Quill |

## 주요 기능 소개
### 랜딩 페이지
![화면 기록 2025-04-16 오후 6 45 18](https://github.com/user-attachments/assets/a9804cb8-2726-44a6-8c86-c8113fae3074)

### 로그인
![화면 기록 2025-04-16 오후 6 48 09](https://github.com/user-attachments/assets/77985abd-f176-47b2-ad1d-20429ab49c04)

### 회원가입
![image](https://github.com/user-attachments/assets/dcf85430-bf9b-4a36-8eb5-777566d6412d)

### 비회원 라우팅
- 비회원은 챌린지 목록(메인화면)만 접근이 가능함.
  
![화면 기록 2025-04-16 오후 6 50 42](https://github.com/user-attachments/assets/3587156a-f94f-4e7b-a9fd-8f2a263c425e)

### 챌린지 목록 조회
- 필터링
- 검색
- 페이지네이션

![화면 기록 2025-04-16 오후 6 51 52](https://github.com/user-attachments/assets/6ed9e1b6-9957-41b1-a41c-275d90933b68)

### 챌린지 생성 및 수정

![화면 기록 2025-04-16 오후 6 58 19](https://github.com/user-attachments/assets/aac0b836-405e-4836-b15c-7bca6a24da01)

### 나의 챌린지
![화면 기록 2025-04-16 오후 7 03 01](https://github.com/user-attachments/assets/d40f5732-e868-4818-96ca-df8f2fdf195f)

### 알림

![화면 기록 2025-04-16 오후 9 34 43](https://github.com/user-attachments/assets/af2dab2f-72d5-4635-9e43-1cdbc982607e)

### 관리자
챌린지 관리, 챌린지 목록
![화면 기록 2025-04-16 오후 9 36 19](https://github.com/user-attachments/assets/c60e4ea4-2670-413c-9ee7-b05f0994e438)

챌린지 승인
![화면 기록 2025-04-16 오후 9 38 48](https://github.com/user-attachments/assets/57f18788-9955-4557-99db-941db00335b3)

챌린지 거절
![화면 기록 2025-04-16 오후 9 41 27](https://github.com/user-attachments/assets/7d500212-4b5a-4983-b986-67a2fcdea9bd)

챌린지 삭제
![화면 기록 2025-04-16 오후 9 50 22](https://github.com/user-attachments/assets/a0d32638-69c1-48c6-82b7-7abdd3fbade2)

### 챌린지 상세
라이브 중인 챌린지
![image](https://github.com/user-attachments/assets/c249eb82-4352-4e00-98aa-a448165369ae)

모집 인원이 마감된 챌린지
![image](https://github.com/user-attachments/assets/50980303-b35d-4ab6-8539-f7ff915d35ce)

시간이 마감된 챌린지
![화면 기록 2025-04-16 오후 9 54 41](https://github.com/user-attachments/assets/bc67ce61-a198-4aa0-a14c-59a03565ffb6)

### 번역물 작성
- 임시저장
- 최종제출

![화면 기록 2025-04-16 오후 9 57 13](https://github.com/user-attachments/assets/956f0c09-1a8f-4970-8a3d-ae36e6817b62)

### 번역물 상세
![화면 기록 2025-04-16 오후 10 00 10](https://github.com/user-attachments/assets/6c61c67e-0247-4f7d-a98f-210334ed76e1)

### 피드백
![화면 기록 2025-04-16 오후 10 01 33](https://github.com/user-attachments/assets/344d3162-a07b-4ed1-a3b6-6740ff628417)

### 좋아요
![화면 기록 2025-04-16 오후 10 03 49](https://github.com/user-attachments/assets/bf2cce6b-076f-4605-9c58-c04b2544ff9c)

## 프로젝트 구조

<details>
<summary>파일 트리 보기</summary>

```
📦src
 ┣ 📂api
 ┃ ┣ 📂Translation
 ┃ ┃ ┣ 📜api.ts
 ┃ ┃ ┗ 📜hook.ts
 ┃ ┣ 📂admin
 ┃ ┃ ┗ 📜admin.ts
 ┃ ┣ 📂auth
 ┃ ┃ ┣ 📜AuthApi.ts
 ┃ ┃ ┣ 📜AuthHook.ts
 ┃ ┃ ┗ 📜AuthStore.ts
 ┃ ┣ 📂challenge
 ┃ ┃ ┣ 📜ChallengeApi.ts
 ┃ ┃ ┗ 📜ChallengeHooks.ts
 ┃ ┣ 📂feedback
 ┃ ┃ ┣ 📜api.ts
 ┃ ┃ ┗ 📜hook.ts
 ┃ ┣ 📂like
 ┃ ┃ ┣ 📜api.ts
 ┃ ┃ ┗ 📜hook.ts
 ┃ ┣ 📂notification
 ┃ ┃ ┗ 📜notification.api.ts
 ┃ ┗ 📜url.ts
 ┣ 📂app
 ┃ ┣ 📂_components
 ┃ ┃ ┗ 📜ClientLayout.tsx
 ┃ ┣ 📂admin
 ┃ ┃ ┣ 📂challenges
 ┃ ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┃ ┃ ┣ 📜cardDetail.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜nav.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜status.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜statusBottom.tsx
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┃ ┗ 📜ChallengeTable.tsx
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┗ 📜layout.tsx
 ┃ ┣ 📂auth
 ┃ ┃ ┣ 📂login
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂signup
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┗ 📜layout.tsx
 ┃ ┣ 📂main
 ┃ ┃ ┣ 📂challenge
 ┃ ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┃ ┃ ┣ 📜ListItems.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜MostRecommend.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Participation.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜Title.tsx
 ┃ ┃ ┃ ┃ ┣ 📂edit
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂_components
 ┃ ┃ ┃ ┃ ┣ 📜ChallengeHead.tsx
 ┃ ┃ ┃ ┃ ┣ 📜ChallengeMain.tsx
 ┃ ┃ ┃ ┃ ┗ 📜Pagination.tsx
 ┃ ┃ ┃ ┣ 📂new
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📜layout.tsx
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂my-challenge
 ┃ ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┃ ┃ ┣ 📜cardDetail.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜status.tsx
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┃ ┣ 📜ChallengeTable.tsx
 ┃ ┃ ┃ ┃ ┣ 📜MyChallengeHead.tsx
 ┃ ┃ ┃ ┃ ┣ 📜MyChallengeMain.tsx
 ┃ ┃ ┃ ┃ ┗ 📜Pagination.tsx
 ┃ ┃ ┃ ┣ 📜layout.tsx
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂privacy-policy
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂translation
 ┃ ┃ ┃ ┗ 📂[id]
 ┃ ┃ ┃ ┃ ┣ 📂_components
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Author.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Content.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜FeedBack.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Title.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜modal.tsx
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┗ 📂translation-work
 ┃ ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂_components
 ┃ ┃ ┃ ┃ ┣ 📜Editor.tsx
 ┃ ┃ ┃ ┃ ┣ 📜PatchCard.tsx
 ┃ ┃ ┃ ┃ ┣ 📜PatchMain.tsx
 ┃ ┃ ┃ ┃ ┣ 📜PostCard.tsx
 ┃ ┃ ┃ ┃ ┗ 📜PostMain.tsx
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂notification
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📜NotificationBell.tsx
 ┃ ┃ ┃ ┗ 📜ProfileCard.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📜layout.tsx
 ┃ ┣ 📜loading.tsx
 ┃ ┗ 📜page.tsx
 ┣ 📂core
 ┃ ┗ 📂provider
 ┃ ┃ ┣ 📜AuthProvider.tsx
 ┃ ┃ ┣ 📜ReactQueryProvider.tsx
 ┃ ┃ ┗ 📜ToastProvider.tsx
 ┣ 📂lib
 ┃ ┣ 📂api
 ┃ ┃ ┗ 📜admin.ts
 ┃ ┗ 📜utill.ts
 ┣ 📂shared
 ┃ ┣ 📂Img
 ┃ ┃ ┣ 📂arrow-icon
 ┃ ┃ ┃ ┣ 📂circle
 ┃ ┃ ┃ ┃ ┣ 📜down.svg
 ┃ ┃ ┃ ┃ ┗ 📜up.svg
 ┃ ┃ ┃ ┣ 📂next-arrow
 ┃ ┃ ┃ ┃ ┣ 📜big-arrow.svg
 ┃ ┃ ┃ ┃ ┗ 📜small-arrow.svg
 ┃ ┃ ┃ ┣ 📂no-stick
 ┃ ┃ ┃ ┃ ┣ 📜black.svg
 ┃ ┃ ┃ ┃ ┣ 📜gray.svg
 ┃ ┃ ┃ ┃ ┣ 📜icon_arrow_left.svg
 ┃ ┃ ┃ ┃ ┗ 📜icon_arrow_right.svg
 ┃ ┃ ┃ ┣ 📂normal
 ┃ ┃ ┃ ┃ ┣ 📜down.svg
 ┃ ┃ ┃ ┃ ┣ 📜link_click.svg
 ┃ ┃ ┃ ┃ ┗ 📜right.svg
 ┃ ┃ ┃ ┗ 📂toggle
 ┃ ┃ ┃ ┃ ┣ 📜down.svg
 ┃ ┃ ┃ ┃ ┗ 📜up.svg
 ┃ ┃ ┣ 📂bell-icon
 ┃ ┃ ┃ ┣ 📜bass.svg
 ┃ ┃ ┃ ┗ 📜noti.svg
 ┃ ┃ ┣ 📂check-icon
 ┃ ┃ ┃ ┣ 📜check.svg
 ┃ ┃ ┃ ┣ 📜roundCheck.svg
 ┃ ┃ ┃ ┗ 📜uncheck.svg
 ┃ ┃ ┣ 📂close-icon
 ┃ ┃ ┃ ┗ 📜close.svg
 ┃ ┃ ┣ 📂deadLine-icon
 ┃ ┃ ┃ ┣ 📜big.svg
 ┃ ┃ ┃ ┣ 📜small-white.svg
 ┃ ┃ ┃ ┗ 📜small.svg
 ┃ ┃ ┣ 📂editor-icon
 ┃ ┃ ┃ ┣ 📜alignment_center.svg
 ┃ ┃ ┃ ┣ 📜alignment_left.svg
 ┃ ┃ ┃ ┣ 📜alignment_right.svg
 ┃ ┃ ┃ ┣ 📜bold.svg
 ┃ ┃ ┃ ┣ 📜bullet.svg
 ┃ ┃ ┃ ┣ 📜coloring.svg
 ┃ ┃ ┃ ┣ 📜italic.svg
 ┃ ┃ ┃ ┣ 📜numbering.svg
 ┃ ┃ ┃ ┗ 📜underline.svg
 ┃ ┃ ┣ 📂feedback-icon
 ┃ ┃ ┃ ┣ 📜active.svg
 ┃ ┃ ┃ ┗ 📜inactive.svg
 ┃ ┃ ┣ 📂filter-icon
 ┃ ┃ ┃ ┣ 📂normal
 ┃ ┃ ┃ ┃ ┣ 📜active.svg
 ┃ ┃ ┃ ┃ ┗ 📜inactive.svg
 ┃ ┃ ┃ ┣ 📜document.svg
 ┃ ┃ ┃ ┗ 📜list.svg
 ┃ ┃ ┣ 📂like-icon
 ┃ ┃ ┃ ┣ 📜big-active.svg
 ┃ ┃ ┃ ┣ 📜big-inactive.svg
 ┃ ┃ ┃ ┣ 📜small-active.svg
 ┃ ┃ ┃ ┗ 📜small-inactive.svg
 ┃ ┃ ┣ 📂logo-icon
 ┃ ┃ ┃ ┣ 📜mainLogo.svg
 ┃ ┃ ┃ ┗ 📜textLogo.svg
 ┃ ┃ ┣ 📂math-symbols-icon
 ┃ ┃ ┃ ┗ 📜plus.svg
 ┃ ┃ ┣ 📂menu-icon
 ┃ ┃ ┃ ┗ 📜Meatballs.svg
 ┃ ┃ ┣ 📂modal-icon
 ┃ ┃ ┃ ┗ 📜check.svg
 ┃ ┃ ┣ 📂out-icon
 ┃ ┃ ┃ ┣ 📂circle
 ┃ ┃ ┃ ┃ ┣ 📜big-out.svg
 ┃ ┃ ┃ ┃ ┗ 📜small-out.svg
 ┃ ┃ ┃ ┗ 📜out.svg
 ┃ ┃ ┣ 📂person-icon
 ┃ ┃ ┃ ┣ 📜big.svg
 ┃ ┃ ┃ ┣ 📜small-white.svg
 ┃ ┃ ┃ ┗ 📜small.svg
 ┃ ┃ ┣ 📂profile-icon
 ┃ ┃ ┃ ┣ 📜admin.svg
 ┃ ┃ ┃ ┗ 📜member.svg
 ┃ ┃ ┣ 📂radio-icon
 ┃ ┃ ┃ ┣ 📜radioOff.svg
 ┃ ┃ ┃ ┗ 📜radioOn.svg
 ┃ ┃ ┣ 📂search-icon
 ┃ ┃ ┃ ┗ 📜ic_search.svg
 ┃ ┃ ┣ 📂vector-icon
 ┃ ┃ ┃ ┣ 📜crown-black.svg
 ┃ ┃ ┃ ┗ 📜crown-gold.svg
 ┃ ┃ ┣ 📂visibility-icon
 ┃ ┃ ┃ ┣ 📜visibilityOff.svg
 ┃ ┃ ┃ ┗ 📜visibilityOn.svg
 ┃ ┃ ┣ 📜close.svg
 ┃ ┃ ┣ 📜ic_list.svg
 ┃ ┃ ┣ 📜ic_out_circle.svg
 ┃ ┃ ┣ 📜icon_click.svg
 ┃ ┃ ┣ 📜img_logo .svg
 ┃ ┃ ┣ 📜logo.svg
 ┃ ┃ ┣ 📜medal.svg
 ┃ ┃ ┣ 📜search.svg
 ┃ ┃ ┣ 📜send_icon.svg
 ┃ ┃ ┣ 📜send_icon2.svg
 ┃ ┃ ┗ 📜thumbnail.svg
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂button
 ┃ ┃ ┃ ┗ 📜Button.tsx
 ┃ ┃ ┣ 📂card
 ┃ ┃ ┃ ┣ 📜Card.tsx
 ┃ ┃ ┃ ┣ 📜CardSelector.tsx
 ┃ ┃ ┃ ┗ 📜CardSkeleton.tsx
 ┃ ┃ ┣ 📂chip
 ┃ ┃ ┃ ┣ 📜ChipCardStatus.tsx
 ┃ ┃ ┃ ┗ 📜chip.tsx
 ┃ ┃ ┣ 📂container
 ┃ ┃ ┃ ┗ 📜Container.tsx
 ┃ ┃ ┣ 📂dropdown
 ┃ ┃ ┃ ┣ 📜DropDown.tsx
 ┃ ┃ ┃ ┣ 📜Filter.tsx
 ┃ ┃ ┃ ┣ 📜ProfileDropdown.tsx
 ┃ ┃ ┃ ┣ 📜Sort.tsx
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂form
 ┃ ┃ ┃ ┣ 📜AuthForm.tsx
 ┃ ┃ ┃ ┗ 📜ChallengeForm.tsx
 ┃ ┃ ┣ 📂input
 ┃ ┃ ┃ ┣ 📜date.tsx
 ┃ ┃ ┃ ┣ 📜email.tsx
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┣ 📜password.tsx
 ┃ ┃ ┃ ┣ 📜search.tsx
 ┃ ┃ ┃ ┗ 📜text.tsx
 ┃ ┃ ┣ 📂layout
 ┃ ┃ ┃ ┣ 📜Footer.tsx
 ┃ ┃ ┃ ┣ 📜Header.tsx
 ┃ ┃ ┃ ┣ 📜Layout.tsx
 ┃ ┃ ┃ ┗ 📜core.ts
 ┃ ┃ ┣ 📂modal
 ┃ ┃ ┃ ┣ 📜confirm.tsx
 ┃ ┃ ┃ ┣ 📜confirmCancel.tsx
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┣ 📜modalBase.tsx
 ┃ ┃ ┃ ┣ 📜navigate.tsx
 ┃ ┃ ┃ ┗ 📜send.tsx
 ┃ ┃ ┣ 📂popup
 ┃ ┃ ┃ ┗ 📜popup.tsx
 ┃ ┃ ┣ 📂tab
 ┃ ┃ ┃ ┣ 📜Tab.tsx
 ┃ ┃ ┃ ┗ 📜TabGroup.tsx
 ┃ ┃ ┣ 📜AnimateLoad.tsx
 ┃ ┃ ┣ 📜CheckBox.tsx
 ┃ ┃ ┣ 📜Divider.tsx
 ┃ ┃ ┣ 📜OriginView.tsx
 ┃ ┃ ┣ 📜RadioBtn.tsx
 ┃ ┃ ┣ 📜Reply.tsx
 ┃ ┃ ┗ 📜TextBox.tsx
 ┃ ┣ 📂fonts
 ┃ ┃ ┣ 📂Quantico
 ┃ ┃ ┃ ┣ 📜Quantico-Bold.woff2
 ┃ ┃ ┃ ┣ 📜Quantico-BoldItalic.woff2
 ┃ ┃ ┃ ┣ 📜Quantico-Italic.woff2
 ┃ ┃ ┃ ┗ 📜Quantico-Regular.woff2
 ┃ ┃ ┣ 📜NotoSerifKR.woff2
 ┃ ┃ ┗ 📜PretendardVariable.woff2
 ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📜useMediaQuery.ts
 ┃ ┃ ┣ 📜useToastMutation.ts
 ┃ ┃ ┣ 📜useToastQuery.ts
 ┃ ┃ ┗ 📜useUnloadWarning.ts
 ┃ ┗ 📜globals.css
 ┣ 📂stories
 ┃ ┣ 📜Button.stories.ts
 ┃ ┣ 📜Card.stories.ts
 ┃ ┣ 📜Chip.stories.ts
 ┃ ┣ 📜ChipCardStatus.stories.ts
 ┃ ┣ 📜Confirm.stories.ts
 ┃ ┣ 📜ConfirmCancel.stories.ts
 ┃ ┣ 📜Container.stories.ts
 ┃ ┣ 📜DropDown.stories.ts
 ┃ ┣ 📜Filter.stories.ts
 ┃ ┣ 📜Header.stories.ts
 ┃ ┣ 📜InputDate.stories.ts
 ┃ ┣ 📜InputEmail.stories.ts
 ┃ ┣ 📜InputPwd.stories.ts
 ┃ ┣ 📜InputPwdConfirm.stories.ts
 ┃ ┣ 📜InputSearch.stories.ts
 ┃ ┣ 📜InputText.stories.ts
 ┃ ┣ 📜Navigate.stories.ts
 ┃ ┣ 📜Reply.stories.ts
 ┃ ┣ 📜SendModal.stories.ts
 ┃ ┣ 📜Sort.stories.ts
 ┃ ┣ 📜Tab.stories.ts
 ┃ ┣ 📜TextBox.stories.ts
 ┃ ┗ 📜popup.stories.ts
 ┣ 📜constants.ts
 ┣ 📜middleware.ts
 ┗ 📜types.ts
```
</details>

## 주요 트러블 슈팅

## 회고




