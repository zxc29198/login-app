import React, { useState } from 'react';
import './App.css';

// 初始用户数据
const initialUsers = [
  { id: 1, name: 'John Doe', account: 'john_doe', password: 'password123' },
  { id: 2, name: 'Jane Smith', account: 'jane_smith', password: 'password456' },
  { id: 3, name: 'Admin', account: 'admin', password: 'admin123' }
];

function App() {
  const [users, setUsers] = useState(initialUsers);
  const [currentUser, setCurrentUser] = useState(null);
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // 登录处理函数
  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(
      (user) => user.account === account && user.password === password
    );
    if (user) {
      setCurrentUser(user);
      setMessage(`登入成功，歡迎 ${user.name}`);
    } else {
      setMessage('登入失敗，請檢查帳號和密碼');
    }
  };

  // 登出处理函数
  const handleLogout = () => {
    setCurrentUser(null);
    setAccount('');
    setPassword('');
    setMessage('您已登出');
  };

  // 更新用户信息处理函数
  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedUsers = users.map((user) =>
      user.id === currentUser.id ? currentUser : user
    );
    setUsers(updatedUsers);
    setMessage('資訊更新成功');
  };

  // 删除用户处理函数
  const handleDelete = () => {
    const updatedUsers = users.filter((user) => user.id !== currentUser.id);
    setUsers(updatedUsers);
    setCurrentUser(null);
    setAccount('');
    setPassword('');
    setMessage('帳號已刪除');
  };

  return (
    <div className="container">
      {!currentUser ? (
        <div className="login-box">
          <h2>登入頁面</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="account">帳號：</label>
              <input
                type="text"
                id="account"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">密碼：</label>
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
          {message && <p>{message}</p>}
        </div>
      ) : (
        <div className="profile-box">
          <h2>用戶資訊</h2>
          <form onSubmit={handleUpdate}>
            <div>
              <label htmlFor="name">姓名：</label>
              <input
                type="text"
                id="name"
                value={currentUser.name}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label htmlFor="account">帳號：</label>
              <input
                type="text"
                id="account"
                value={currentUser.account}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, account: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label htmlFor="password">密碼：</label>
              <input
                type="password"
                id="password"
                value={currentUser.password}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, password: e.target.value })
                }
                required
              />
            </div>
            <button type="submit">更新資訊</button>
          </form>
          <button onClick={handleLogout}>登出</button>
          <button onClick={handleDelete}>刪除帳號</button>
          {message && <p>{message}</p>}
        </div>
      )}
    </div>
  );
}

export default App;
