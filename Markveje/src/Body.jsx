import React from 'react'
import books from './bookData'
import { Link } from 'react-router-dom'


function Body() {
        
        const latest = [...books]
            .sort((a, b) => Number(b.id) - Number(a.id))
            .slice(0, 6);

        const bookGrid = latest.map(book => {
            return (
                <section className="book-card" key={book.id}>
                    <Link to={`/book/${book.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className='image-container'>
                            <img src={Array.isArray(book.image) ? book.image[0] : book.image} alt={book.title} />
                        </div>
                        <div className='text-container'>
                            <h4>{book.author}</h4>
                            <h3>{book.title}</h3>
                            <div className="price">{book.price} kr.</div>
                            <button className="add-to-cart">Add to cart</button>
                        </div>
                    </Link>
                </section>
            )
        });

    return (
        <div>
            <div className="recently-added">
                <h2>Recently added items</h2>
                <div className='book-grid'>
                    {bookGrid}
                </div>
            </div>

            <section className="showcase-container">
                <div className="showcase-inner">
                    <div className="showcase-row">
                        <div className="showcase-image">
                            <img src='/images/horst-2.jpeg'/>
                        </div>
                        <div className="showcase-text">
                            <h2>Showcase:</h2>
                            <h3>Horst P. Horst</h3>
                            <p>Horst P. Horst (1906–1999) was one of the 20th century's most influential fashion photographers.
                                Born in Germany and later based in New York, Horst built a distinct visual language defined by elegant
                                composition, dramatic lighting, and refined theatricality. His portraits and fashion studies — often characterized by
                                a sculptural clarity and timeless glamour — helped define modern notions of beauty and continue to inspire photographers and
                                designers today.</p>
                        </div>
                    </div>

                    <div className="showcase-row reverse">
                        <div className="showcase-image">
                            <img src='/images/horst-3.jpeg'/>
                        </div>
                        <div className="showcase-text">
                            <h3>Featured item: Form (1992)</h3>
                            <p>Form (1992) collects Horst P. Horst’s photographic studies that foreground composition, geometry and the sculptural use of light.
                                The book brings together portraits, fashion studies and still lifes where pared-down staging, crisp lighting and refined posing
                                transform subjects into elegant shapes — emphasizing line, shadow and surface. It’s widely used as a reference for photographers
                                and designers who value classical composition and disciplined visual restraint.</p>
                                <Link to="/book/13" className="see-more-btn">See more</Link>
                        </div>
                    </div>
                </div>
            </section>

            <div className="green-spacer">
            </div>

            <div className='bookshelf-div'>
                <div className="bookshelf-image-wrapper">
                    <img src='/images/bookshelf.jpg' alt="Bookshelf" />
                    <div className="bookshelf-overlay-content">
                        <div className="bookshelf-overlay-text">
                            <h2>We Buy Books</h2>
                            <p>
                                Markveje is always looking for interesting books. If you have books you’d like to sell, we’d love to hear from you!
                                <br /><br />
                                Contact us at markvejebusiness@gmail.com.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Body