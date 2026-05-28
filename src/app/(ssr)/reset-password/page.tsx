import ResetPasswordForm from "@src/components/ResetPasswordForm";
import {redirect} from "next/navigation";
import {Metadata} from "next";
import {getUserSSR} from "@lib/auth/getUser.server";


type Props = {
    searchParams: {
        token?: string;
        email?: string;
    };
};

const ResetPassword = async (
    {
        searchParams,
    }: Props
) => {
    const {token, email} = await searchParams;

    if (!token && !email) {
        redirect('/forgot-password');
    }

    const user = await getUserSSR();

    if (user) {
        redirect('/');
    }

    return (
        <ResetPasswordForm
            email={email?.toString() ?? ''}
            token={token?.toString() ?? ''}
        />
    );
}

export default ResetPassword;

export const metadata: Metadata = {
    title: 'Зміна пароля',
    description: 'Створення нового пароля для акаунта',
    robots: {
        index: false,
        follow: false,
    },
};