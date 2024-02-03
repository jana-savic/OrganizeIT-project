import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleResetPassword = async () => {
    try {
      // Validate email, newPassword, and confirmPassword here

      if (newPassword !== confirmPassword) {
        setMessage("Passwords don't match");
        return;
      }

      // Call your backend API to reset the password
      const response = await fetch(`http://localhost:8002/users/${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      console.error('Error resetting password:', error.message);
    }
  };

  return (
    <div>

        <div className='forgotten-top-container'>
      <h2>Password Reset</h2>
      <p>{message}</p>
      <Link to="/auth">
        <div className="login-signup-container">
        <button className="login-signup">Sign Up/Log In</button>
        </div>
      </Link>
      </div>

<div className="reset-form">
      <label>Email:</label>
      <br />
      <input type="email" value={email} onChange={handleEmailChange}/>
      <br />
      <label>New Password:</label>
      <br />
      <input type="password" value={newPassword} onChange={handleNewPasswordChange} />
      <br />
      <label>Confirm Password:</label>
      <br />
      <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
      <br />
      <button className="reset-password" onClick={handleResetPassword}>Reset Password</button>
      <br />
      </div>

    </div>
  );
};

export default PasswordReset;