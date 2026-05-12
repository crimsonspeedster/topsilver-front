"use client";

import {Modal} from "react-bootstrap";


type Props = {
    content: string,
    show: boolean,
    handleClose: () => void,
};

const EmptyPopupWithHTML = (
    {
        content,
        show,
        handleClose,
    }: Props
) => {
    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            className="modal-overl"
            size="lg"
        >
            <Modal.Body>
                <div className="text-end position-fixed top-0 end-0">
                    <button
                        type="button"
                        className="btn-close btn-close1 p-4"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={handleClose}
                    ></button>
                </div>

                <div
                    className='p-2'
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </Modal.Body>
        </Modal>
    )
};

export default EmptyPopupWithHTML;