"use client";

import React from "react";
import Link from "next/link";
import { Container } from "react-bootstrap";
import {BreadcrumbsObject, ProductCardObject} from "@interfaces/entities/product";


type Props = {
    breadcrumbs: BreadcrumbsObject[],
    prev_next: {
        prev: ProductCardObject|null,
        next: ProductCardObject|null,
    }
}

const BreadCrumb = (
    {
        breadcrumbs,
        prev_next,
    }: Props
) => {
    return (
        <section className="main-project-section">
            <Container>
                <div className="d-flex justify-content-between align-items-center py-3">
                    <nav className="customDiv" aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0 fs-13">
                            {
                                breadcrumbs.map((item, index) => (
                                    <li
                                        key={index}
                                        className={`breadcrumb-item ${index === breadcrumbs.length - 1 ? "active" : ""}`}
                                    >
                                        {
                                            item.slug ?
                                                <Link href={`/${item.slug}`}>{item.title}</Link>
                                                :
                                                <>{item.title}</>
                                        }
                                    </li>
                                ))
                            }
                        </ol>
                    </nav>

                    {
                        (prev_next.prev || prev_next.next) &&
                        <ul className="d-flex list-unstyled align-items-center mb-0" dir="ltr">
                            {
                                prev_next.prev &&
                                <li>
                                    <Link href={`/${prev_next.prev.slug}`} className="fs-18">
                                        <i className="las la-angle-left"></i>
                                    </Link>
                                </li>
                            }

                            {
                                prev_next.next &&
                                <li>
                                    <Link href={`/${prev_next.next.slug}`} className="fs-18">
                                        <i className="las la-angle-right"></i>
                                    </Link>
                                </li>
                            }
                        </ul>
                    }
                </div>
            </Container>
        </section>

    )

}
export default BreadCrumb