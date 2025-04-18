import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Cookies from 'js-cookie'; // 引入 js-cookie 套件

function Login({ setCurrentUser }) {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('account', account)
      .eq('password', password);

    if (error) {
      console.error('登入失敗:', error);
    } else if (data.length > 0) {
      setCurrentUser(data[0]);
      Cookies.set('user', JSON.stringify(data[0]), { expires: 1 }); // 設置 cookie，保存一天
      navigate('/');
    } else {
      alert('帳號或密碼錯誤');
    }
  };

  return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
      <Paper elevation={3} sx={{ padding: 4, width: 300 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          登入
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="帳號"
            variant="outlined"
            fullWidth
            margin="normal"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
          <TextField
            label="密碼"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
            onClick={handleLogin} // 確保按鈕觸發 handleLogin
          >
            登入
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default Login;