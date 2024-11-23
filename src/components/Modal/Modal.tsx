import React from "react";
import "./Modal.css";

interface ModalProps {
  show: boolean;
  title?: string;
  children: React.ReactNode;
  closeModal: () => void;
  defaultModalBtn?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  show,
  title = "Modal Title",
  children,
  closeModal,
  defaultModalBtn = true,
}) => {
  return (
    <>
      <div
        className={`modal-overlay ${show ? "show" : ""}`}
        onClick={closeModal}
      >
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>{title}</h2>
            <button className="modal-close-btn" onClick={closeModal}>
              ×
            </button>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            {defaultModalBtn && (
              <button onClick={closeModal} className="btn btn-primary">
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
