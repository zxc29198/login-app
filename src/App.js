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

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCurrentUser(user);
      }
    };
    checkUser();
  }, []);

  const handleLogout = () => {
    setCurrentUser(null);
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
          <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
          <Route
            path="/update-info"
            element={
              currentUser ? (
                <div className="card shadow-lg mx-auto" style={{ maxWidth: '400px', marginTop: '100px' }}>
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

<div className="grid-container">
    {todos.map(todo => (
        <Card key={todo.id} className="grid-item" sx={{ margin: 1 }}>
            <CardContent>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Checkbox
                        checked={todo.is_completed}
                        onChange={() => toggleComplete(todo.id, todo.is_completed)}
                    />
                    <Typography
                        variant="h6"
                        component="div"
                        style={{
                            textDecoration: todo.is_completed ? 'line-through' : 'none',
                            flexGrow: 1,
                        }}
                    >
                        {todo.task}
                    </Typography>
                    <Button color="error" onClick={() => deleteTodo(todo.id)}>
                        刪除
                    </Button>
                </div>
            </CardContent>
        </Card>
    ))}
</div>
