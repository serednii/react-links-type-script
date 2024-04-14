import './ListLinks.scss';
import { useContext } from "react";
import Context from '../../../Context';
import { svgIconChange } from '../../../icon';
import { Button } from 'react-bootstrap';


function ListLinks() {
    const valueContext = useContext(Context);
    const { dataMenu, key } = valueContext.listLinkData;
    // valueContext.sluiceLinks.current = dataMenu[key];
    console.log(dataMenu)
    console.log(key)
    let dataArrayElements

    function plusOther() {
    }

    function handlerChangeLink() {
        valueContext.setIsModal(true);
        valueContext.setIsChangeLinks(!valueContext.isChangeLinks);
        valueContext.setIsAddCategoryMain(false);
        valueContext.setIsAddCategoryOther(false);
        valueContext.setIsButtonPlus(false);
    }


    if (dataMenu && key && dataMenu[key]) {
        console.log(dataMenu[key])

        dataArrayElements = dataMenu[key].map((obj) => {
            return (
                <li key={Math.random()}>
                    {valueContext.isChangeLink && (<span className="link-plus" onClick={() => plusOther()} >{svgIconChange}</span>)}
                    <a target="blank" href={obj.link}>{obj.name}</a>
                </li>
            )
        }
        )

        if (dataArrayElements.length === 0) {
            dataArrayElements = <p>Немає даних</p>
        }
    }

    return (
        <div className="list_links">
            <ul>
                {dataArrayElements && dataArrayElements.length > 0 && <Button variant="primary" onClick={handlerChangeLink}>Change links</Button>}
                {dataArrayElements}
            </ul>
        </div>
    )
}
export default ListLinks;