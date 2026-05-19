"use client";

import {useTranslations} from "next-intl";
import CertificateForm from "@src/components/Certificates/CertificateForm";
import Certificates from "@src/components/Certificates/Certificates";


const CertificateSection = () => {
    const tCart = useTranslations('Cart');

    return (
        <div>
            <h6>{tCart('certificates')}</h6>

            <CertificateForm />

            <Certificates />
        </div>
    );
}

export default CertificateSection;