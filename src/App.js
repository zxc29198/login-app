import React, { useState } from 'react';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Register from './Profile';
import { supabase } from './supabaseClient';
import TodoList from './TodoList';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser(null);
    setMessage('您已登出');
    navigate('/');
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
          <Route
            path="/update-info"
            element={
              currentUser ? (
                <div className="card shadow-lg mx-auto" style={{ maxWidth: '400px', marginTop: '100px' }}>
                  <div className="card-body">
                    <h2 className="card-title text-center">更新資訊</h2>
                    {/* 更新資訊表單 */}
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
