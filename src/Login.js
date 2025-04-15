import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setCurrentUser }) {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('account', account)
            .eq('password', password);

        if (error) {
            console.error('登入失敗:', error);
            alert('登入失敗，請檢查帳號或密碼');
        } else if (data.length > 0) {
            console.log('登入成功:', data[0]);
            setCurrentUser(data[0]);
            navigate('/');
        } else {
            alert('帳號或密碼錯誤');
        }
    } catch (err) {
        console.error('登入過程中發生錯誤:', err);
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