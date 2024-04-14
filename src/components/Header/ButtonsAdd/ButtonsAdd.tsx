import React from 'react';
import './ButtonsAdd.scss';
// import { Button } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Context from '../../../Context';
import { useContext } from 'react';

const ButtonsAdd: React.FC = () => {

    const valueContext = useContext(Context)

    function handlerOpenPopup(): void {
        valueContext.setIsButtonPlus(!valueContext.isButtonPlus);
        valueContext.setIsChangeLinks(false);
    }

    function plusMain(): void {
        valueContext.setIsModal(true);
        valueContext.setIsAddCategoryMain(true);
        valueContext.setIsAddCategoryOther(false);
    }

    return (
        <div className='buttonsAdd'>
            <Button variant="primary" onClick={plusMain}>Add new main category</Button>
            <Button variant="primary" onClick={handlerOpenPopup}>Change categories</Button>
        </div>
    )

}

export default ButtonsAdd;
