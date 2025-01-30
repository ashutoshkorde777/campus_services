const VendorRegister = () => {
    return (
      <div className="auth-container">
        <div className="auth-box">
          <h2>Vendor Registration</h2>
          <p>Create a new vendor account</p>
  
          <div className="login-form">
            <input type="text" placeholder="Name" required />
            <input type="email" placeholder="Email" required />
            <input type="tel" placeholder="Phone No." required />
            <input type="password" placeholder="Password" required />
            <input type="password" placeholder="Confirm Password" required />
            <textarea placeholder="Business Description" required></textarea>
            <input type="file" accept="image/*" required />
            <button>Register</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default VendorRegister;
  