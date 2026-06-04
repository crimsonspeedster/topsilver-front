"use client";

import EmptyPopupWithHTML from "@src/components/Popups/EmptyPopupWithHTML";
import {useState} from "react";


type Props = {
    title: string,
    content: string,
};

const ButtonWithPopup = (
    {
        title,
        content,
    }: Props
) => {
    const [show, setShow] = useState<boolean>(false);

    const handleClosePopup = () => {
        setShow(false);
    }

    return (
          <>
              <button
                  className="text-black fw-semibold btn-link btn p-0"
                  onClick={() => setShow(true)}
              >{title}</button>

              <EmptyPopupWithHTML
                  content={content}
                  show={show}
                  handleClose={handleClosePopup}
              />
          </>
    );
}

export default ButtonWithPopup;