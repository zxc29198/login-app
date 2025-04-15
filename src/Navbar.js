import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ currentUser, onLogout }) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
            <div className="container-fluid">
                <h1>登入註冊系統</h1>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {currentUser ? (
                            <>
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        id="navbarDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        功能列
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li>
                                            <Link className="dropdown-item" to="/update-info">更新資訊</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-danger" onClick={onLogout}>登出</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">登入</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">註冊</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
