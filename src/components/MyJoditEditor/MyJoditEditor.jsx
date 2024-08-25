import React, { useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import "./myJoditEditor.scss";

const MyJoditEditor = ({ placeholder, article, setArticle }) => {
  console.log("MyJoditEditor");
  const editor = useRef(null);
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typing...",
      toolbar: true,
      height: "70vh",
      buttons: [
        "bold",
        "italic",
        "underline",
        "|",
        "align", // Додано кнопку для вирівнювання
        "|",
        "undo",
        "redo",
      ],
      style: {
        textAlign: "left", // Додаємо стиль вирівнювання тексту зліва
      },
    }),
    [placeholder]
  );

  return (
    <JoditEditor
      ref={editor}
      value={article}
      config={config}
      tabIndex={1}
      onBlur={(newContent) => setArticle(newContent)}
      onChange={(newContent) => setArticle(newContent)}
    />
  );
};

export default MyJoditEditor;
