// components/Modal.jsx
import React from "react";
import "./Modal.css";

/**
 * Modal Component
 *
 * A reusable modal with a black overlay. The modal is controlled externally
 * by props passed from the parent component.
 *
 * Props:
 * - isOpen (boolean): Determines whether the modal is visible.
 * - onClose (function): Callback to close the modal when overlay or close button is clicked.
 * - children (ReactNode): Content to be displayed inside the modal.
 *
 * Behavior:
 * - Clicking on the overlay closes the modal.
 * - Clicking inside the modal content does not propagate, preventing accidental close.
 * - A close button ("×") is provided inside the modal for accessibility.
 */
export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null; // Do not render modal if not open

  return (
    <div className="modal modal--open">
      <div className="modal__overlay" onClick={onClose}>
        {/* Stop click propagation to prevent modal from closing when clicking inside */}
        <div className="modal__content" onClick={(e) => e.stopPropagation()}>
          {/* Accessible close button */}
          <button className="modal__close" onClick={onClose}>
            {" "}
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}
