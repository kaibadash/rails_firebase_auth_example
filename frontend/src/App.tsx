import React from 'react';
import './App.css';
import initFirebase from "./services/Firebase";

function App() {
  initFirebase();
  return (
    <div className="App">
      Home
      <div id="firebaseui-auth-container"></div>
      <div id="loader">Loading...</div>
    </div>
  );
}

export default App;
