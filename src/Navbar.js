import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, Route, Routes } from 'react-router-dom';
import Login from './Login'; // 確保有正確的登入頁面組件

function Navbar({ currentUser, onLogout }) {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          我的代辦清單
        </Typography>
        <Box>
          {currentUser ? (
            <>
              <Button color="inherit" component={Link} to="/update-info">
                更新資訊
              </Button>
              <Button color="inherit" onClick={onLogout}>
                登出
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/register">
                註冊
              </Button>
              <Button color="inherit" component={Link} to="/login">
                登入
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

function App() {
    return (
        <Routes>
            {/* ...existing routes... */}
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}

export default Navbar;
