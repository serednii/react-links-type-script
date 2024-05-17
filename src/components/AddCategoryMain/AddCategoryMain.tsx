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
            <div className={`add-category__wrapper p-3 modal-window__wrapper ${valueContext.isModal ? 'open' : ''} `}>
                <form>
                    <button className='add-category__btn-close' onClick={handlerClosePopup}>{svgIconClose}</button>
                    <input className="form-control" value={text} onChange={(e) => setText(e.target.value)} type="text" />
                    <button className='add-category__btn-apply' onClick={handlerAddPopup}>Add</button>
                </form>
                {/* <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form> */}

            </div>
        </div>
    )
}

export default AddCategory;
