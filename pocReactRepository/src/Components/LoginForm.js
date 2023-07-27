import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import userData from '../actions/users.json';

const LoginForm = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loginFailed, setLoginFailed] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
      setEmailError('Username/Email is required');
      return;
    } else if (!validateEmail(username.trim())) {
      setEmailError('Invalid email format');
      return;
    }

    try {
      setEmailError('');

      const response = userData;            // await axios.post('/api/login', { username, password });


      /*
      in real life scenario we assume that we recieve a jwo token
      we should store it in a secure location like an HTTP cookie or local storage,  maintain user authentication throughout the session in the header Bearer ..
      the token also needs to be refreshed 

      */

      const userFiltered = response.users.filter(user => {
        return user.password === password && user.email === username;
      });

      if (!userFiltered || userFiltered.length == 0) {
        console.error('Login failed:', username);
        setLoginFailed('Login failed');
        return;
      }

      console.log('Login successful!');

      setIsLoggedIn(true);
    } catch (error) {
      console.error('Login failed:', error.response.data.message);
      // AS MENTIONED IN THE READ ME - DUE TO LACK OF TIME SERVER SIDE LOGIN WAS NOT COMPLETED 
      setIsLoggedIn(true);
    }
  };

  return (
    <form className='login-form' onSubmit={handleSubmit}>
      <label>
        Username/Email:
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <button type="submit">Login</button>
      <br></br>
      {emailError && <span className='login-error'>{emailError}</span>}
      {loginFailed && <span className='login-error'>{loginFailed}</span>}
    </form>
  );
};

export default LoginForm;
