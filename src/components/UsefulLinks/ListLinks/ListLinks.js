import './ListLinks.scss';
import { useContext, useState, useEffect } from "react";
import { MyContext } from '../../../MyContext';
import { svgIconChange } from '../../../icon';
import { Button } from 'react-bootstrap';
import { getDataGraphQLLink } from "../../../functions/requestHelpersGraphQL";

function ListLinks() {
    const {
        listLinkData,
        setIsAddCategoryOther,
        setIsButtonPlus,
        isChangeLink,
        isChangeLinks,
        setIsChangeLinks,
        setIsModal,
    } = useContext(MyContext);
    const { dataMenu, key } = listLinkData;
    // sluiceLinks.current = dataMenu[key];
    console.log(dataMenu)
    console.log(key)


    function plusOther() {
    }

    function handlerChangeLink() {
        setIsModal(true);
        setIsChangeLinks(!isChangeLinks);
        setIsAddCategoryOther(false);
        setIsButtonPlus(false);
    }

    const [dataArrayElements, setDataArrayElements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLinks = async () => {
            if (dataMenu && key && dataMenu[key]) {
                const elements = await Promise.all(
                    dataMenu[key].map(async (obj) => {
                        const { link } = await getDataGraphQLLink(obj.link);
                        console.log('ListLinks.js', link);
                        return (
                            <li key={obj.link} className="list-group-item bg-secondary-subtle rounded-3 mb-2">
                                {isChangeLink && (
                                    <span className="link-plus" onClick={() => plusOther()}>
                                        {svgIconChange}
                                    </span>
                                )}
                                <a
                                    className="active link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                                    target="_blank"
                                    href={link}
                                    rel="noopener noreferrer"
                                >
                                    {obj.name}
                                </a>
                            </li>
                        );
                    })
                );
                setDataArrayElements(elements);
            } else {
                setDataArrayElements(<p>Немає даних</p>);
            }
            setLoading(false);
        };

        fetchLinks();
    }, [dataMenu, key]);


    return (
        <div className="list_links col-12 col-md-8 bg-info">
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">

                {dataArrayElements && dataArrayElements.length > 0 && <Button className='btn btn-primary me-md-2 mb-3 btn-lg' onClick={handlerChangeLink}>Change links</Button>}
            </div>

            <ul className='list-group list-group-flush'>
                {dataArrayElements}
            </ul>
        </div>
    )
}
export default ListLinks;