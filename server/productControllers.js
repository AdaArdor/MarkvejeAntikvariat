import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'node:path';
import bcrypt from 'bcrypt';
import validator from 'validator'
import session from 'express-session';

const secret = process.env.SPIRAL_SESSION_SECRET || 'hopla'


export async function getProducts(req, res) {
  const db = await open({
    filename: path.join('database.db'),
    driver: sqlite3.Database
  });
  const { genre, search } = req.query;
  let query = 'SELECT * FROM books';
  let params = [];

  if (genre && search) {
    query += ' WHERE genre = ? AND (title LIKE ? OR author LIKE ? OR genre LIKE ?)';
    const searchPattern = `%${search}%`;
    params.push(genre, searchPattern, searchPattern, searchPattern);
  } else if (genre) {
    query += ' WHERE genre = ?';
    params.push(genre);
  } else if (search) {
    query += ' WHERE title LIKE ? OR author LIKE ? OR genre LIKE ?';
    const searchPattern = `%${search}%`;
    params.push(searchPattern, searchPattern, searchPattern);
  }
  const products = await db.all(query, params);
  await db.close();
  res.json(products);
}

export async function getGenres(req, res) {
  const db = await open({
    filename: path.join('database.db'),
    driver: sqlite3.Database
  });
  const genres = await db.all('SELECT DISTINCT genre FROM books');
  await db.close();
  res.json(genres.map(g => g.genre));
}