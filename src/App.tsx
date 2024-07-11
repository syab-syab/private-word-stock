import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import Main from './components/Main';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
     {/* material UIとstyled-componentsを組み合わせる */}
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default App;
