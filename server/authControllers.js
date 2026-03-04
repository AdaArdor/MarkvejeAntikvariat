import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import bcrypt from 'bcrypt';
import validator from 'validator';

/* SIGNUP */

export async function signupUser(req, res) {
  let { email, username, password } = req.body;
  if (!email || !username || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  email = email.trim()
  username = username.trim()

  if (!/^[a-zA-Z0-9_-]{1,20}$/.test(username)) {

    return res.status(400).json({ error: 'Username must be 1–20 characters, using letters, numbers, _ or -.' })
  }

  if (!validator.isEmail(email)) {

    return res.status(400).json({ error: 'Invalid email format' })

  }

  const db = await open({
    filename: 'database.db',
    driver: sqlite3.Database
  });

  const existingUsernameAndEmail = await db.get('SELECT id FROM users WHERE username = ? AND email = ?', [username, email]);
  if (existingUsernameAndEmail) {
    await db.close();
    return res.status(400).json({ error: 'Username and email already in use.' });
  }

  const existingUsername = await db.get('SELECT id FROM users WHERE username = ?', [username]);
  if (existingUsername) {
    await db.close();
    return res.status(400).json({ error: 'Username already in use.' });
  }

  const existingEmail = await db.get('SELECT id FROM users WHERE email = ?', [email]);
  if (existingEmail) {
    await db.close();
    return res.status(400).json({ error: 'Email already in use.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await db.run(
    'INSERT INTO users (email, username, password) VALUES (?, ?, ?)',
    [email, username, hashedPassword]
  );

  req.session.userId = result.lastID

  await db.close();
  res.json({ success: true });
}


/* LOGIN */

export async function loginUser(req, res) {
  let db;
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    db = await open({
      filename: 'database.db',
      driver: sqlite3.Database
    });

    const user = await db.get('SELECT * FROM users WHERE username = ?', [username]);
    
    if (!user) {
      await db.close();
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (!passwordMatch) {
      await db.close();
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    req.session.userId = user.id;
    
    await db.close();
    res.json({ success: true, username: user.username });
  } catch (err) {
    console.error('Login error:', err);
    if (db) await db.close();
    res.status(500).json({ error: 'Server error' });
  }
}

/* GET CURRENT USER */
export async function getMe(req, res) {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not logged in' });
  }

  let db;
  try {
    db = await open({
      filename: 'database.db',
      driver: sqlite3.Database
    });

    const user = await db.get('SELECT id, username, email FROM users WHERE id = ?', [req.session.userId]);
    await db.close();

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (err) {
    console.error('GetMe error:', err);
    if (db) await db.close();
    res.status(500).json({ error: 'Server error' });
  }
}

/* LOGOUT */
export async function logoutUser(req, res) {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.clearCookie('connect.sid');
    res.json({ success: true });
  });
}