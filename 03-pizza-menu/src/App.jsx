import React from 'react';
import '../public/style.css';

const pizzaData = [
  {
    name: 'Focaccia',
    ingredients: 'Bread with italian olive oil and rosemary',
    price: 6,
    photoName: 'pizzas/focaccia.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Margherita',
    ingredients: 'Tomato and mozarella',
    price: 10,
    photoName: 'pizzas/margherita.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Spinaci',
    ingredients: 'Tomato, mozarella, spinach, and ricotta cheese',
    price: 12,
    photoName: 'pizzas/spinaci.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Funghi',
    ingredients: 'Tomato, mozarella, mushrooms, and onion',
    price: 12,
    photoName: 'pizzas/funghi.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Salamino',
    ingredients: 'Tomato, mozarella, and pepperoni',
    price: 15,
    photoName: 'pizzas/salamino.jpg',
    soldOut: true,
  },
  {
    name: 'Pizza Prosciutto',
    ingredients: 'Tomato, mozarella, ham, aragula, and burrata cheese',
    price: 18,
    photoName: 'pizzas/prosciutto.jpg',
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Fast React Pizza CO.</h1>
    </header>
  );
}

function Menu() {
  const pizzas = [...pizzaData];
  return (
    <main className="menu">
      <h2>our menu</h2>
      {pizzas.length > 0 ? (
        <>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from our stone oven, all organic, all delicious.
          </p>
          <ul className="pizzas">
            {pizzas.map((pizza, i) => (
              <Pizza key={i} pizza={pizza} />
            ))}
          </ul>
        </>
      ) : (
        <p>We&apos;re working on our menu. Please come back later :)</p>
      )}
    </main>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const open = 8;
  const close = 22;
  const isOpen = hour >= open && hour <= close;

  return (
    <footer className="footer">
      {isOpen ? (
        <Order hour={hour} />
      ) : (
        <p>
          We&apos;re open between 0{open}:00 and {close}:00
        </p>
      )}
    </footer>
  );
  // React.createElement('footer', null, "We're Open Now!");
}
function Order({ hour }) {
  return (
    <div className="order">
      <p>
        {hour < 10 ? String(hour).padStart(2, 0) : hour}
        :00.We&apos;re Open Now
      </p>
      <button className="btn">Order</button>
    </div>
  );
}

function Pizza({ pizza: { soldOut, photoName, name, ingredients, price } }) {
  if (soldOut) return null;
  return (
    <li className="pizza">
      <img src={photoName} alt={name} />
      <div>
        <h3>{name} </h3>
        <p>{ingredients}</p>
        <span>{price}</span>
      </div>
    </li>
  );
}

export default App;
