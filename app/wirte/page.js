export default function Write() {
  return (
    <>
      <h4>글 작성</h4>
      <form action="/api/test" method="POST">
        <input name="title" />
        <input name="content" />
        <button type="submit">버튼</button>
      </form>
    </>
  );
}
