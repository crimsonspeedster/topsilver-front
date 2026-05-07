import React from "react";

const LoadMoreButton = (
    {
        hasMore,
        onLoadMore,
        isLoading,
    }
    :
    {
        hasMore: boolean,
        isLoading: boolean,
        onLoadMore: () => void,
    }
) => {
    if (!hasMore) {
        return null;
    }

    return (
        <div className="d-flex justify-content-center mb-5">
            <button
                disabled={isLoading}
                onClick={onLoadMore}
                className="btn-load btn btn-custom-dark fw-semibold min-w-150 rounded-pill"
            >
                Load more
            </button>
        </div>
    );
}

export default LoadMoreButton;