import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Register from './Profile';
import { supabase } from './supabaseClient';
import TodoList from './TodoList';
import Login from './Login';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // 檢查當前用戶是否已登入
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser(); // 從 Supabase 獲取當前用戶
      if (user) {
        setCurrentUser(user); // 如果用戶存在，設置當前用戶狀態
      }
    };
    checkUser();
  }, []);

  // 處理登出邏輯
  const handleLogout = () => {
    setCurrentUser(null); // 清空當前用戶狀態
    navigate('/'); // 跳轉到首頁
  };

  return (
    <div>
      <Navbar currentUser={currentUser} onLogout={handleLogout} />
      <div className="container mt-5">
        <Routes>
          <Route
            path="/"
            element={
              currentUser ? (
                <TodoList userId={currentUser.id} />
              ) : (
                <div className="text-center mt-5">
                  <h2>請先登入以查看代辦清單</h2>
                </div>
              )
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
          <Route
            path="/update-info"
            element={
              currentUser ? (
                <div className="card shadow-lg mx-auto" style={{ maxWidth: '500 px', marginTop: '100px' }}>
                  <div className="card-body">
                    <h2 className="card-title text-center">更新資訊</h2>
                    <button
                      className="btn btn-danger w-100 mt-3"
                      onClick={() => {
                        supabase
                          .from('users')
                          .delete()
                          .eq('id', currentUser.id)
                          .then(() => {
                            setCurrentUser(null);
                            navigate('/');
                          });
                      }}
                    >
                      刪除帳號
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center mt-5">
                  <h2>請先登入以更新資訊</h2>
                </div>
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
