import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'node:path'
import books from '../Markveje/src/bookData.js'

async function seedTable() {

  const db = await open({
    filename: path.join('database.db'),
    driver: sqlite3.Database
  })

  try {

    await db.exec('BEGIN TRANSACTION')

    for (const {title, author, id, price, genre, description, image} of books) {
      const imageStr = Array.isArray(image) ? image[0] : image;
      await db.run(
        `INSERT INTO books (title, author, id, price, genre, description, image)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [title, author, id, price, genre, description, imageStr]
      )
    }
    
    await db.exec('COMMIT')
    console.log('All records inserted')

  } catch (err) {

    await db.exec('ROLLBACK')
    console.log('Error inserting data', err.message)

  } finally {

    await db.close()
    console.log('connection closed')

  }

}

seedTable()