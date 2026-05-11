import React from "react";
import {useTranslations} from "next-intl";


type Props = {
    rating: string,
    rating_count: number,
};

const Rating = (
    {
        rating,
        rating_count,
    }: Props
) => {
    const t = useTranslations('Product');

    const rating_num = Number(rating);
    const maxRating = 5;

    return (
        <div className="kalles-rating-result">
            <span className="kalles-rating-result__pipe">
                {Array.from({ length: maxRating }).map((_, index) => {
                    const filled = index < Math.round(rating_num);

                    return (
                        <span
                            key={index}
                            className={`kalles-rating-result__start ${!filled ? "de-active" : ""}`}
                        />
                    );
                })}
            </span>

            <span className="kalles-rating-result__number"> ({rating_count} {t('reviews')})</span>&nbsp;
        </div>
    );
}

export default Rating;