const AdminLogin = () => {
    return (
      <div className="login-container">
        <h2>Admin Login</h2>
        <p>Enter your admin credentials below.</p>
        <div className="login-form">
          <input type="email" placeholder="Admin Email" required />
          <input type="password" placeholder="Password" required />
          <button>Login</button>
        </div>
      </div>
    );
  };
  
  export default AdminLogin;
  