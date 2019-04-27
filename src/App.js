import React from 'react';
import './App.css';
import { Header } from './components/Header'
import { CinemaHall } from './components/CinemaHall'
import { Footer } from "./components/Footer";

function App() {
  return (
    <>
      <Header/>
      <CinemaHall/>
      <Footer/>
    </>
  );
}

export default App;
