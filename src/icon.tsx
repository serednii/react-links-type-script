import { IconContext } from "react-icons";
import { AiFillPlusCircle, AiOutlineClose, AiFillEdit } from "react-icons/ai";
import { FaPencil } from "react-icons/fa6";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import { TbArrowBigLeftFilled } from "react-icons/tb";
import { RiAdminFill } from "react-icons/ri";

const iconSize = "24"; // Розмір іконки (за потреби)
const iconColor = "black"; // Колір іконки (за потреби)
export const svgIconPlus = (
  <IconContext.Provider value={{ size: iconSize, color: iconColor }}>
    <AiFillPlusCircle />
  </IconContext.Provider>
);
export const svgIconClose = (
  <IconContext.Provider value={{ size: iconSize, color: iconColor }}>
    <AiOutlineClose />
  </IconContext.Provider>
);
export const svgIconChange = (
  <IconContext.Provider value={{ size: iconSize, color: iconColor }}>
    <AiFillEdit />
  </IconContext.Provider>
);
export const svgIconArrowRight = (
  <IconContext.Provider value={{ size: iconSize, color: iconColor }}>
    <HiOutlineArrowSmRight />
  </IconContext.Provider>
);

export const svgIconPencil = (
  <IconContext.Provider value={{ size: "16", color: iconColor }}>
    <FaPencil />
  </IconContext.Provider>
);

export const svgIconBackHome = (
  <IconContext.Provider value={{ size: "24", color: iconColor }}>
    <TbArrowBigLeftFilled />
  </IconContext.Provider>
);

export const svgAdmin = (
  <IconContext.Provider value={{ size: "24", color: iconColor }}>
    <RiAdminFill />
  </IconContext.Provider>
);
