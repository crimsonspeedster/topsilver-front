import VerifyEmailClient from "@src/commonsections/VerifyEmailClient";
import {Metadata} from "next";
import {redirect} from "next/navigation";
import {verifyEmail} from "@lib/verifyEmail.server";


type Props = {
    searchParams: {
        id?: string,
        hash?: string,
        email?: string,
    };
};

const VerifyEmail = async (
    {
        searchParams,
    }: Props
) => {
    const {id, hash, email } = searchParams;

    if (!id || !hash || !email) {
        redirect('/');
    }

    const verifiedEmailResult = await verifyEmail(id, hash);

    return (
        <VerifyEmailClient
            email={email}
            isSuccess={verifiedEmailResult.success}
            message={verifiedEmailResult.message}
        />
    );
};

export default VerifyEmail;

export const metadata: Metadata = {
    title: 'Підтвердження електронної пошти',
    description: 'Будь ласка, зачекайте, поки ми перевіримо вашу адресу електронної пошти.',
    robots: {
        index: false,
        follow: false,
    },
};