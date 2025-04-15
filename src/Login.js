import React, { useState } from 'react';

function Login() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // 在這裡處理登入邏輯
    console.log('登入中...', { account, password });
  };

  return (
    <div className="login-box">
      <h2>登入</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="account">帳號</label>
          <input
            type="text"
            id="account"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">密碼</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">登入</button>
      </form>
    </div>
  );
}

export default Login;