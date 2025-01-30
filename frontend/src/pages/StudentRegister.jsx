const StudentRegister = () => {
    return (
      <div className="auth-container">
        <div className="auth-box">
          <h2>Student Registration</h2>
          <p>Create a new student account</p>
  
          <div className="login-form">
            <input type="text" placeholder="PRN" required />
            <input type="text" placeholder="Name" required />
            <input type="email" placeholder="Email" required />
            <input type="tel" placeholder="Phone No." required />
            <input type="password" placeholder="Password" required />
            <input type="password" placeholder="Confirm Password" required />
            <button>Register</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default StudentRegister;
  