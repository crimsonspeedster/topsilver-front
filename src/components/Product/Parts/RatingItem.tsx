type Props = {
    rating: number,
    reviews_count: number,
    total_reviews: number,
};

const RatingItem = ({
                        rating,
                        reviews_count,
                        total_reviews,
                    }: Props) => {
    const percent =
        total_reviews > 0
            ? (reviews_count / total_reviews) * 100
            : 0;

    return (
        <div className="d-flex align-items-center mb-2">
            <div className="me-2" style={{ width: '30px' }}>
                {rating}★
            </div>

            <div className="flex-grow-1">
                <div className="progress">
                    <div
                        className="progress-bar bg-success"
                        style={{
                            width: `${percent}%`,
                        }}
                    />
                </div>
            </div>

            <div className="ms-2 text-muted">
                {reviews_count}
            </div>
        </div>
    );
};

export default RatingItem;