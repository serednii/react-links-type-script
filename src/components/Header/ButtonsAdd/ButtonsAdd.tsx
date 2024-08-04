import React from "react";
// import { Button } from 'react-bootstrap';
import Button from "react-bootstrap/Button";
import { MyContext } from "../../../MyContext";
import { useContext } from "react";

import { useSelector, useDispatch } from "react-redux";
import { setButtonPlus, setChangeLinks } from "../../../redux/uiSlice";

import { RootState } from "../../../redux/rootReducer"; // Убедитесь, что путь правильный
import "./ButtonsAdd.scss";

const ButtonsAdd: React.FC = () => {
  const {
    setIsModal,
    setIsAddCategoryMain,
    setIsAddCategoryOther,
    setIsButtonPlus,
    isButtonPlus,
  } = useContext(MyContext);
  const dispatch = useDispatch();
  // const { isButtonPlus } = useSelector((state: RootState) => state.ui);

  function handlerOpenPopup(): void {
    setIsButtonPlus(!isButtonPlus);
    dispatch(setChangeLinks(false));
  }

  function plusMain(): void {
    setIsModal(true);
    setIsAddCategoryMain(true);
    setIsAddCategoryOther(false);
  }

  return (
    <div className="buttonsAdd">
      {/* <Button variant="primary" onClick={plusMain}>Add new main category</Button> */}
      <Button variant="primary" onClick={handlerOpenPopup}>
        Change categories
      </Button>
      {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handlerOpenPopup}>
                Change categories
            </button> */}
    </div>
  );
};

export default ButtonsAdd;
