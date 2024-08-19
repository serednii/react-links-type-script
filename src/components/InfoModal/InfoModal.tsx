import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setInfo } from "../../redux/uiSlice";
import { RootState } from "../../redux/rootReducer"; // Убедитесь, что путь правильный
import "./InfoModal.scss";

const InfoModal = () => {
  const { info } = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setInfo(""));
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

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

    <div id="myModal" className={`modal fade ${info ? "show" : ""}`}>
      <div className="modal-dialog modal-confirm">
        <div className="modal-content">
          <div className="modal-body text-center">
            <h4>Successful!</h4>
            <p>{info}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
