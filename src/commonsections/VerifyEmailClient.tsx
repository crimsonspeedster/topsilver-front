'use client';

import { Container, Alert, Button } from 'react-bootstrap';
import {useTranslations} from "next-intl";
import axiosClient from "@lib/axiosClient";
import {toast} from "react-toastify";
import {useAuthStore} from "@src/store/client-store";
import Link from "next/link";


type Props = {
    email: string,
    isSuccess: boolean,
    message: string,
};

const VerifyEmailClient = (
    {
        email,
        isSuccess,
        message,
    }: Props
) => {
    const tCommon = useTranslations('Common');
    const user = useAuthStore((state) => state.user);

    const resendEmailHandler = async () => {
        const formData = new FormData();
        formData.append('email', email);

        try {
            const res = await axiosClient.post('/email/resend', formData);

            toast.success(res.data.message);
        }
        catch (error: any) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <section className="py-5">
            <Container>
                <div className="d-flex flex-column align-items-center justify-content-center">
                    {
                        isSuccess ? (
                            <>
                                <div className="mb-3 text-success fs-1">✓</div>

                                <h4 className="mb-2">{message}</h4>

                                <p className="text-muted">{tCommon('you_can_close_page')}</p>

                                <Link
                                    href='/'
                                    className="btn btn-primary"
                                >
                                    {tCommon('return_to_home')}
                                </Link>
                            </>
                        )
                            :
                        (
                            <>
                                <div className="mb-3 text-danger fs-1">✕</div>

                                <Alert variant="danger">{tCommon('email_verification_failed_or_expired')}</Alert>

                                <Button
                                    onClick={resendEmailHandler}
                                    variant="outline-primary"
                                >
                                    {tCommon('resend_email')}
                                </Button>
                            </>
                        )
                    }
                </div>
            </Container>
        </section>
    );
}

export default VerifyEmailClient;