import React from 'react';

function About() {
  return (
    <div className="about-container">
      <h1>About Markveje Antikvariat</h1>
      
      <section className="about-section">
        <h2>About Us</h2>
        <p>
          We are an online antiquarian bookstore located in Aarhus. We are passionate about
          used books of all shapes, sizes and ages. We offer a wide variety of used and antiquarian books from modest to pristine condition,
          and we offer them in all price ranges. Our specialty is the humanities and art books,
          but we try to have something for everyone. Our books are primarily in Danish and English,
          but we do also have books in other languages from time to time.
        </p>

        <p>
            We store your user info safely and in accordance with Danish- and EU-law. You can
            safely provide us your actual email-address - we promise not to spam you!
        </p>
      </section>

      <section className="about-section">
        <h2>What We Offer</h2>
        <p>
          New books are uploaded weekly, if not daily. Shipping is 50 DKK in Denmark no matter
          the size and weight of the package. Shipping outside Danish borders is more expensive
          and depends on location. Please contact us for more information. All packages in Denmark
          are sent with PostNord to the nearest parcel-pick up.
        </p>
        <p>
            We strive to have a complete and accurate description of all our books, but you are
            always welcome to write to us for more information regarding a title. More pictures
            than the provided ones on the given book can also be given on request. You are also always
            welcome to contact us, if you are looking for a specific title - we may have it stored away
            somewhere!
        </p>
      </section>

      <section className="about-section">
        <h2>Contact</h2>
        <p>
          Email: kontakt@markvejebusiness.dk<br />
          Phone: +45 xxxxxxxx
        </p>
      </section>
    </div>
  );
}

export default About;
