type Props = {
    title: string,
    qty: number,
    price: string,
};

const CheckoutItem = (
    {
        title,
        qty,
        price,
    }: Props
) => {
    return (
        <div className="d-flex justify-content-between fw-medium border-bottom mb-0 p-2">
            <h6 className="mb-0 lh-lg">
                <span className="fw-normal">{title}</span> x {qty}
            </h6>

            <p className="mb-0 lh-lg">{price}</p>
        </div>
    );
}

export default CheckoutItem;