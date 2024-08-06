import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import "./myJoditEditor.scss";

const MyJoditEditor = ({ placeholder, article, setArticle }) => {
  const editor = useRef(null);
  const config = useMemo(
    () => ({
      readonly: false, // Всі опції з https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || "Start typing...",
      toolbar: true, // Показати панель інструментів
      buttons: [
        "bold",
        "italic",
        "underline",
        "|",
        "ul",
        "ol",
        "|",
        "outdent",
        "indent",
        "|",
        "font",
        "fontsize",
        "brush",
        "paragraph",
        "|",
        "image",
        "video",
        "table",
        "link",
        "|",
        "align",
        "undo",
        "redo",
        "|",
        "hr",
        "eraser",
        "fullsize",
        "|",
        "source",
        "code", // Додаємо кнопку для вставки коду
      ],
      extraButtons: [
        {
          name: "code",
          iconURL: "https://cdn.jsdelivr.net/npm/jodit/build/images/icons.png",
          exec: (editor) => {
            editor.s.insertHTML("<pre><code>Your code here...</code></pre>");
          },
          tooltip: "Insert Code",
        },
      ],
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
