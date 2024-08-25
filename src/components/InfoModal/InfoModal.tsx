import { useEffect } from "react";
import logicStore from "../../mobx/LogicStore";
import "./InfoModal.scss";

const InfoModal = () => {
  console.log("InfoModal.");
  useEffect(() => {
    const timer = setTimeout(() => {
      logicStore.setInfo("");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="myModal" className={`modal fade ${logicStore.info ? "show" : ""}`}>
      <div className="modal-dialog modal-confirm">
        <div className="modal-content">
          <div className="modal-body text-center">
            <h4>Successful!</h4>
            <p>{logicStore.info}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
