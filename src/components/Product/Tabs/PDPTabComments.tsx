import {ReviewObject} from "@interfaces/entities/reviews";
import {useTranslations} from "next-intl";
import Review from "@src/components/Product/Parts/Review";
import RatingItem from "@src/components/Product/Parts/RatingItem";

type Props = {
    reviews: ReviewObject[],
    rating_count: number,
    rating_avg: string,
};

const PDPTabComments = (
    {
        reviews,
        rating_avg,
        rating_count,
    }: Props
) => {
    // TODO: ADD Rating from Backend

    const tCommon = useTranslations('Common');
    const tReviews = useTranslations('Reviews');

    const maxRating = 5;

    return (
        <section className="mt5 review-section">
            <div className="mb-4 d-flex align-items-center justify-content-between pb-2">
                <h2 className="h4 font-weight-bold text-secondary position-relative pb-2 mb-0">
                    {tCommon('tab_reviews')} ({rating_count})
                </h2>

                <div>
                    <button
                        className="btn btn-primary text-decoration-none"
                    >
                        <svg className="me-1" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24"
                             strokeLinecap="round" strokeLinejoin="round" height="16" width="16"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>

                        {tReviews('write_a_review')}
                    </button>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-lg-8 mb-4 order-lg-1">
                    {
                        reviews.length > 0 ?
                            reviews.map((item, index) =>
                                <Review
                                    review={item}
                                    key={index}
                                />
                            )
                            :
                            <p className="text-center">{tReviews('no_reviews')}</p>
                    }
                </div>

                <div className="col-lg-4 mb-4 order-lg-2">
                    <div className="d-flex flex-column flex-sm-column flex-md-row flex-lg-row px-sm-5 px-md-0 px-lg-0">
                        <div className="row align-items-start g-4 flex-grow-1">
                            <div className="col-12 col-sm-4 text-center">
                                <div className="rating-value">
                                    {rating_avg} <span className="rating-star">★</span>
                                </div>
                            </div>

                            <div className="col-12 col-sm-8">
                                {
                                    Array.from({length: rating_avg.length}, (_, i) => (
                                        <RatingItem
                                            key={i}
                                            rating={0}
                                            reviews_count={0}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PDPTabComments;