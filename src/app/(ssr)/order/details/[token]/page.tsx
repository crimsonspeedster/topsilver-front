import {Metadata} from "next";
import {getOrder} from "@lib/getOrder.server";
import {redirect} from "next/navigation";
import OrderSingleTemplate from "@templates/OrderSingleTemplate";


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

    return (
        <OrderSingleTemplate
            order={order}
        />
    );
};

export default SuccessOrderPage;

export const metadata: Metadata = {
    title: 'Деталі замовлення',
    description: 'Перегляньте інформацію про ваше замовлення.',
    robots: {
        index: false,
        follow: false,
    },
};