import './App.css';
import LoginForm from './Components/LoginForm';
import { AuthContext } from './Components/AuthContext';
import React, { useContext, useState } from 'react';
import ProjectContainer from './Components/ProjectManagement/ProjectContainer';

function App() {

  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div>

      <p style={{ color: "red", padding: "15px" }}>
        Hi from Itzik !
      </p>

      {isLoggedIn ? (
        null) :
        (
          <p style={{ color: "red", padding: "15px" }}>
            password is 1234 username itzik.yehuda@gmail.com
          </p>
        )}

      {isLoggedIn ? (
        <React.Fragment >
          <ProjectContainer> </ProjectContainer>
        </React.Fragment>) :
        (
          <LoginForm />
        )}
        
    </div>
  );
}

export default App;
