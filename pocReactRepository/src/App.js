import './App.css';
import LoginForm from './Components/LoginForm';
import { AuthContext } from './Components/AuthContext';
import React, { useContext, useState } from 'react';
import EmailContainer from './Components/ProjectManagement/EmailContainer';
import GlobalContext from './Components/GlobalContext';

function App() {

  GlobalContext.ApiUrl = "https://localhost:44375/api/";
  GlobalContext.headers = { 'Content-Type': 'application/json' };
 // const { isLoggedIn } = useContext(AuthContext);

  return (
    <div>

      <p style={{ color: "red", padding: "15px" }}>
        Hi from Itzik !
      </p>

      {/*       {isLoggedIn ? (
        null) :
        (
          <p style={{ color: "red", padding: "15px" }}>
            password is 1234 username itzik.yehuda@gmail.com
          </p>
        )} */}


      {/*   {isLoggedIn ? (
        <React.Fragment >
          <ProjectContainer> </ProjectContainer>
        </React.Fragment>) :
        (
          <LoginForm />
        )} */}


      <React.Fragment >
        <EmailContainer> </EmailContainer>
      </React.Fragment>

    </div>
  );
}

export default App;
