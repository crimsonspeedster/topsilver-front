import {Metadata} from "next";
import {getOrder} from "@lib/getOrder.server";
import {redirect} from "next/navigation";
import Link from "next/link";
import {getTranslations} from "next-intl/server";


type Props = {
    params: Promise<{
        token: string;
    }>,
}

const SuccessOrderPage = async (
    {
        params,
    }: Props,
) => {
    const { token } = await params;

    if (!token) {
        redirect('/');
    }

    const order = await getOrder(token);

    if (!order) {
        redirect('/');
    }

    const tThanks = await getTranslations('Thanks');
    const tCommon = await getTranslations('Common');

    return (
        <section className="py-5">
            <div className="container">
                <div className="text-center">
                    <h1 className="mb-2">🎉 {tThanks('order_successful')}!</h1>

                    <p className="text-muted mb-0">{tThanks('thanks_for_purchase')}</p>
                </div>

                <div className="mt-4 d-flex flex-wrap justify-content-center align-items-center gap-2">
                    <Link
                        href="/"
                        className="btn btn-teal"
                    >
                        {tCommon('return_to_home')}
                    </Link>

                    <Link
                        href={`/order/details/${token}`}
                        className="btn btn-primary"
                    >
                        {tThanks('go_to_details_page')}
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default SuccessOrderPage;

export const metadata: Metadata = {
    title: 'Замовлення отримано',
    description: 'Дякуємо за ваше замовлення.',
    robots: {
        index: false,
        follow: false,
    },
};