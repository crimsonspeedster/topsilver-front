import React from "react";

const ButtonUp = () => {
    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            className="position-fixed bg-white border rounded d-flex align-items-center justify-content-center shadow"
            onClick={handleClick}
        >
            <i
                className="pr pegk pe-7s-angle-up"
            />
        </button>
    );
}

export default ButtonUp;