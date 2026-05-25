"use client";

import Link from "next/link";
import {PaginationObject} from "@interfaces/common";
import { useTranslations } from 'next-intl';
import {useSearchParams} from "next/navigation";


type Props = {
    pagination: PaginationObject,
    current_page: number,
    slug: string,
};

const PaginationComponent = (
    {
        pagination,
        current_page,
        slug,
    }: Props
) => {
    const t = useTranslations('Pagination');
    const searchParams = useSearchParams();
    const { total_pages } = pagination;
    const pages = Array.from({ length: total_pages }, (_, i) => i + 1);
    const buildHref = (page: number) => {
        const params = new URLSearchParams(
            searchParams.toString()
        );

        params.delete('page');

        const query = params.toString();
        const pathname = page === 1
            ? `/${slug}`
            : `/${slug}/page/${page}`;

        return query
            ? `${pathname}?${query}`
            : pathname;
    };

    if (total_pages <= 1) {
        return null;
    }

    return (
        <div className="filter-pagination">
            <ul className="pagination py-4 d-flex flex-wrap justify-content-center">
                {
                    current_page > 1 &&
                    <li>
                        <Link href={buildHref(current_page - 1)}>
                            {t('prev')}
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
                            {t('next')}
                        </Link>
                    </li>
                }
            </ul>
        </div>
    );
};

export default PaginationComponent;