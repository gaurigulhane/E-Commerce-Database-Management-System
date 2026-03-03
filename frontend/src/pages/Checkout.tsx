import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiCheckCircle, FiTruck, FiCreditCard, FiPackage, FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const Checkout = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', address: '', city: '', zip: '',
        cardName: '', cardNumber: '', expiry: '', cvc: ''
    });

    if (cartItems.length === 0 && step < 4) {
        return (
            <div className="container" style={{ textAlign: 'center', paddingTop: 80 }}>
                <h2>Your cart is empty</h2>
                <p>Add some items to your cart before checking out.</p>
                <Link to="/" className="btn-primary" style={{ marginTop: 20, display: 'inline-block', textDecoration: 'none' }}>Go Shopping</Link>
            </div>
        );
    }

    const shipping = cartTotal > 100 ? 0 : 9.99;
    const tax = parseFloat((cartTotal * 0.08).toFixed(2));
    const total = parseFloat((cartTotal + shipping + tax).toFixed(2));

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate order placement
        setStep(4);
        clearCart();
    };

    const renderStepIndicator = () => (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40, gap: 20 }}>
            {[1, 2, 3].map(i => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: step >= i ? 1 : 0.4 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: step >= i ? 'var(--primary)' : 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700 }}>
                        {step > i ? '✓' : i}
                    </div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, display: i === 1 ? 'inline' : 'none' }}>Shipping</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, display: i === 2 ? 'inline' : 'none' }}>Payment</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, display: i === 3 ? 'inline' : 'none' }}>Review</span>
                </div>
            ))}
        </div>
    );

    return (
        <div className="container">
            {step < 4 ? (
                <>
                    <h1 style={{ textAlign: 'center', marginBottom: 32, fontSize: '2rem', fontWeight: 900 }}>Checkout</h1>
                    {renderStepIndicator()}

                    <div className="cart-layout" style={{ alignItems: 'flex-start' }}>
                        <div className="glass-card" style={{ padding: 32 }}>
                            {step === 1 && (
                                <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
                                    <h3 style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <FiTruck /> Shipping Information
                                    </h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: 8, fontSize: '0.85rem' }}>First Name</label>
                                            <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid var(--border)', background: 'rgba(255,255,255,0.05)', color: '#fff' }} required />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: 8, fontSize: '0.85rem' }}>Last Name</label>
                                            <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid var(--border)', background: 'rgba(255,255,255,0.05)', color: '#fff' }} required />
                                        </div>
                                    </div>
                                    <div style={{ marginBottom: 20 }}>
                                        <label style={{ display: 'block', marginBottom: 8, fontSize: '0.85rem' }}>Email Address</label>
                                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid var(--border)', background: 'rgba(255,255,255,0.05)', color: '#fff' }} required />
                                    </div>
                                    <div style={{ marginBottom: 20 }}>
                                        <label style={{ display: 'block', marginBottom: 8, fontSize: '0.85rem' }}>Street Address</label>
                                        <input type="text" name="address" value={formData.address} onChange={handleInputChange} style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid var(--border)', background: 'rgba(255,255,255,0.05)', color: '#fff' }} required />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, marginBottom: 32 }}>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: 8, fontSize: '0.85rem' }}>City</label>
                                            <input type="text" name="city" value={formData.city} onChange={handleInputChange} style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid var(--border)', background: 'rgba(255,255,255,0.05)', color: '#fff' }} required />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: 8, fontSize: '0.85rem' }}>ZIP Code</label>
                                            <input type="text" name="zip" value={formData.zip} onChange={handleInputChange} style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid var(--border)', background: 'rgba(255,255,255,0.05)', color: '#fff' }} required />
                                        </div>
                                    </div>
                                    <button type="submit" className="btn-primary" style={{ width: '100%', padding: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                                        Continue to Payment <FiArrowRight />
                                    </button>
                                </form>
                            )}

                            {step === 2 && (
                                <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
                                    <h3 style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <FiCreditCard /> Payment Details
                                    </h3>
                                    <div style={{ marginBottom: 20 }}>
                                        <label style={{ display: 'block', marginBottom: 8, fontSize: '0.85rem' }}>Cardholder Name</label>
                                        <input type="text" name="cardName" value={formData.cardName} onChange={handleInputChange} style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid var(--border)', background: 'rgba(255,255,255,0.05)', color: '#fff' }} required />
                                    </div>
                                    <div style={{ marginBottom: 20 }}>
                                        <label style={{ display: 'block', marginBottom: 8, fontSize: '0.85rem' }}>Card Number</label>
                                        <input type="text" name="cardNumber" placeholder="0000 0000 0000 0000" value={formData.cardNumber} onChange={handleInputChange} style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid var(--border)', background: 'rgba(255,255,255,0.05)', color: '#fff' }} required />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: 8, fontSize: '0.85rem' }}>Expiry Date</label>
                                            <input type="text" name="expiry" placeholder="MM/YY" value={formData.expiry} onChange={handleInputChange} style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid var(--border)', background: 'rgba(255,255,255,0.05)', color: '#fff' }} required />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: 8, fontSize: '0.85rem' }}>CVC</label>
                                            <input type="text" name="cvc" placeholder="123" value={formData.cvc} onChange={handleInputChange} style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid var(--border)', background: 'rgba(255,255,255,0.05)', color: '#fff' }} required />
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: 16 }}>
                                        <button type="button" onClick={prevStep} className="btn-secondary" style={{ flex: 1, padding: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                                            <FiArrowLeft /> Back
                                        </button>
                                        <button type="submit" className="btn-primary" style={{ flex: 2, padding: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                                            Review Order <FiArrowRight />
                                        </button>
                                    </div>
                                </form>
                            )}

                            {step === 3 && (
                                <div>
                                    <h3 style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <FiPackage /> Review Your Order
                                    </h3>
                                    <div style={{ marginBottom: 24 }}>
                                        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: 4 }}>Shipping to:</div>
                                        <div style={{ fontWeight: 600 }}>{formData.firstName} {formData.lastName}</div>
                                        <div style={{ fontSize: '0.9rem' }}>{formData.address}, {formData.city}, {formData.zip}</div>
                                    </div>
                                    <div style={{ marginBottom: 32 }}>
                                        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: 8 }}>Items:</div>
                                        {cartItems.map(item => (
                                            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.9rem' }}>
                                                <span>{item.quantity}× {item.name}</span>
                                                <span style={{ fontWeight: 600 }}>${(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div style={{ display: 'flex', gap: 16 }}>
                                        <button type="button" onClick={prevStep} className="btn-secondary" style={{ flex: 1, padding: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                                            <FiArrowLeft /> Back
                                        </button>
                                        <button type="button" onClick={handlePlaceOrder} className="btn-primary" style={{ flex: 2, padding: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                                            Place Order <FiCheckCircle />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="cart-summary-card">
                            <h3 className="cart-summary-title">Order Summary</h3>
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping</span>
                                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                            </div>
                            <div className="summary-row">
                                <span>Tax</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                            <div className="summary-row total">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div style={{ textAlign: 'center', padding: '80px 20px' }}>
                    <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--success)', color: '#fff', fontSize: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                        ✓
                    </div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: 16 }}>Order Confirmed!</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: 500, margin: '0 auto 32px' }}>
                        Thank you for your purchase. We've sent a confirmation email to <strong>{formData.email}</strong> with your order details.
                    </p>
                    <button onClick={() => navigate('/')} className="btn-primary" style={{ padding: '14px 32px' }}>
                        Continue Shopping
                    </button>
                </div>
            )}
        </div>
    );
};

export default Checkout;
