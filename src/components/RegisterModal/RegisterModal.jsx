import { useState } from "react";
import "./RegisterModal.css";
import ModalWithForm from "../ModelWithForm/ModalWithForm";

function RegisterModal({ onClose, isOpen, onSubmit, handleShowLogin }) {
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

  const handleSubmitRegisteration = (e) => {
    console.log("asf");
    e.preventDefault();
    onSubmit({ email, password, name });
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      onClose={onClose}
      isOpen={isOpen}
      handlesubmitRegisteration={handleSubmitRegisteration}
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
      <label htmlFor="name" className="modal__label">
        Username
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          name="name"
          value={name}
          onChange={handleNameChange}
        />
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
