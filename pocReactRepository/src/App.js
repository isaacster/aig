import './App.css';
import LoginForm from './Components/LoginForm';
import { AuthContext } from './Components/AuthContext';
import React, { useContext, useState } from 'react';
import EmailContainer from './Components/EmailManagement/EmailContainer';
import GlobalContext from './Components/GlobalContext';

function App() {

  GlobalContext.ApiUrl = "https://localhost:44375/api/";
  GlobalContext.headers = { 'Content-Type': 'application/json' };

  return (
    <div>

      <p style={{ color: "red", padding: "15px" }}>
        Hi from Itzik !
      </p>
 
      <React.Fragment >
        <EmailContainer> </EmailContainer>
      </React.Fragment>

    </div>
  );
}

export default App;
