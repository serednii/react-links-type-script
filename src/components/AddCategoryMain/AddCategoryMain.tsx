import { useContext, useState } from 'react';
import './AddCategoryMain.scss';
import Context from '../../Context';
import { svgIconClose } from '../../icon';
import { URL_SERVER } from '../App';

const AddCategory: React.FC = () => {
    const [text, setText] = useState('')
    const valueContext = useContext(Context)

    function handlerAddPopup() {
        valueContext.dataMain[text] = null;
        valueContext.setDataMain((prev: any) => {
            return { ...prev };
        });
        valueContext.outDataServer(URL_SERVER, 'PUT', valueContext.dataMain);
        setText('');
    }

    function handlerClosePopup() {
        valueContext.setIsModal(false);
        setTimeout(() => valueContext.setIsAddCategoryMain(false), 1000);
    }

    return (
        <div className="add-category modal-window">
            <div className={`add-category__wrapper modal-window__wrapper ${valueContext.isModal ? 'open' : ''} `}>
                <button className='add-category__btn-close' onClick={handlerClosePopup}>{svgIconClose}</button>
                <input value={text} onChange={(e) => setText(e.target.value)} type="text" />
                <button className='add-category__btn-apply' onClick={handlerAddPopup}>Add</button>
            </div>
        </div>

    )
}

export default AddCategory;
