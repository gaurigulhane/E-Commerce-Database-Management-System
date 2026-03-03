import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiShoppingCart, FiSearch, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { cartCount } = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState('');
    const [mobileOpen, setMobileOpen] = useState(false);
    const searchParams = new URLSearchParams(location.search);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
        }
    };

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="navbar">
            <Link to="/" className="logo">ELITE COMMERCE</Link>

            <div className={`nav-links ${mobileOpen ? 'mobile-show' : ''}`}>
                <Link to="/" className={isActive('/') && !location.search ? 'active' : ''} onClick={() => setMobileOpen(false)}>Shop</Link>
                <Link to="/?category=Electronics" className={searchParams.get('category') === 'Electronics' ? 'active' : ''} onClick={() => setMobileOpen(false)}>Categories</Link>
                <Link to="/?deals=true" className={searchParams.get('deals') === 'true' ? 'active' : ''} onClick={() => setMobileOpen(false)}>Deals</Link>
            </div>

            <form className="nav-search" onSubmit={handleSearch}>
                <FiSearch size={15} color="var(--text-muted)" />
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </form>

            <div className="nav-actions">
                <Link to="/login" className="nav-icon-btn" title="Account">
                    <FiUser size={18} />
                </Link>
                <Link to="/cart" className="nav-icon-btn" title="Cart">
                    <FiShoppingCart size={18} />
                    {cartCount > 0 && <span className="cart-badge">{cartCount > 9 ? '9+' : cartCount}</span>}
                </Link>
                <button
                    className="nav-icon-btn mobile-menu-btn"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    {mobileOpen ? <FiX size={18} /> : <FiMenu size={18} />}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
