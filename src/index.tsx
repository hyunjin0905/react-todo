import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from "firebase";




const firebaseConfig = {
    apiKey: "AIzaSyDcr1DlVM3alECeeNv9Ayh8VO2AcIwK4h0",
    authDomain: "react-basic-50e86.firebaseapp.com",
    projectId: "react-basic-50e86",
    storageBucket: "react-basic-50e86.appspot.com",
    messagingSenderId: "237625278196",
    appId: "1:237625278196:web:2d1ce1c130e06d908a68a1"
};

firebase.initializeApp(firebaseConfig);


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
