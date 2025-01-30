const VendorLogin = () => {
    return (
      <div className="auth-container">
        <div className="auth-box">
          <h2>Vendor Login</h2>
          <p>Enter your vendor credentials below.</p>
  
          <div className="login-form">
            <input type="tel" placeholder="Mobile No." required />
            <input type="password" placeholder="Password" required />
            <button>Login</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default VendorLogin;
  