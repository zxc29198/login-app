import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setCurrentUser }) {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // 模擬登入邏輯，您可以替換為實際的 API 呼叫
    if (account === 'test' && password === '1234') {
      const user = { account, name: 'Test User' }; // 模擬的使用者資料
      setCurrentUser(user);
      navigate('/'); // 登入成功後跳轉到首頁
    } else {
      alert('帳號或密碼錯誤');
    }
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