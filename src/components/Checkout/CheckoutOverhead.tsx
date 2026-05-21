type Props = {
    num?: number;
    title: string;
};

const CheckoutOverhead = (
    {
        num,
        title,
    }: Props
) => {
    return (
        <p className="checkout__overhead">
            {
                num &&
                <span className="checkout__overhead-number">{num}</span>
            }

            <span className="checkout__overhead-title">{title}</span>
        </p>
    );
}

export default CheckoutOverhead;