import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setError } from "../../redux/uiSlice";
import { RootState } from "../../redux/rootReducer"; // Убедитесь, что путь правильный
import "./errors.scss";
const Errors = () => {
  const { error } = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();
  const modalParent = useRef(null);
  const modalContent = useRef(null);

  console.log("Errors Component", modalParent);
  const handleClose = () => {
    dispatch(setError(""));
  };

  return (
    <div
      id="myModal"
      className={`modal fade ${error ? "show" : ""}`}
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
            <p>{error}</p>
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
