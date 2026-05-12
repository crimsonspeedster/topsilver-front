"use client";

import {ReviewObject} from "@interfaces/entities/reviews";
import dayjs from "dayjs";
import 'dayjs/locale/uk';
import {useTranslations} from "next-intl";
import {useState} from "react";
import axios from "axios";


type Props = {
    review: ReviewObject;
};

dayjs.locale("uk");

const Review = (
    {
        review,
    }: Props
) => {
    const tReviews = useTranslations('Reviews');
    const tCommon = useTranslations('Common');

    const [showedReplies, setShowedReplies] = useState<boolean>(false);
    const [replies, setReplies] = useState<ReviewObject[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    // TODO: Add authentication
    const authorized = true;

    const fetchReplies = async (page = 1) => {
        if (loading)
            return;

        try {
            setLoading(true);
            setShowedReplies(true);

            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_ENV_API_V1_LINK}/reviews/${review.id}`,
                {
                    params: {
                        page,
                    },
                }
            );

            setReplies(prev => [...prev, ...data.data.reviews]);
            setHasMore(data.data.pagination.has_more_pages);
            setPage(page+1);
        }
        catch (error) {
            setShowedReplies(false);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-3">
            <div className="d-flex align-items-center mb-2">
                <span className="text-muted ms-2">
                    · {dayjs(review.created_at).format('DD MMM. hh:mm')}
                </span>
            </div>

            <p className="mb-2">{review.comment}</p>

            {
                (review.has_replies || authorized) &&
                <div className="d-flex align-items-center justify-content-between">
                    {
                        review.has_replies && !showedReplies &&
                        <button
                            className="btn text-secondary py-0"
                            onClick={
                                ()=>fetchReplies(page)
                            }
                        >{tReviews('show_replies')}</button>
                    }

                    {
                        authorized &&
                        <div className="d-flex align-items-center text-secondary cursor-pointer">
                            <svg className="me-1" stroke="currentColor" fill="none" strokeWidth="2"
                                 viewBox="0 0 24 24"
                                 strokeLinecap="round" strokeLinejoin="round" height="16" width="16"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>

                            <span>{tReviews('answer')}</span>
                        </div>
                    }
                </div>
            }

            {
                replies.length > 0 &&
                <div className="replies">
                    <div className="replies__row">
                        {
                            replies.map((review, index) => (
                                <Review
                                    key={index}
                                    review={review}
                                />
                            ))
                        }
                    </div>

                    {
                        hasMore &&
                        <button
                            onClick={
                                ()=>fetchReplies(page)
                            }
                            className="text-secondary btn mt-2 d-flex mx-auto"
                        >
                            {tCommon('load_more')}
                        </button>
                    }
                </div>
            }
        </div>
    );
}

export default Review;