import React from "react";
import "./ButtonsAdd.scss";
// import { Button } from 'react-bootstrap';
import Button from "react-bootstrap/Button";
import Context from "../../../Context";
import { useContext } from "react";

const ButtonsAdd: React.FC = () => {
  const {
    setIsModal,
    setIsAddCategoryMain,
    setIsAddCategoryOther,
    setIsButtonPlus,
    setIsChangeLinks,
    isButtonPlus,
  } = useContext(Context);

  function handlerOpenPopup(): void {
    setIsButtonPlus(!isButtonPlus);
    setIsChangeLinks(false);
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
