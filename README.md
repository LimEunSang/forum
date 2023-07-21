## 프로젝트 소개

이 프로젝트는 Next.js 버전 13으로 게시판을 만드는 강의 실습 코드입니다. 강의 내용 외에 몇 가지 기능을 추가로 구현하였습니다.

This project is the lecture lab code for creating a bulletin board with Next.js version 13. We've implemented a few additional features beyond the lecture content.

## 강의 정보

- https://codingapple.com/course/next-js/

## 강의 정리

- https://resilient-aura-65d.notion.site/Part-2-f6ad30f4c9624d86a8a61fb8bf62d801

## 추가한 기능

- API 통신 시 status code에 따른 예외 처리
- *회원기능 만들기 : 아이디/비번 + JWT 사용하기* ➝ 오늘의 응용사항
  - 회원가입 시 빈칸이 있는 경우 서버에서 가입 거절
  - 회원가입 시 중복 이메일일 경우 서버에서 가입 거절
  - 글쓰기 페이지는 로그인 유저에게만 렌더링
  - 관리자 권한을 가진 유저는 모든 글 삭제 가능 권한 부여
- *댓글기능 만들기 3* ➝ 오늘의 응용사항
  - 댓글 작성자 이름 출력
  - 방금 작성한 댓글을 바로 화면에 출력
  - 글마다 '좋아요' 기능 추가
    - 비로그인 유저는 '속이 빈 하트' 출력
    - 비로그인 유저는 '좋아요' 기능 사용 불가능
    - '좋아요'를 등록하지 않은 유저에게는 '속이 빈 하트' 출력
    - '속이 빈 하트' 클릭 시 '좋아요' 등록
    - '좋아요'를 등록한 유저에게는 '속이 찬 하트' 출력
- vercel 배포: https://forum-es.vercel.app
- *이미지 업로드 기능 2*
  - 글 발행 시 form 태그 ➝ ajax 요청으로 폼 전송
  - 이미지 선택과 동시에 업로드 → 글 발행 누르면 이미지 업로드
  - detail 페이지에서 이미지 렌더링
- *Dark Mode 기능 2* ➝ 오늘의 응용사항
  - mode에 따라 렌더링 하는 버튼 및 기능 구분
  - cookie 정보를 불러오는 코드 중복 간소화
- 그 외 기능은 (closed) issue 참고
