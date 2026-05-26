"use client";

import React, {useEffect, useMemo, useState} from 'react';
import { Offcanvas } from 'react-bootstrap';
import Link from 'next/link';
import {TaxonomyOptionsObject} from "@interfaces/entities/taxonomy";
import axiosClient from "@lib/axiosClient";
import {useTranslations} from "next-intl";
import * as Yup from "yup";
import {useFormik} from "formik";
import {Form} from 'react-bootstrap';
import FormField from "@src/components/Form/FormField";
import SelectField from "@src/components/Form/SelectField";
import {ProductCardObject, ProductSearchPromiseObject} from "@interfaces/entities/product";
import ProductSearchItem from "@src/components/Product/ProductSearchItem";
import {AxiosResponse} from "axios";


type Props = {
    show: boolean;
    handleClose: () => void;
}

const SearchModal = (
    {
        show,
        handleClose,
    }: Props
) => {
    const tForm = useTranslations('Form');
    const tSearch = useTranslations('Search');

    const [categories, setCategories] = useState<TaxonomyOptionsObject[]>([]);
    const [searchItems, setSearchItems] = useState<ProductCardObject[]>([]);
    const [searchLink, setSearchLink] = useState<string|null>(null);

    useEffect(()=>{
        if (show && categories.length === 0) {
            axiosClient.get('/reference/categories')
                .then(res => setCategories(res.data.data));
        }
    }, [show]);

    const validationSchema = useMemo(() => Yup.object({
        search: Yup.string()
            .required(tForm('errors.required')),
    }), [tForm]);

    const formik = useFormik({
        initialValues: {
            search: '',
            category_id: '',
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting, setErrors, resetForm }) => {
            setSubmitting(true);

            try {
                const response: AxiosResponse<{data: ProductSearchPromiseObject}> = await axiosClient.get('/search', {
                    params: {
                        page: 1,
                        search: values.search,
                        'categories[]': values.category_id ? Number(values.category_id) : null,
                    }
                });

                setSearchLink(`/search-results?search=${values.search}&category_id=${values.category_id}`);
                setSearchItems(response.data.data?.products ?? []);
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header className='border-bottom'>
                <h5 className="offcanvas-title fs-16 text-uppercase">
                    {tSearch('search_on_site')}
                </h5>

                <button
                    className="btn-close btn-close-none"
                    onClick={handleClose}
                >
                    <i className="pe-7s-close pegk" />
                </button>
            </Offcanvas.Header>

            <div className="px-3 py-4">
                <div>
                    <Form
                        onSubmit={formik.handleSubmit}
                    >
                        {
                            categories.length > 0 &&
                            <SelectField
                                name="category_id"
                                placeholder={tSearch('all_categories')}
                                formik={formik}
                                options={
                                    categories.map((item) => ({
                                        label: item.title,
                                        value: item.id,
                                    }))
                                }
                                required={false}
                            />
                        }

                        <div className="search-box position-relative">
                            <FormField
                                placeholder={tSearch('search')}
                                classesString="rounded-pill search-input"
                                name="search"
                                formik={formik}
                                required={true}
                                type="text"
                            />

                            <button
                                type="submit"
                                className="btn"
                                disabled={formik.isSubmitting}
                            >
                                <i className="iccl iccl-search" />
                            </button>
                        </div>
                    </Form>
                </div>
            </div>

            {
                searchItems.length > 0 ?
                    <div className="offcanvas-body">
                        {
                            searchItems.map(item => (
                                <ProductSearchItem
                                    handleClose={handleClose}
                                    item={item}
                                    key={item.id}
                                />
                            ))
                        }
                    </div>
                    :
                    <p className="text-center text-muted">{tSearch('not_found')}</p>
            }

            {
                searchLink && searchItems.length > 0 &&
                <div className="py-4 border-top mx-4">
                    <Link
                        onNavigate={handleClose}
                        href={searchLink}
                        className="detail_link fs-14 fw-semibold"
                    >
                        {tSearch('show_all')}  <i className="las la-arrow-right fs__18" />
                    </Link>
                </div>
            }
        </Offcanvas>
    )
}

export default SearchModal;