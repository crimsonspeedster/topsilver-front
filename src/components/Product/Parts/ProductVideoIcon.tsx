const ProductVideoIcon = (
    {
        type
    }
    :
    {
        type: string,
    }
) => {
    switch (type) {
        case 'external':
            return (
                <i
                    className="lab la-youtube"
                />
            );
        default:
            return (
                <i
                    className="las la-play"
                />
            );
    }
};

export default ProductVideoIcon;