import React from 'react';

function HomePage({ currentUser }) {
    return (
        <div className="container">
            {currentUser ? (
                <h2>歡迎回來，{currentUser.name}！這是您的代辦清單。</h2>
            ) : (
                <h2>請先登入以查看代辦清單</h2>
            )}
        </div>
    );
}

export default HomePage;