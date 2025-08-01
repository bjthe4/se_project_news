import { useState } from "react";
import React from "react";
import ModalWithForm from "../ModelWithForm/ModalWithForm";
import "./LoginModal.css";

function LoginModal({
  onClose,
  isOpen,
  onSubmit,
  handleAddRegistration,
  handleShowLogin,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  if (!isOpen) {
    return null;
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };
  return (
    <ModalWithForm
      title="Sign in"
      buttonText="Sign in"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal_label">
        Email
        <input
          type="email"
          className="modal_input"
          id="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          id="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <div className="login__modal">
        <button
          type="submit"
          className="login__button-modal"
          onClick={handleShowLogin}
        >
          Sign In
        </button>
        <button
          type="submit"
          className="signup__button-modal"
          onClick={handleAddRegistration}
        >
          Or Sign up
        </button>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
