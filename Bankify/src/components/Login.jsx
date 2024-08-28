import Button from './Button';
import { useEffect, useState } from 'react';
import Logo from './logo';

export default function Login({ handleLogin }) {
  useEffect(() => {
    document.body.classList.remove('a-login');
    document.body.classList.add('b-login');
    document.title = 'Bankify | Login';
    return () => {
      document.body.classList.add('a-login');
      document.body.classList.remove('b-login');
      document.title = 'Bankify | Account';
    };
  }, []);

  return (
    <section className="landing-login grid">
      <div className="description">
        <div className="welcome">
          <Logo />
          <h1>Welcome to Bankify</h1>
        </div>
        <p>
          Empower your finances with ease! Transfer money, take loans, and
          manage your account hassle-free. Experience secure and seamless
          banking for a brighter financial future.
        </p>
      </div>
      <LoginForm handleLogin={handleLogin}>
        <Button className="btn">Login</Button>
      </LoginForm>
    </section>
  );
}

function LoginForm({ children, handleLogin }) {
  const [user, setUser] = useState('');
  const [pin, setPin] = useState('');
  return (
    <div className="login">
      <h2 className="heading-login">Login</h2>
      <form
        action=""
        className="login-form"
        onSubmit={e => {
          e.preventDefault();
          handleLogin(user, pin);
          setPin('');
          setUser('');
        }}
      >
        <input
          type="text"
          className="user"
          placeholder="👤 user"
          value={user}
          onChange={e => setUser(e.target.value)}
        />
        <input
          type="password"
          className="password"
          placeholder="🔑 pin"
          value={pin}
          onChange={e => setPin(e.target.value)}
        />
        {children}
      </form>
    </div>
  );
}
