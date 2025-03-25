import React, { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Register from './Profile';
import { supabase } from './supabaseClient'; // 引入 Supabase 客戶端

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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // 查詢 Supabase users 表，檢查帳號和密碼是否匹配
      const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .eq('account', account)
        .eq('password', password);

      if (error) throw error;

      if (users.length > 0) {
        const user = users[0];
        setCurrentUser(user);
        setMessage(`登入成功，歡迎 ${user.name}`);
      } else {
        setMessage('登入失敗，請檢查帳號和密碼');
      }
    } catch (error) {
      setMessage(`登入失敗: ${error.message}`);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAccount('');
    setPassword('');
    setMessage('您已登出');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // 更新 Supabase users 表中的用戶資料
      const { error } = await supabase
        .from('users')
        .update({
          name: currentUser.name,
          account: currentUser.account,
          password: currentUser.password,
        })
        .eq('id', currentUser.id);

      if (error) throw error;

      // 更新本地狀態
      const updatedUsers = users.map((user) =>
        user.id === currentUser.id ? currentUser : user
      );
      setUsers(updatedUsers);
      setMessage('資訊更新成功');
    } catch (error) {
      setMessage(`更新失敗: ${error.message}`);
    }
  };

  const handleDelete = async () => {
    try {
      // 從 Supabase 的 users 表中刪除當前用戶的資料
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', currentUser.id); // 根據用戶 ID 刪除資料

      if (error) throw error;

      // 更新本地狀態，移除已刪除的用戶
      const updatedUsers = users.filter((user) => user.id !== currentUser.id);
      setUsers(updatedUsers);
      setCurrentUser(null);
      setAccount('');
      setPassword('');
      setMessage('帳號已刪除');
    } catch (error) {
      setMessage(`刪除失敗: ${error.message}`);
    }
  };

  return (
<>
<Navbar />
    <div className="container mt-5">

      <Routes>
        <Route
          path="/"
          element={
            !currentUser ? (
              <div className="card shadow-lg mx-auto" style={{ maxWidth: '400px' }}>
                <div className="card-body">
                  <h2 className="card-title text-center">登入頁面</h2>
                  <form onSubmit={handleLogin}>
                    <div className="mb-3">
                      <label htmlFor="account" className="form-label">帳號：</label>
                      <input
                        type="text"
                        id="account"
                        className="form-control"
                        value={account}
                        onChange={(e) => setAccount(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">密碼：</label>
                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">登入</button>
                  </form>
                  {message && <p className="mt-3 text-success">{message}</p>}
                </div>
              </div>
            ) : (
              <div className="card shadow-lg mx-auto" style={{ maxWidth: '400px' }}>
                <div className="card-body">
                  <h2 className="card-title text-center">用戶資訊</h2>
                  <form onSubmit={handleUpdate}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">姓名：</label>
                      <input
                        type="text"
                        id="name"
                        className="form-control"
                        value={currentUser.name}
                        onChange={(e) =>
                          setCurrentUser({ ...currentUser, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="account" className="form-label">帳號：</label>
                      <input
                        type="text"
                        id="account"
                        className="form-control"
                        value={currentUser.account}
                        onChange={(e) =>
                          setCurrentUser({ ...currentUser, account: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">密碼：</label>
                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={currentUser.password}
                        onChange={(e) =>
                          setCurrentUser({ ...currentUser, password: e.target.value })
                        }
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-success w-100">更新資訊</button>
                  </form>
                  <button onClick={handleLogout} className="btn btn-warning w-100 mt-2">登出</button>
                  <button onClick={handleDelete} className="btn btn-danger w-100 mt-2">刪除帳號</button>
                  {message && <p className="mt-3 text-success">{message}</p>}
                </div>
              </div>
            )
          }
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
</>

  
  );
}

export default App;
