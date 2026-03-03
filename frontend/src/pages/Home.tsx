import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

interface Product {
    id: number;
    name: string;
    price: number;
    oldPrice?: number;
    image: string;
    category: string;
    rating?: number;
    reviews?: number;
}

interface BackendProduct {
    PRODUCT_ID?: number; id?: number;
    PRODUCT_NAME?: string; name?: string;
    PRICE?: number; price?: number;
    OLD_PRICE?: number; oldPrice?: number;
    CATEGORY_NAME?: string; category?: string;
    IMAGE_URL?: string; image?: string;
    RATING?: number; rating?: number;
    REVIEWS?: number; reviews?: number;
}

const CATEGORIES = ['All', 'Electronics', 'Accessories', 'Clothing', 'Home', 'Sports', 'Beauty'];

const SkeletonCard = () => (
    <div className="skeleton-card">
        <div className="skeleton" style={{ aspectRatio: '4/3' }} />
        <div style={{ padding: 16 }}>
            <div className="skeleton" style={{ height: 12, width: '40%', marginBottom: 10 }} />
            <div className="skeleton" style={{ height: 16, width: '80%', marginBottom: 8 }} />
            <div className="skeleton" style={{ height: 12, width: '60%', marginBottom: 16 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="skeleton" style={{ height: 20, width: '30%' }} />
                <div className="skeleton" style={{ height: 32, width: '35%', borderRadius: 50 }} />
            </div>
        </div>
    </div>
);

const Toast = ({ message, onDone }: { message: string; onDone: () => void }) => {
    useEffect(() => {
        const t = setTimeout(onDone, 3000);
        return () => clearTimeout(t);
    }, [onDone]);
    return (
        <div className="toast">
            <span className="toast-icon">🛒</span>
            <span>{message}</span>
        </div>
    );
};

const Home = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');
    const [toasts, setToasts] = useState<{ id: number; msg: string }[]>([]);
    const location = useLocation();
    const navigate = useNavigate();

    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search') || '';
    const urlCategory = searchParams.get('category') || 'All';
    const showDeals = searchParams.get('deals') === 'true';

    useEffect(() => {
        if (urlCategory !== activeCategory) {
            setActiveCategory(urlCategory);
        }
    }, [urlCategory]);

    const mapProduct = (p: BackendProduct): Product => ({
        id: p.PRODUCT_ID ?? p.id ?? 0,
        name: p.PRODUCT_NAME ?? p.name ?? 'Product',
        price: p.PRICE ?? p.price ?? 0,
        oldPrice: p.OLD_PRICE ?? p.oldPrice,
        image: p.IMAGE_URL ?? p.image ?? `https://picsum.photos/seed/${p.id}/400/300`,
        category: p.CATEGORY_NAME ?? p.category ?? 'General',
        rating: p.RATING ?? p.rating,
        reviews: p.REVIEWS ?? p.reviews,
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/products');
                setProducts(res.data.map(mapProduct));
            } catch {
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const addToast = useCallback((msg: string) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, msg }]);
    }, []);

    const removeToast = useCallback((id: number) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    const handleCategoryClick = (cat: string) => {
        if (cat === 'All') {
            navigate('/');
        } else {
            navigate(`/?category=${encodeURIComponent(cat)}`);
        }
    };

    const filteredProducts = products.filter(p => {
        const matchCat = activeCategory === 'All' || p.category === activeCategory;
        const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchDeals = !showDeals || (p.oldPrice !== undefined && p.oldPrice !== null);
        return matchCat && matchSearch && matchDeals;
    });

    const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

    return (
        <div>
            {/* Hero */}
            {!searchQuery && (
                <section className="hero">
                    <div className="hero-badge">✦ New Season Collection</div>
                    <h1>Experience Luxury<br />In Every Click</h1>
                    <p>Curated collections of premium products delivered to your doorstep with unmatched quality and speed.</p>
                    <div className="hero-btns">
                        <button className="btn-primary" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>
                            Shop Now
                        </button>
                        <Link to="/?deals=true" className="btn-secondary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                            View Deals
                        </Link>
                    </div>
                    <div className="hero-stats">
                        <div className="stat-item">
                            <div className="stat-value">50K+</div>
                            <div className="stat-label">Happy Customers</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">1200+</div>
                            <div className="stat-label">Premium Products</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">4.9★</div>
                            <div className="stat-label">Average Rating</div>
                        </div>
                    </div>
                </section>
            )}

            {/* Promo Banner */}
            {!searchQuery && !loading && (
                <div className="container" style={{ paddingTop: 0, paddingBottom: 0 }}>
                    <div className="promo-banner">
                        <div>
                            <h3>🎉 Summer Sale — Up to 40% Off</h3>
                            <p>Limited time offer on selected electronics and accessories.</p>
                        </div>
                        <Link to="/?category=Electronics" className="btn-primary" style={{ textDecoration: 'none' }}>Shop Electronics</Link>
                    </div>
                </div>
            )}

            {/* Products */}
            <div className="container" id="products">
                <div className="section-header">
                    <div>
                        <h2 className="section-title">
                            {showDeals ? 'Exclusive Deals' : searchQuery ? `Results for "${searchQuery}"` : activeCategory !== 'All' ? `${activeCategory} Collection` : 'Featured Products'}
                        </h2>
                        <p className="section-subtitle">
                            {loading ? 'Loading...' : `${filteredProducts.length} products`}
                            {searchQuery && (
                                <button
                                    onClick={() => navigate('/')}
                                    style={{ marginLeft: 10, background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}
                                >
                                    ✕ Clear search
                                </button>
                            )}
                        </p>
                    </div>
                </div>

                {/* Category Filter */}
                <div className="category-bar">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`category-chip ${activeCategory === cat ? 'active' : ''}`}
                            onClick={() => handleCategoryClick(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="product-grid">
                    {loading
                        ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                        : filteredProducts.length === 0
                            ? (
                                <div className="no-results">
                                    <div style={{ fontSize: '3rem', marginBottom: 12, opacity: 0.3 }}>🔍</div>
                                    <h3 style={{ marginBottom: 8 }}>No products found</h3>
                                    <p>Try a different category or search term.</p>
                                    <button className="btn-primary" style={{ marginTop: 20 }} onClick={() => { setActiveCategory('All'); navigate('/'); }}>
                                        Browse All
                                    </button>
                                </div>
                            )
                            : filteredProducts.map(product => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onAddToCart={() => addToast(`${product.name} added to cart!`)}
                                />
                            ))
                    }
                </div>
            </div>

            {/* Toast Notifications */}
            <div className="toast-container">
                {toasts.map(t => (
                    <Toast key={t.id} message={t.msg} onDone={() => removeToast(t.id)} />
                ))}
            </div>
        </div>
    );
};

export default Home;
