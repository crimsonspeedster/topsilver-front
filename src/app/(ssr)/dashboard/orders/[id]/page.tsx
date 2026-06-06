import {Metadata} from "next";
import {getUserOrderByIDSSR} from "@lib/auth/getUser.server";
import {notFound} from "next/navigation";
import OrderSingleTemplate from "@templates/OrderSingleTemplate";


type Props = {
    params: Promise<{
        id: number;
    }>
};

export default async function Order (
    {
        params,
    }: Props
) {
    const { id } = await params;
    const order = await getUserOrderByIDSSR(id);

    if (!order) {
        notFound();
    }

    return (
        <OrderSingleTemplate
            order={order}
        />
    );
}

export async function generateMetadata(
    {
        params,
    }: Props
): Promise<Metadata> {
    const { id } = await params;

    return {
        title: `Замовлення #${id.toString()}`,
        description: `Інформація про замовлення #${id.toString()}`,
        robots: {
            index: false,
            follow: false,
        },
    };
}