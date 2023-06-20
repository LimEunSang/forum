export default function Register() {
  return (
    <div className="register">
      <span>회원정보를 입력해주세요</span>
      <form method="POST" action="/api/auth/signup">
        <div className="inputField">
          <div className="iconBox">👤</div>
          <input
            className="nameInput"
            name="name"
            type="text"
            placeholder="이름"
          />
        </div>
        <div className="inputField">
          <div className="iconBox">✉️</div>
          <input
            className="emailInput"
            name="email"
            type="text"
            placeholder="이메일"
          />
        </div>
        <div className="inputField">
          <div className="iconBox">🔒</div>
          <input
            className="passwordInput"
            name="password"
            type="password"
            placeholder="비밀번호"
          />
        </div>
        <div className="btnWrapper">
          <button className="commonBtn" type="submit">
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
}
