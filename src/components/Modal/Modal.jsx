import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import "./Modal.scss";

const Modal = ({ error, onClose }) => {
  console.log("error", error);
  const animation = useSpring({
    opacity: error ? 1 : 0,
    transform: error ? "translateY(0)" : "translateY(-100%)",
  });

  return (
    <div className={`modal-backdrop ${error ? "error" : ""}`} onClick={onClose}>
      <animated.div
        className="modal"
        style={animation}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h5 className="modal-title">Modal Title</h5>
          <button type="button" className="close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p>{error}</p>
        </div>
      </animated.div>
    </div>
  );
};
export default Modal;
