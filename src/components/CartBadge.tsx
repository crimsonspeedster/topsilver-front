type Props = {
    handleClick: () => void,
};

const CartBadge = (
    {
        handleClick,
    }: Props
) => {


    return (
        <button
            onClick={handleClick}
            className="btn p-0"
        >
            <i className="iccl iccl-cart" />

            <span className="tcount bg-dark text-white rounded-circle d-flex align-items-center justify-content-center">5</span>
        </button>
    );
}

export default CartBadge;