"use client";

/* 서버가 다운되거나 DB 데이터 조회에 실패할 때 나타나는 페이지 */
/* 에러 메시지 출력: props.error */
export default function Error({ error, reset }) {
  return (
    <div className="pageError">
      <div className="source">
        <a href="https://kr.freepik.com/free-vector/tiny-people-examining-operating-system-error-warning-on-web-page-isolated-flat-illustration_11235921.htm#query=error%20page&position=2&from_view=search&track=ais">
          작가 pch.vector
        </a>
        <a href="https://kr.freepik.com/">출처 Freepik</a>
      </div>
      <button
        className="commonBtn"
        onClick={() => {
          reset();
        }}
      >
        reset
      </button>
    </div>
  );
}
