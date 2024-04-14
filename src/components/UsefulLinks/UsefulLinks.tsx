
import ListLinks from "./ListLinks/ListLinks";
import MenuLinks from "./MenuLinks/MenuLinks";
import './UsefulLinks.scss'
import Context from "../../Context";
import { useContext } from "react";

function UsefulLinks() {
    const value = useContext(Context)
    return (
        <div className="useFull_links">
            <MenuLinks key={Math.random()} dataMenu={value.dataMain} firstMenu={true} />
            <ListLinks />
        </div>
    )
}

export default UsefulLinks;