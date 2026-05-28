import {redirect} from "next/navigation";
import {getTranslations} from "next-intl/server";
import {Metadata} from "next";
import {unSubscribe} from "@lib/unSubscribe.server";
import Link from "next/link";


type Props = {
    searchParams: {
        token?: string;
    }
}

const UnSubscribePage = async (
    {
        searchParams,
    }: Props
) => {
    const {token} = await searchParams;
    const tCommon = await getTranslations('Common');

    if (!token) {
        redirect('/');
    }

    await unSubscribe(token);

    return (
        <section className="py-5">
            <div className="container">
                <h1 className="text-center">{tCommon('unsubscribe_success')}</h1>

                <div className="d-flex mt-4 justify-content-center">
                    <Link
                        className="btn btn-teal rounded-pill text-white px-4 fw-semibold btn btn-primary"
                        href="/"
                    >
                        {tCommon('return_to_home')}
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default UnSubscribePage;

export const metadata: Metadata = {
    title: 'Відписка від розсилки',
    description: 'Ви успішно відписались від email-розсилки.',
    robots: {
        index: false,
        follow: false,
    },
};