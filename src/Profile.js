import React, { useState } from 'react';
import { supabase } from './supabaseClient'; // 引入 supabase 客戶端
import { useNavigate } from 'react-router-dom'; // Replace useHistory with useNavigate

function Profile() {
    const [name, setName] = useState('');
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    // 註冊處理函數
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // 在 users 表格中插入新用戶資料
            const { data, error } = await supabase
                .from('users')
                .insert([{ name, account, password }]);

            if (error) throw error;

            setMessage('註冊成功！');
            setTimeout(() => navigate('/'), 2000); // 2 秒後跳轉到登入頁面
        } catch (error) {
            setMessage(`註冊失敗: ${error.message}`);
        }
    };

    return (
        <div className="card shadow-lg mx-auto" style={{ maxWidth: '400px', marginTop: '100px' }}>
            <div className="card-body">
                <h2 className="card-title text-center">註冊頁面</h2>
                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">姓名：</label>
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
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
                    <button type="submit" className="btn btn-primary w-100">註冊</button>
                </form>
                {message && <p className="mt-3 text-success">{message}</p>}
            </div>
        </div>
    );
}

export default Profile;
