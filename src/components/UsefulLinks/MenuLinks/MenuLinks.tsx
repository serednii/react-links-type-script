import './MenuLinks.scss';
import Context from '../../../Context';
import { useContext } from "react";
import { isObject, isArray } from '../../../functions/functions';
import { svgIconPlus } from '../../../icon';

interface IMenuLInksProps {
    dataMenu: Record<string, any>;
    firstMenu: boolean;
}

interface IMenuLInks {
    dataMenu: Record<string, any>;
    key: string;
}

const MenuLinks: React.FC<IMenuLInksProps> = ({ dataMenu, firstMenu }) => {

    const valueContext = useContext(Context);

    const printLinks = (obj: IMenuLInks): void => {
        console.log(obj)
        valueContext.setListLinkData(obj)
    }



    function plusOther(data: IMenuLInks): void {
        console.log(data);
        valueContext.setIsModal(true);
        valueContext.setIsAddCategoryOther(true);
        valueContext.setIsAddCategoryMain(false);
        valueContext.setSluice(data);//передаємо ссилку на бєкт який будемо міняти
    }

    return (
        <div className={!firstMenu ? "submenu-links__links" : "submenu-links__parent"}>
            <ul className="submenu-list" key={Math.random()}>
                {Object.keys(dataMenu).map((key: string) => {
                    return (<li key={Math.random()} className="submenu-links">
                        {valueContext.isButtonPlus && (<span className="link-plus" onClick={() => plusOther({ dataMenu, key })} >{svgIconPlus}</span>)}
                        <button
                            className='submenu-links__menu'
                            onClick={() => { isArray(dataMenu[key]) && printLinks({ dataMenu, key }) }} >
                            {key}
                        </button>
                        {isObject(dataMenu[key]) &&
                            <MenuLinks key={Math.random()} dataMenu={dataMenu[key]} firstMenu={false} />
                        }
                    </li>)
                })}
            </ul>
        </div>
    )
}

export default MenuLinks
