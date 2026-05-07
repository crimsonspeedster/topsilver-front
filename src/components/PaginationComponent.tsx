import Link from "next/link";
import {PaginationObject} from "@interfaces/common";

const PaginationComponent = ({
    pagination,
    current_page,
    slug,
}: {
    pagination: PaginationObject,
    current_page: number,
    slug: string,
}) => {
    const { total_pages } = pagination;
    const pages = Array.from({ length: total_pages }, (_, i) => i + 1);
    const buildHref = (page: number) => page === 1 ? `/${slug}` : `/${slug}/page/${page}`;

    return (
        total_pages > 1 && (
            <div className="filter-pagination">
                <ul className="pagination py-4 d-flex justify-content-center">
                    {
                        current_page > 1 &&
                        <li>
                            <Link href={buildHref(current_page - 1)}>
                                Prev
                            </Link>
                        </li>
                    }

                    {pages.map((page) => (
                        <li
                            key={page}
                            className={page === current_page ? "active" : ""}
                        >
                            {page === current_page ? (
                                <span className="text-danger">
                                    {page}
                                </span>
                            ) : (
                                <Link href={buildHref(page)}>
                                    {page}
                                </Link>
                            )}
                        </li>
                    ))}

                    {
                        current_page < total_pages &&
                        <li>
                            <Link href={buildHref(current_page + 1)}>
                                Next
                            </Link>
                        </li>
                    }
                </ul>
            </div>
        )
    );
};

export default PaginationComponent;