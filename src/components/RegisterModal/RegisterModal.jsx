import { useState } from "react";
import "./RegisterModal.css";
import ModalWithForm from "../ModelWithForm/ModalWithForm";

function RegisterModal({ onClose, isOpen, onSubmit, handleShowLogin }) {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");

  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  if (!isOpen) {
    return null;
  }

  const validateForm = () => {
    let isValid = true;

    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Enter a valid email.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!name) {
      setNameError("Username is required.");
      isValid = false;
    } else {
      setNameError("");
    }

    return isValid;
  };

  const handleSubmitRegisteration = (e) => {
    console.log("asf");
    e.preventDefault();
    if (validateForm()) {
      onSubmit({ email, password, name });
    }
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmitRegisteration}
    >
      <label htmlFor="email" className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        {emailError && <p className="register__modal-error ">{emailError}</p>}
      </label>
      <label htmlFor="password" className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          id="password"
          placeholder="Enter password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {passwordError && (
          <p className="register__modal-error ">{passwordError}</p>
        )}
      </label>
      <label htmlFor="name" className="modal__label">
        Username
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Enter your username"
          name="name"
          value={name}
          onChange={handleNameChange}
        />
        {nameError && <p className="register__modal-error ">{nameError}</p>}
      </label>
      <label className="register__signUp">
        <button type="submit" className="register__signup">
          Sign up
        </button>
        <div className="register__signIn">
          <button
            className="register__login-link"
            type="button"
            onClick={handleShowLogin}
          >
            <span className="register__or-text">or </span> Sign In
          </button>
        </div>
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
