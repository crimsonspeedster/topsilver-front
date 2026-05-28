"use client";

import {useEffect, useState} from 'react';
import {useTranslations} from "next-intl";
import Cookies from 'js-cookie';


type Props = {
    description: string;
}

const TopBanner = (
    {
        description,
    }: Props
) => {
    const tCommon = useTranslations('Common');
    const [isShowing, setIsShowing] = useState<boolean>(false);

    useEffect(() => {
        if (!Cookies.get('banner_closed')) {
            setIsShowing(true);
        }
    }, []);

    const handleClose = () => {
        setIsShowing(false);

        Cookies.set('banner_closed', '1', {
            expires: 1,
        });
    }

    if (!isShowing) {
        return null;
    }

    return (
        <div className="t_header fs-13 d-flex align-items-center">
            <div className="container-fluid">
                <div className="d-flex gap-2">
                    <div
                        className="col text-center text-white"
                        dangerouslySetInnerHTML={{
                            __html: description
                        }}
                    />

                    <div className="col-auto mt-2 mt-md-0">
                        <button
                            className="h_banner_close py-0 btn text-white"
                            onClick={handleClose}
                        >
                            {tCommon('close')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBanner;
