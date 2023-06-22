import Link from "next/link";

// 존재하지 않는 페이지에 접근했을 때 나타나는 페이지
export default function NotFound() {
  return (
    <div className="page404">
      <div className="source">
        <a href="https://kr.freepik.com/free-vector/404-error-with-a-landscape-concept-illustration_20602785.htm#query=404%20error%20page&position=4&from_view=keyword&track=ais">
          작가 storyset
        </a>
        <a href="https://kr.freepik.com/">출처 Freepik</a>
      </div>
      <Link className="commonBtn HomeBtn" href="/">
        홈으로
      </Link>
    </div>
  );
}
