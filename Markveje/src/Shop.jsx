
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from './AuthContext'
import API_URL from './config'

export default function Shop() {
  const [products, setProducts] = useState([])
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [search, setSearch] = useState('')
  const [addedBookId, setAddedBookId] = useState(null)
  const { user, fetchCartCount } = useAuth()

  useEffect(() => {
    fetch(`${API_URL}/api/genres`)
      .then(res => res.json())
      .then(setGenres)
  }, [])

  useEffect(() => {
    const url = selectedGenre
      ? `${API_URL}/api/products?genre=${encodeURIComponent(selectedGenre)}`
      : `${API_URL}/api/products`
    fetch(url)
      .then(res => res.json())
      .then(setProducts)
  }, [selectedGenre])

  const handleAddToCart = async (e, bookId) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      alert('Please log in to add items to cart');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/cart/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ bookId })
      });
      const data = await res.json();
      if (res.ok) {
        setAddedBookId(bookId);
        fetchCartCount();
        setTimeout(() => setAddedBookId(null), 2000);
      } else {
        alert(data.error || 'Failed to add to cart');
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Error adding to cart');
    }
  };

  const filteredBooks = products.filter(book =>
  [book.title, book.author, book.genre].some(field =>
    field && field.toLowerCase().includes(search.toLowerCase())
     )
    );

  return (
    <main style={{maxWidth:1200, margin:'2rem auto'}}>
      <h2 className="shop-title">Shop — All books</h2>
      <div className="genre-search-row">
        <div className="genre-btns-group">
          {genres.map(genre => (
            <button
              className={`genre-btn${genre === selectedGenre ? ' selected' : ''}`}
              key={genre}
              onClick={() => setSelectedGenre(selectedGenre === genre ? null : genre)}
              style={{
                marginRight: '0.5rem',
                fontWeight: genre === selectedGenre ? 'bold' : 'normal'
              }}
            >
              {genre}
            </button>
          ))}
        </div>
        <input
          className="shop-search-input"
          type="text"
          placeholder="🔍"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="book-grid">
        {filteredBooks.map(book => (
          <section className="book-card" key={book.id}>
            <Link to={`/book/${book.id}`} style={{ textDecoration:'none', color:'inherit' }}>
              <div className='image-container'>
                <img src={Array.isArray(book.image) ? book.image[0] : book.image} alt={book.title} />
              </div>
              <div className='text-container'>
                <h4>{book.author}</h4>
                <h3>{book.title}</h3>
                <div className="price">{book.price} kr.</div>
                <button 
                  className="add-to-cart" 
                  onClick={(e) => handleAddToCart(e, book.id)}
                >
                  {addedBookId === book.id ? '✓ Added!' : 'Add to cart'}
                </button>
              </div>
            </Link>
          </section>
        ))}
      </div>
    </main>
  )
}