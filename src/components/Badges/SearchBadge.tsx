type Props = {
    handleClick: () => void,
}

const SearchBadge = (
    {
        handleClick,
    }: Props
) => {
    return (
        <button
            className="btn p-0"
            onClick={handleClick}
        >
            <i className="iccl iccl-search" />
        </button>
    );
}

export default SearchBadge;