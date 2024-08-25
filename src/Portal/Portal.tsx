import { observer } from "mobx-react-lite";
import ReactDom from "react-dom";
import AddCategoryOther from "../components/sttingComponents/AddCategoryOther/AddCategoryOther";
import ChangeLinks from "../components/sttingComponents/ChangeLinks/ChangeLinks";
import Errors from "../components/Errors/Errors";
import InfoModal from "../components/InfoModal/InfoModal";
import logicStore from "../mobx/LogicStore";

const portal = document.getElementById("portal");

const Portal = () => {
  // Check if the portal element is null
  if (!portal) {
    console.error("Portal element not found");
    return null;
  }

  return ReactDom.createPortal(
    <div>
      {logicStore.isAddCategoryOther && <AddCategoryOther />}
      {logicStore.isChangeLinks && <ChangeLinks />}
      {logicStore.error && <Errors />}
      {logicStore.info && <InfoModal />}
    </div>,
    portal
  );
};

export default observer(Portal);
