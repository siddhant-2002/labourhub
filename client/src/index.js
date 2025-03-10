import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


// import Cookies from "js-cookie";
// import translatePage from "./utils/translate";

// const initTranslation = async () => {
//   const selectedLanguage = Cookies.get('selectedLanguage');
//   console.log(selectedLanguage);
//   if (selectedLanguage) {
//     await translatePage(selectedLanguage);
//   }
// };

// const renderApp = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App className="overflow-x-hidden" />
    </React.StrictMode>
  );
  // await initTranslation();
// };

// window.addEventListener('load', renderApp);
// window.addEventListener('popstate', renderApp);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();