import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import LeaderboardBtn from '../components/LeaderboardBtn';
import MatchesBtn from '../components/MatchesBtn';
import '../styles/pages/login.css';

const API_URL = 'http://localhost:3001';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [failedTryLogin, setFailedTryLogin] = useState(false);

  const login = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      const { token, role } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      setIsLogged(true);
      setFailedTryLogin(false); // Assegure-se de resetar o estado de falha aqui
    } catch (error) {
      console.error(error);
      setFailedTryLogin(true);
    }
  };

  useEffect(() => {
    setFailedTryLogin(false);
  }, [email, password]);

  if (isLogged) return <Navigate to="/matches" />;

  return (
    <>
      <Header
        page=""
        FirstNavigationLink={ LeaderboardBtn }
        SecondNavegationLink={ MatchesBtn }
      />
      <section className="user-login-area">
        <form onSubmit={login}> {/* Use onSubmit aqui */}
          <h1>Área do usuário</h1>
          <label htmlFor="email-input">
            <input
              className="login__login_input"
              type="text"
              value={ email }
              onChange={ ({ target: { value } }) => setEmail(value) }
              data-testid="login__login_input"
              placeholder="Login"
            />
          </label>
          <label htmlFor="password-input">
            <input
              type="password"
              value={ password }
              onChange={ ({ target: { value } }) => setPassword(value) }
              data-testid="login__password_input"
              placeholder="Senha"
            />
          </label>
          {failedTryLogin && (
            <p data-testid="login__input_invalid_login_alert">
              O endereço de e-mail ou a senha não estão corretos. Por favor, tente novamente.
            </p>
          )}
          <button
            data-testid="login__login_btn"
            type="submit"
          >
            Entrar
          </button>
        </form>
      </section>
    </>
  );
};

export default Login;
