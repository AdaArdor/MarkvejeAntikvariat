import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAuth } from './AuthContext';
import API_URL from './config';

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const { user, fetchCartCount } = useAuth();

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(b => String(b.id) === String(id));
        setBook(found);
      });
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [id]);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please log in to add items to cart');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/cart/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ bookId: book.id })
      });
      const data = await res.json();
      if (res.ok) {
        setAddedToCart(true);
        fetchCartCount();
        setTimeout(() => setAddedToCart(false), 2000);
      } else {
        alert(data.error || 'Failed to add to cart');
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Error adding to cart');
    }
  };

  if (!book) return <div>Book not found</div>;

  const images = Array.isArray(book.image) ? book.image : (book.image ? [book.image] : []);

  return (
    <div>
      <div className="book-detail" style={{ display: 'flex', alignItems: 'flex-start', gap: '2em' }}>
        <div style={{ flex: '0 0 300px' }}>
          <img
            src={images[0]}
            alt={book.title}
            style={{ width: '100%', height: '400px', objectFit: 'contain', borderRadius: '8px', background: '#fff' }}
          />
        </div>
        <div>
          <h2>{book.title}</h2>
          <h4>{book.author}</h4>
          <p>{book.description}</p>
          <div className='bk-dt-price'>{book.price} kr.</div>
          <button className='add-to-cart' onClick={handleAddToCart}>
            {addedToCart ? '✓ Added!' : 'Add to cart'}
          </button>
        </div>
      </div>
      {images.length > 1 && (
        <div className="additional-images" style={{ maxWidth: 900, margin: '1.5rem auto', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          {images.slice(1).map((src, idx) => (
            <div key={idx} style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img
                src={src}
                alt={`${book.title} - extra ${idx + 1}`}
                style={{ width: '100%', height: 'auto', objectFit: 'contain', borderRadius: 8, background: '#fff', border: '3px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookDetail