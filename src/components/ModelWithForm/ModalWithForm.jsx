import React from "react";
import "./ModalWithForm.css";
import CloseIcon from "../../assets/close-Icon.svg";

function ModalWithForm({ title, children, onClose, onSubmit, buttonText }) {
  return (
    <div className="modal">
      <div className="modal__container">
        <button className="modal__close-btn" onClick={onClose}>
          <img src={CloseIcon} alt="close" />
        </button>
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form" noValidate onSubmit={onSubmit}>
          {children}
          {/* <button type="submit" className="modal__submit-btn">
            {buttonText}
          </button> */}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
