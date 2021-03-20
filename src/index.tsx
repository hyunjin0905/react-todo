import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from "firebase";




firebase.initializeApp({
    apiKey: "AIzaSyDcr1DlVM3alECeeNv9Ayh8VO2AcIwK4h0",
        authDomain: "react-basic-50e86.firebaseapp.com",
        projectId: "react-basic-50e86",
        storageBucket: "react-basic-50e86.appspot.com",
        messagingSenderId: "237625278196",
        appId: "1:237625278196:web:2d1ce1c130e06d908a68a1"
});



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);