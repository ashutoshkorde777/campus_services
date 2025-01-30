const StudentLogin = () => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Student Login</h2>
        <p>Enter your student credentials below.</p>

        <div className="login-form">
          <input type="text" placeholder="PRN" required />
          <input type="password" placeholder="Password" required />
          <button>Login</button>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
