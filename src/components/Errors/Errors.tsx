import { useRef } from "react";
import logicStore from "../../mobx/LogicStore";
import "./errors.scss";
const Errors = () => {
  const modalParent = useRef(null);
  const modalContent = useRef(null);

  console.log("Errors Component", modalParent);
  const handleClose = () => {
    logicStore.setError("");
  };

  return (
    <div
      id="myModal"
      className={`modal fade ${logicStore.error ? "show" : ""}`}
      ref={modalParent}
    >
      <div className="modal-dialog modal-confirm">
        <div className="modal-content" ref={modalContent}>
          <div className="modal-header justify-content-center">
            <div className="icon-box">
              <i className="material-icons">&#xE5CD;</i>
            </div>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-hidden="true"
              onClick={handleClose}
            >
              &times;
            </button>
          </div>
          <div className="modal-body text-center">
            <h4>Ooops!</h4>
            <p>{logicStore.error}</p>
            <button
              className="btn btn-success"
              data-dismiss="modal"
              onClick={handleClose}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Errors;
