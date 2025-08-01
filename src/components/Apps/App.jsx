import { useState } from "react";
import "./App.css";
import Main from "../Main/Main";
import Header from "../Header/Header";
import About from "../About/About";
import Footer from "../Footer/Footer";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";

function App() {
  const [activeModal, setActiveModal] = useState("");
  // const [selectedCard, setSelectedCard] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    email: "",
    password: "",
    name: "",
    _id: "",
    token: "",
  });
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
  });
  // const handleCardClick = (card) => {
  //   setActiveModal("preview");
  //   setSelectedCard(card);
  // };
  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddRegistration = () => {
    setActiveModal("registration-modal");
  };

  const handleShowLogin = () => {
    setActiveModal("login-modal");
  };

  return (
    <>
      <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
        <div className="page">
          <div className="page__background">
            <Header
              userData={userData}
              handleAddRegistration={handleAddRegistration}
              handleShowLogin={handleShowLogin}
            />
            <Main />
            <About />
            <Footer />
            <RegisterModal
              isOpen={activeModal === "registration-modal"}
              onClose={closeActiveModal}
              // onSubmit={handleRegistration}
              handleShowLogin={handleShowLogin}
            />
            <LoginModal
              isOpen={activeModal === "login-modal"}
              onClose={closeActiveModal}
              // onSubmit={handleLogin}
              handleAddRegistration={handleAddRegistration}
            />
          </div>
        </div>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
