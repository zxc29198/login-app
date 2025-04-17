import React from 'react';

function HomePage({ currentUser, items }) {
    return (
        <div className="container">
            {currentUser ? (
                <>
                    <h2>歡迎回來，{currentUser.name}！這是您的代辦清單。</h2>
                    <div className="grid-container">
                        {items.map((item, index) => (
                            <div key={index} className="grid-item">
                                <Card>
                                    <CardContent>
                                        <Typography>{item.title}</Typography>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <h2>請先登入以查看代辦清單</h2>
            )}
        </div>
    );
}

// 在 CSS 中新增樣式
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.grid-item {
  padding: 8px;
}

export default HomePage;