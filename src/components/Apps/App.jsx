// import { useState } from "react";
import "./App.css";
import Main from "../Main/Main";
import Header from "../Header/Header";

function App() {
  return (
    <>
      <div className="page">
        <div className="page__background">
          <Header />
          <Main />
        </div>
      </div>
    </>
  );
}

export default App;
