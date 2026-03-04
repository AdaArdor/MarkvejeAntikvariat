import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'node:path'

async function createTable() {

      const db = await open({
            filename: path.join('database.db'),
            driver: sqlite3.Database
      })

      await db.exec(`
            CREATE TABLE IF NOT EXISTS books (
                  id INTEGER PRIMARY KEY AUTOINCREMENT, 
                  title TEXT NOT NULL, 
                  author TEXT NOT NULL,
                  price REAL NOT NULL,
                  image TEXT NOT NULL,
                  genre TEXT NOT NULL,
                  description TEXT NOT NULL
            )
      `)

      await db.exec(`
            CREATE TABLE IF NOT EXISTS cart (
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  user_id INTEGER NOT NULL,
                  book_id INTEGER NOT NULL,
                  quantity INTEGER NOT NULL DEFAULT 1,
                  added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                  FOREIGN KEY (user_id) REFERENCES users(id),
                  FOREIGN KEY (book_id) REFERENCES books(id),
                  UNIQUE(user_id, book_id)
            )
      `)

      await db.close()
      console.log('tables created')
}

createTable()