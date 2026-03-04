import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

/* GET CART */
export async function getCart(req, res) {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not logged in' });
  }

  let db;
  try {
    db = await open({
      filename: 'database.db',
      driver: sqlite3.Database
    });

    const cartItems = await db.all(`
      SELECT cart.id, cart.quantity, books.id as book_id, books.title, books.author, books.price, books.image
      FROM cart
      JOIN books ON cart.book_id = books.id
      WHERE cart.user_id = ?
    `, [req.session.userId]);

    await db.close();
    res.json({ cart: cartItems });
  } catch (err) {
    console.error('Get cart error:', err);
    if (db) await db.close();
    res.status(500).json({ error: 'Server error' });
  }
}

/* ADD TO CART */
export async function addToCart(req, res) {
  console.log('Add to cart request:', req.body);
  console.log('Session userId:', req.session.userId);
  
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not logged in' });
  }

  const { bookId } = req.body;
  if (!bookId) {
    return res.status(400).json({ error: 'Book ID required' });
  }

  let db;
  try {
    db = await open({
      filename: 'database.db',
      driver: sqlite3.Database
    });

    // Check if book exists
    const book = await db.get('SELECT id FROM books WHERE id = ?', [bookId]);
    if (!book) {
      await db.close();
      return res.status(404).json({ error: 'Book not found' });
    }

    // Check if already in cart
    const existingItem = await db.get(
      'SELECT id FROM cart WHERE user_id = ? AND book_id = ?',
      [req.session.userId, bookId]
    );

    if (existingItem) {
      await db.close();
      return res.status(400).json({ error: 'Item already in cart' });
    }

    // Add new item
    await db.run(
      'INSERT INTO cart (user_id, book_id, quantity) VALUES (?, ?, 1)',
      [req.session.userId, bookId]
    );

    await db.close();
    res.json({ success: true, message: 'Added to cart' });
  } catch (err) {
    console.error('Add to cart error:', err);
    if (db) await db.close();
    res.status(500).json({ error: 'Server error' });
  }
}

/* UPDATE CART QUANTITY */
export async function updateCartQuantity(req, res) {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not logged in' });
  }

  const { cartItemId, quantity } = req.body;
  if (!cartItemId || quantity === undefined) {
    return res.status(400).json({ error: 'Cart item ID and quantity required' });
  }

  let db;
  try {
    db = await open({
      filename: 'database.db',
      driver: sqlite3.Database
    });

    if (quantity <= 0) {
      await db.run(
        'DELETE FROM cart WHERE id = ? AND user_id = ?',
        [cartItemId, req.session.userId]
      );
    } else {
      await db.run(
        'UPDATE cart SET quantity = ? WHERE id = ? AND user_id = ?',
        [quantity, cartItemId, req.session.userId]
      );
    }

    await db.close();
    res.json({ success: true });
  } catch (err) {
    console.error('Update cart error:', err);
    if (db) await db.close();
    res.status(500).json({ error: 'Server error' });
  }
}

/* REMOVE FROM CART */
export async function removeFromCart(req, res) {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not logged in' });
  }

  const { cartItemId } = req.body;
  if (!cartItemId) {
    return res.status(400).json({ error: 'Cart item ID required' });
  }

  let db;
  try {
    db = await open({
      filename: 'database.db',
      driver: sqlite3.Database
    });

    await db.run(
      'DELETE FROM cart WHERE id = ? AND user_id = ?',
      [cartItemId, req.session.userId]
    );

    await db.close();
    res.json({ success: true });
  } catch (err) {
    console.error('Remove from cart error:', err);
    if (db) await db.close();
    res.status(500).json({ error: 'Server error' });
  }
}

/* CLEAR CART */
export async function clearCart(req, res) {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not logged in' });
  }

  let db;
  try {
    db = await open({
      filename: 'database.db',
      driver: sqlite3.Database
    });

    await db.run('DELETE FROM cart WHERE user_id = ?', [req.session.userId]);

    await db.close();
    res.json({ success: true });
  } catch (err) {
    console.error('Clear cart error:', err);
    if (db) await db.close();
    res.status(500).json({ error: 'Server error' });
  }
}
