'use client';

import {useEffect, useState} from "react";


const ButtonUp = () => {
    const [visible, setVisible] = useState<boolean>(false);

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleScroll = () => {
        const scrollY = window.scrollY;

        if (scrollY > 300) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <button
            className={`position-fixed bg-white border rounded d-flex align-items-center justify-content-center shadow button--backtop ${
                visible ? "" : "hidden"
            }`}
            onClick={handleClick}
        >
            <i
                className="pr pegk pe-7s-angle-up"
            />
        </button>
    );
}

export default ButtonUp;