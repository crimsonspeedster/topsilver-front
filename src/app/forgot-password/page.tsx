import ForgotPasswordForm from "@src/components/ForgotPasswordForm";
import {getUserSSR} from "@lib/auth/getUser.server";
import {redirect} from "next/navigation";
import {Metadata} from "next";


const ForgotPassword = async () => {
    const user = await getUserSSR();

    if (user) {
        redirect('/');
    }

    return (
        <ForgotPasswordForm />
    );
}

export default ForgotPassword;

export const metadata: Metadata = {
    title: 'Відновлення пароля',
    description: 'Відновлення доступу до акаунта',
    robots: {
        index: false,
        follow: false,
    },
};