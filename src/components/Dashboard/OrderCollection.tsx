import dayjs from "dayjs";
import {OrderObject} from "@interfaces/entities/orders";


type Props = {
    order: OrderObject;
}

const OrderCollection = (
    {
        order,
    }: Props
) => {
    const fullName: string = `${order.last_name} ${order.first_name}${

        order.middle_name ? ` ${order.middle_name}` : ""

    }`;

    const statusMap: Record<string, string> = {
        pending_payment: "bg-warning text-dark",
        created: "bg-secondary",
        processing: "bg-primary",
        shipped: "bg-info text-dark",
        delivered: "bg-success",
        completed: "bg-success",
        cancelled: "bg-danger",
    };

    const paymentMap: Record<string, string> = {
        cod: "bg-dark",
        liqpay: "bg-primary",
        plata_by_mono: "bg-success",
    };

    const shippingMap: Record<string, string> = {
        ukr_poshta: "bg-secondary",
        nova_poshta_courier: "bg-primary",
        nova_poshta_warehouse: "bg-info text-dark",
        local_pickup: "bg-dark",
    };

    const formatDate = (date?: string | null): string|null =>
        date ? dayjs(date).format("DD.MM.YYYY HH:mm") : null;

    const statusBadgeClass = () => {

        switch (order.status) {
            case "paid":
                return "bg-success";
            case "pending":
                return "bg-warning text-dark";
            case "cancelled":
                return "bg-danger";
            default:
                return "bg-secondary";
        }
    };

    return (
        <div className="card shadow-sm mb-3">

            <div className="card-header d-flex justify-content-between align-items-center">

                <div>

                    <strong>Order #{order.id}</strong>

                    <div className="text-muted small">

                        {dayjs(order.created_at).format("DD.MM.YYYY HH:mm")}

                    </div>

                </div>

                <span className={`badge ${statusMap[order.status] || "bg-secondary"}`}>

                    {order.status}

                </span>

            </div>

            <div className="card-body">

                <div className="row g-3">

                    {/* Customer */}

                    <div className="col-md-6">

                        <h6 className="text-muted">Customer</h6>

                        <div>{fullName}</div>

                        <div className="small text-muted">{order.email}</div>

                        <div className="small text-muted">{order.phone}</div>

                    </div>

                    {/* Payment */}

                    <div className="col-md-6">

                        <h6 className="text-muted">Payment</h6>

                        <span

                            className={`badge ${

                                paymentMap[order.payment_type] || "bg-secondary"

                            }`}

                        >

                            {order.payment_type}

                        </span>

                        {order.payment_type !== "cod" && (

                            <div className="mt-2 small">

                                Paid:{" "}

                                {order.paid_at

                                    ? formatDate(order.paid_at)

                                    : "Not paid"}

                            </div>

                        )}

                        {order.coupon_code && (

                            <div className="small text-muted mt-1">

                                Coupon: {order.coupon_code} (-{order.discount_amount})

                            </div>

                        )}

                    </div>

                    {/* Shipping */}

                    <div className="col-md-6">

                        <h6 className="text-muted">Shipping</h6>

                        <span

                            className={`badge ${

                                shippingMap[order.shipping_type] || "bg-secondary"

                            }`}

                        >

                            {order.shipping_type}

                        </span>

                    </div>

                    {/* Totals */}

                    <div className="col-md-6">

                        <h6 className="text-muted">Totals</h6>

                        <div>Subtotal: {order.subtotal_formatted}</div>

                        <div className="fw-bold">

                            Total: {order.total_formatted}

                        </div>

                    </div>

                    {/* Notes */}

                    {order.notes && (

                        <div className="col-12">

                            <h6 className="text-muted">Notes</h6>

                            <div className="border rounded p-2 bg-light">

                                {order.notes}

                            </div>

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
};

export default OrderCollection;