import React from "react";
import Button from "react-bootstrap/Button";

import { useSelector, useDispatch } from "react-redux";
import { setButtonPlus, setChangeLinks } from "../../../redux/uiSlice";

import { RootState } from "../../../redux/rootReducer"; // Убедитесь, что путь правильный
import "./ButtonsAdd.scss";

const ButtonsAdd: React.FC = () => {
  const dispatch = useDispatch();
  const { isButtonPlus } = useSelector((state: RootState) => state.ui);

  function handlerOpenPopup(): void {
    dispatch(setButtonPlus(!isButtonPlus));
    dispatch(setChangeLinks(false));
  }

  return (
    <div className="buttonsAdd">
      <Button variant="primary" onClick={handlerOpenPopup}>
        Change categories
      </Button>
    </div>
  );
};

export default ButtonsAdd;
