import {Metadata} from "next";


type Props = {
    params: Promise<{
        id: string,
    }>
};

export default async function Order () {
    return (
        <h1>Order</h1>
    );
}

export async function generateMetadata(
    {
        params,
    }: Props
): Promise<Metadata> {
    const { id } = await params;

    return {
        title: `Замовлення #${id}`,
        description: `Інформація про замовлення #${id}`,
        robots: {
            index: false,
            follow: false,
        },
    };
}