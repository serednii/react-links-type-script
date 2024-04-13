import { IconContext } from 'react-icons';
import { AiFillPlusCircle, AiOutlineClose, AiFillEdit } from "react-icons/ai";


const iconSize = '24'; // Розмір іконки (за потреби)
const iconColor = 'black'; // Колір іконки (за потреби)
export const svgIconPlus = <IconContext.Provider value={{ size: iconSize, color: iconColor }}><AiFillPlusCircle /></IconContext.Provider>;
export const svgIconClose = <IconContext.Provider value={{ size: iconSize, color: iconColor }}><AiOutlineClose /></IconContext.Provider>;
export const svgIconChange = <IconContext.Provider value={{ size: iconSize, color: iconColor }}><AiFillEdit /></IconContext.Provider>;

