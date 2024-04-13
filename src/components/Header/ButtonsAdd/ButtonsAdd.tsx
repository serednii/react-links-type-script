import React from 'react';
import './ButtonsAdd.scss';
import { Button } from 'react-bootstrap';
import Context from '../../../Context';
import { useContext } from 'react';

const ButtonsAdd: React.FC = () => {

    const valueContext = useContext(Context)

    function handlerOpenPopup(): void {
        valueContext.setIsButtonPlus(!valueContext.isButtonPlus);
        valueContext.seIsChangeLinks(false);
    }

    return (
        <div className='buttonsAdd'>
            <Button variant="secondary" onClick={handlerOpenPopup}>Add new category</Button>
        </div>
    )

}

export default ButtonsAdd;
