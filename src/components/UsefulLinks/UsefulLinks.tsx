
import ListLinks from "./ListLinks/ListLinks";
import MenuLinks from "./MenuLinks/MenuLinks";
import './UsefulLinks.scss'
import Context from "../../Context";
import { useContext } from "react";

function UsefulLinks() {
    const value = useContext(Context)
    return (//bg-success bg-gradient
        <section className="useFull_links flex-grow-1 d-flex flex-column  p-3 rounded-4">
            <div className="row px-3">
                <MenuLinks key={Math.random()} dataMenu={value.dataMain} firstMenu={true} />
                <ListLinks />
            </div>
        </section>
    )
}

export default UsefulLinks;