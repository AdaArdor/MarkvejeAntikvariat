import React from 'react';

export default function SignupSuccess() {
  return (
    <div className="auth-container">
      <h2>Account Created!</h2>
      <p style={{ color: "#fff", fontSize: "1.2rem" }}>
        Your account has been created. You can now <a href="/login" style={{ color: "#ffffffff", textDecoration: "underline" }}>log in</a>.
      </p>
    </div>
  );
}