import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();

    const shipping = cartTotal > 100 ? 0 : 9.99;
    const tax = parseFloat((cartTotal * 0.08).toFixed(2));
    const total = parseFloat((cartTotal + shipping + tax).toFixed(2));

    if (cartItems.length === 0) {
        return (
            <div className="container">
                <h1 style={{ marginBottom: 32, fontSize: '1.8rem', fontWeight: 900 }}>Shopping Cart</h1>
                <div className="glass-card empty-cart">
                    <div className="empty-cart-icon">🛒</div>
                    <h3>Your cart is empty</h3>
                    <p>Looks like you haven't added anything yet. Start exploring our premium collection.</p>
                    <Link to="/" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 900 }}>
                    Shopping Cart <span style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 500 }}>({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</span>
                </h1>
                <button className="btn-danger" onClick={clearCart}>Clear Cart</button>
            </div>

            <div className="cart-layout">
                {/* Cart Items */}
                <div className="glass-card" style={{ overflow: 'hidden' }}>
                    {cartItems.map(item => (
                        <div className="cart-item-row" key={item.id}>
                            <img
                                className="cart-item-img"
                                src={item.image}
                                alt={item.name}
                                onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${item.id}/80/80`; }}
                            />
                            <div className="cart-item-info">
                                <div className="cart-item-name">{item.name}</div>
                                <div className="cart-item-cat">{item.category}</div>
                                <div className="qty-control">
                                    <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                                    <span className="qty-value">{item.quantity}</span>
                                    <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
                                <span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                                <button className="btn-danger" onClick={() => removeFromCart(item.id)}>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="cart-summary-card">
                    <h3 className="cart-summary-title">Order Summary</h3>

                    <div className="summary-row">
                        <span>Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                        <span>Shipping</span>
                        <span style={{ color: shipping === 0 ? 'var(--success)' : 'var(--text-secondary)' }}>
                            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                        </span>
                    </div>
                    <div className="summary-row">
                        <span>Tax (8%)</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="summary-row total">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>

                    {shipping > 0 && (
                        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 10, textAlign: 'center' }}>
                            Add <strong style={{ color: 'var(--success)' }}>${(100 - cartTotal).toFixed(2)}</strong> more for free shipping
                        </p>
                    )}

                    <Link
                        to="/checkout"
                        className="btn-primary checkout-btn"
                        style={{ textDecoration: 'none', textAlign: 'center' }}
                    >
                        Proceed to Checkout
                    </Link>

                    <Link
                        to="/"
                        style={{
                            display: 'block',
                            textAlign: 'center',
                            marginTop: 14,
                            color: 'var(--text-muted)',
                            fontSize: '0.85rem',
                            textDecoration: 'none',
                        }}
                    >
                        ← Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;
