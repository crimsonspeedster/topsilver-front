"use client";

import {useTranslations} from "next-intl";
import {OrderObject} from "@interfaces/entities/orders";
import OrderCollection from "@src/components/Dashboard/OrderCollection";
import {PaginationObject} from "@interfaces/common";
import PaginationComponent from "@src/components/PaginationComponent";


type Props = {
    orders: OrderObject[],
    initialPage: number,
    slug: string,
    pagination: PaginationObject,
};

const OrdersTemplate = (
    {
        orders,
        initialPage,
        slug,
        pagination,
    }: Props
) => {
    const tDashboard = useTranslations('Dashboard');
    const tCommon = useTranslations('Common');

    return (
        <section className="py-5">
            <div className="container">
                <h1 className="text-center">{tDashboard('orders')}</h1>

                {
                    orders.length > 0 ?
                        <div>
                            {
                                orders.map((order) =>
                                    <OrderCollection
                                        key={order.id}
                                        order={order}
                                    />
                                )
                            }
                        </div>
                        :
                        <p className="text-center">{tCommon('no_orders_found')}</p>
                }

                <PaginationComponent
                    pagination={pagination}
                    slug={slug}
                    current_page={initialPage}
                />
            </div>
        </section>
    );
}

export default OrdersTemplate;