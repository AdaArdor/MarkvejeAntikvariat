import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from './AuthContext'

function Header() {
    const { user, logout, cartCount } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
    };

    return (
        <div className='header'>
            <h1>
                <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Markveje Antikvariat</Link>
            </h1>
            <nav className='nav'>
                <ul>
                    <li><Link to="/about" style={{ color:'inherit', textDecoration:'none' }}>About</Link></li>
                    <li><Link to="/shop" style={{ color:'inherit', textDecoration:'none' }}>Shop</Link></li>
                    {user ? (
                        <li className="menu-container">
                            <button 
                                className="menu-button" 
                                onClick={() => setMenuOpen(!menuOpen)}
                            >
                                <span className="menu-icon">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>
                            </button>
                            {menuOpen && (
                                <div className="dropdown-menu">
                                    <p>Hello, {user.username}</p>
                                    <button onClick={handleLogout}>Log out</button>
                                </div>
                            )}
                        </li>
                    ) : (
                        <li><Link to="/login" style={{ color:'inherit', textDecoration:'none' }}>Log in</Link></li>
                    )}
                    <li>
                        <Link to="/basket" className="basket-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                            {cartCount > 0 && (
                                <span className="cart-badge">{cartCount}</span>
                            )}
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Header