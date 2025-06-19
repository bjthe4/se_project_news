// import { useState } from "react";
import "./App.css";
import Main from "../Main/Main";
import Header from "../Header/Header";
import About from "../About/About";
import Footer from "../Footer/Footer";

function App() {
  return (
    <>
      <div className="page">
        <div className="page__background">
          <Header />
          <Main />
          <About />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
