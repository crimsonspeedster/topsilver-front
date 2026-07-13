"use client";

import {useTranslations} from "next-intl";
import {PaginationObject} from "@interfaces/common";
import {QuickOrderObject} from "@interfaces/entities/orders";
import PaginationComponent from "@src/components/PaginationComponent";
import QuickOrderCollection from "@src/components/Dashboard/QuickOrderCollection";


type Props = {
    orders: QuickOrderObject[],
    initialPage: number,
    slug: string,
    pagination: PaginationObject,
};

const QuickOrdersTemplate = (
    {
        orders,
        initialPage,
        slug,
        pagination,
    }: Props,
) => {
    const tDashboard = useTranslations('Dashboard');
    const tCommon = useTranslations('Common');

    return (
        <section className="py-5">
            <div className="container">
                <h1 className="text-center mb-4">{tDashboard('quick_orders')}</h1>

                {
                    orders.length > 0 ?
                        <div>
                            {
                                orders.map((order) =>
                                    <QuickOrderCollection
                                        key={order.id}
                                        order={order}
                                    />
                                )
                            }
                        </div>
                        :
                        <p className="text-center">{tCommon('no_quick_orders_found')}</p>
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

export default QuickOrdersTemplate;