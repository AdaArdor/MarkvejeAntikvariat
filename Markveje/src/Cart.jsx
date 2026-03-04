import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import API_URL from './config';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, fetchCartCount } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      const res = await fetch(`${API_URL}/api/cart`, {
        credentials: 'include'
      });
      const data = await res.json();
      if (res.ok) {
        setCartItems(data.cart);
      }
    } catch (err) {
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (cartItemId) => {
    try {
      const res = await fetch(`${API_URL}/api/cart/remove`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ cartItemId })
      });
      if (res.ok) {
        fetchCart();
        fetchCartCount();
      }
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  const clearCart = async () => {
    try {
      const res = await fetch(`${API_URL}/api/cart/clear`, {
        method: 'POST',
        credentials: 'include'
      });
      if (res.ok) {
        setCartItems([]);
        fetchCartCount();
      }
    } catch (err) {
      console.error('Error clearing cart:', err);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  if (!user) {
    return (
      <div className="cart-container">
        <h2>Your Cart</h2>
        <p>Please <Link to="/login">log in</Link> to view your cart.</p>
      </div>
    );
  }

  if (loading) {
    return <div className="cart-container"><p>Loading...</p></div>;
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </div>
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added any books yet.</p>
          <Link to="/shop" className="continue-shopping">Browse Books</Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => {
              const images = Array.isArray(item.image) ? item.image : (item.image ? [item.image] : []);
              return (
                <div className="cart-item" key={item.id}>
                  <img 
                    src={images[0]} 
                    alt={item.title} 
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <Link to={`/book/${item.book_id}`}>
                      <h3>{item.title}</h3>
                    </Link>
                    <p>{item.author}</p>
                  </div>
                  <div className="cart-item-price">
                    {item.price} kr.
                  </div>
                  <button 
                    className="remove-item" 
                    onClick={() => removeItem(item.id)}
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
          <div className="cart-summary">
            <div className="cart-total">
              <span>Total:</span>
              <span>{total.toFixed(2)} kr.</span>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
            <button className="clear-cart-btn" onClick={clearCart}>Clear Cart</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
