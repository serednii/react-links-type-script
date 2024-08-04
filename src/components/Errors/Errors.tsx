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

  console.log("modalParent", modalParent);
  const [a, setA] = useState("");
  const handleClose = () => {
    dispatch(setError(""));
  };

  return (
    // <div
    //   className="modal fade"
    //   id="exampleModal"
    //   tabIndex={-1}
    //   aria-labelledby="exampleModalLabel"
    //   aria-hidden="true"
    // >
    //   <div className="modal-dialog">
    //     <div className="modal-content">
    //       <div className="modal-header">
    //         <h1 className="modal-title fs-5" id="exampleModalLabel">
    //           {error}
    //         </h1>
    //         <button
    //           type="button"
    //           className="btn-close"
    //           data-bs-dismiss="modal"
    //           aria-label="Close"
    //         ></button>
    //       </div>
    //       <div className="modal-body">...</div>
    //       <div className="modal-footer">
    //         <button
    //           type="button"
    //           className="btn btn-secondary"
    //           data-bs-dismiss="modal"
    //           // onClick={setError(null)}
    //         >
    //           Close
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>

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
