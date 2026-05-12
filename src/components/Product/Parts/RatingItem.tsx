type Props = {
    rating: number,
    reviews_count: number,
};

const RatingItem = (
    {
        rating,
        reviews_count,
    }: Props
) => {
    return (
        <div className="d-flex align-items-center mb-2">
            <div className="me-2" style={{
                width: '30px',
            }}>{rating}★</div>

            <div className="flex-grow-1">
                <div className="progress">
                    <div
                        className="progress-bar bg-success"
                        style={{
                            width: `${reviews_count}%`,
                        }}
                    ></div>
                </div>
            </div>

            <div className="ms-2 text-muted">{reviews_count}</div>
        </div>
    );
}

export default RatingItem;