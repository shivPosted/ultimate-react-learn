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
    <>
      <Header />
      <Menu />
      <Footer />
    </>
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
        <ul className="pizzas">
          {pizzas.map((pizza, i) => (
            <Pizza key={i} pizza={pizza} />
          ))}
        </ul>
      ) : (
        <p>We&apos;re working on our menu. Please come back later :)</p>
      )}
    </main>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const open = 8;
  const close = 20;
  const isOpen = hour >= open && hour <= close;

  return (
    <div className="order">
      <footer className="footer">
        {isOpen ? (
          <p>We&apos;re Open Now</p>
        ) : (
          <p>
            We&apos;re open between 0{open}:00 and {close}:00
          </p>
        )}
      </footer>
      <button className="btn">Order</button>
    </div>
  );
  // React.createElement('footer', null, "We're Open Now!");
}

function Pizza(props) {
  if (props.pizza.soldOut) return null;
  return (
    <li className="pizza">
      <img src={props.pizza.photoName} alt={props.pizza.name} />
      <div>
        <h3>{props.pizza.name} </h3>
        <p>{props.pizza.ingredients}</p>
        <span>{props.pizza.price}</span>
      </div>
    </li>
  );
}

export default App;
