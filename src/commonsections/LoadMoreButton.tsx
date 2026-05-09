import React from "react";
import {useTranslations} from "next-intl";


type Props = {
    hasMore: boolean,
    isLoading: boolean,
    onLoadMore: () => void,
};

const LoadMoreButton = (
    {
        hasMore,
        onLoadMore,
        isLoading,
    }: Props
) => {
    if (!hasMore) {
        return null;
    }

    const t = useTranslations('Common');

    return (
        <div className="d-flex justify-content-center mb-5">
            <button
                disabled={isLoading}
                onClick={onLoadMore}
                className="btn-load btn btn-custom-dark fw-semibold min-w-150 rounded-pill"
            >
                {t('loadMore')}
            </button>
        </div>
    );
}

export default LoadMoreButton;