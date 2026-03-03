import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import { CartProvider } from './context/CartContext';
import './index.css';

const ComingSoon = ({ title }: { title: string }) => (
  <div className="container" style={{ textAlign: 'center', paddingTop: 80 }}>
    <div style={{ fontSize: '3rem', marginBottom: 16, opacity: 0.3 }}>🚧</div>
    <h1 style={{ marginBottom: 12 }}>{title}</h1>
    <p style={{ color: 'var(--text-muted)' }}>This page is coming soon. Stay tuned for updates!</p>
  </div>
);

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/categories" element={<ComingSoon title="Browse Categories" />} />
          <Route path="/deals" element={<ComingSoon title="Exclusive Deals" />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
