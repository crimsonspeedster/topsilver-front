"use client";
import React, { useState, useEffect } from 'react'
import AddToCardModal from '@src/commonsections/AddToCardModal';
import Image from 'next/image';
import Link from 'next/link';
import { Col, Container, Dropdown, Row } from 'react-bootstrap'
import ProductModal from './ProductModal';
import {ProductCardObject} from "@interfaces/entities/product";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
import {TaxonomyFiltersObject} from "@interfaces/entities/taxonomy";
import {attributeObject, attributeTermFunctionalityObject} from "@interfaces/entities/attribute";

const TaxonomyFilters = (
    {
        filters,
        open,
        onFilterChange,
    } : {
        filters: TaxonomyFiltersObject,
        open: boolean,
        onFilterChange: (
            attribute: attributeObject,
            term: attributeTermFunctionalityObject,
            checked: boolean,
        ) => void,
    }
) => {
    const [range, setRange] = useState([filters.price.min, filters.price.max]);

    const handleRangeChange = (value: number | number[]) => {
        if (Array.isArray(value)) {
            setRange(value);
        } else {
            setRange([value, value]);
        }
    };

    return (
        <div className={`p-4 filter-box ${!open ? "" : "d-none"} mt-4`}>
            <Row className="m-sm-2 g-4 g-sm-2">
                {
                    filters.attributes.map(attribute => {
                        if (attribute.attribute.type === 'color') {
                            return (
                                <Col sm={6} lg={3}>
                                    <h5 className="mb-1 fw-medium">By {attribute.attribute.title}</h5>

                                    <div className="filter-title" />

                                    <div className="mt-3">
                                        {
                                            attribute.terms.map(item => (
                                                <div key={item.id} className="round d-flex align-items-center pt-2 mb-2 gap-1">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id={item.slug}
                                                        onInput={(e) => {
                                                            onFilterChange(
                                                                attribute.attribute,
                                                                item,
                                                                e.target.checked,
                                                            );
                                                        }}
                                                        defaultChecked={item.selected}
                                                        style={
                                                            item.meta_value ?
                                                                {
                                                                    backgroundColor: item.meta_value,
                                                                }
                                                                :
                                                                undefined
                                                        }
                                                    />

                                                    <label
                                                        className="form-check-label ms-1"
                                                        style={{ cursor: "pointer" }}
                                                        htmlFor={item.slug}
                                                    >
                                                        {item.title} ({item.count})
                                                    </label>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </Col>
                            );
                        }
                        else {
                            return (
                                <Col sm={6} lg={3}>
                                    <h5 className="mb-1 fw-medium">By {attribute.attribute.title}</h5>

                                    <div className="filter-title" />

                                    <div className="mt-3">
                                        {
                                            attribute.terms.map(item => (
                                                <div key={item.id} className="form-check mb-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id={item.slug}
                                                        defaultChecked={item.selected}
                                                        onInput={(e) => {
                                                            onFilterChange(
                                                                attribute.attribute,
                                                                item,
                                                                e.target.checked,
                                                            );
                                                        }}
                                                    />

                                                    <label
                                                        className="form-check-label"
                                                        htmlFor={item.slug}
                                                        style={{ cursor: "pointer" }}
                                                    >
                                                        {item.title} ({item.count})
                                                    </label>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </Col>
                            )
                        }
                    })
                }

                <div className="col-sm-6 col-lg-3">
                    <h5 className="mb-1 fw-medium">By Price</h5>

                    <div className="filter-title" />

                    <form action="" className="mt-5">
                        <div className="slider-area">
                            <Slider
                                range
                                step={1}
                                min={filters.price.min}
                                max={filters.price.max}
                                value={range}
                                onChange={handleRangeChange}
                                allowCross={false} // Ensure one thumb cannot cross the other
                            />

                            <div className="d-flex align-items-center mt-4 py-2">
                                <span className="text-muted">Price: </span>
                                <h6 className="mb-0 mx-2">
                                    <span>{`$${range[0].toFixed(2)}`}</span>
                                </h6>
                                -
                                <h6 className="mb-0 ms-2">
                                    <span>{`$${range[1].toFixed(2)}`}</span>
                                </h6>
                            </div>
                        </div>
                        <button className="btn btn-custom-dark fw-medium min-w-150">FILTER</button>
                    </form>
                </div>
            </Row>
        </div>
    );
}

const ProductCard = ({ product, handleShow, handleAddToCardModalShow }: {
    product: ProductCardObject,
    handleShow: any,
    handleAddToCardModalShow: any,
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageUrl, setImageUrl] = useState(product.imageUrl);

    return (
        <>
            <div
                className="topbar-product-card pb-3 w-100"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="position-relative overflow-hidden">
                    {
                        product.labels.length > 0 &&
                        (
                            <span className="labels">
                                {
                                    product.labels.map(label => (
                                        <span key={label.slug} className={`label label--${label.slug}`}>
                                            {label.name}
                                        </span>
                                    ))
                                }
                            </span>
                        )
                    }

                    <Image
                        src={product.media.url}
                        alt="ImageUrlImg"
                        className="img-fluid w-100"
                        width={360}
                        height={459}
                    />

                    <Link href="#" className="d-lg-none position-absolute" style={{ zIndex: 1, top: 10, left: 10 }} data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to Wishlist">
                        <i className="facl facl-heart-o text-white"></i>
                    </Link>

                    <Link href="#" className="wishlistadd d-none d-lg-flex position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to Wishlist">
                        <i className="facl facl-heart-o text-white"></i>
                    </Link>

                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                        <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14" onClick={handleShow}>
                            <span>Quick View</span>
                            <i className="iccl iccl-eye"></i>
                        </Link>

                        <button
                            type="button"
                            className="btn rounded-pill fs-14"
                            data-bs-toggle="modal"
                            data-bs-target="#cardModal"
                            onClick={handleAddToCardModalShow}
                        >
                            <span>Quick Shop</span>
                            <i className="iccl iccl-cart"></i>
                        </button>
                    </div>
                    <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1 }}>
                        <Link href="#exampleModal" data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: 36, height: 36 }} onClick={handleShow}>
                            <i className="iccl iccl-eye fw-semibold"></i>
                        </Link>
                        <button
                            type="button"
                            className="btn responsive-cart rounded-pill fs-14 p-2"
                            style={{ width: 36, height: 36 }}
                            data-bs-toggle="modal"
                            data-bs-target="#cardModal"
                            onClick={handleAddToCardModalShow}
                        >
                            <i className="iccl iccl-cart fw-semibold"></i>
                        </button>
                    </div>
                </div>
                <div className="mt-3">
                    <h6 className="mb-1 fw-medium">
                        <Link href={product.slug ?? ''} className="main_link_acid_green">{product.title}</Link>
                    </h6>
                    {
                        product.price_on_sale ?

                            <p className="mb-0 fs-14 text-muted">
                                <del>{product.price}</del>&nbsp;
                                <span className='text-danger'>{product.price_on_sale}</span>
                            </p>
                            :
                            <p className="mb-0 fs-14 text-muted">
                                <span>{product.price}</span>
                            </p>
                    }

                    {product.colors ?
                        <div className="product-color-list mt-2 gap-2 d-flex align-items-center">
                            {product.colors && product.colors.map((color: any, index: number) => (
                                <Link
                                    href="#!"
                                    key={index}
                                    onMouseOver={() => setImageUrl(color.imageUrl)}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setImageUrl(color.imageUrl);
                                    }}
                                    className={`d-inline-block ${color.color} rounded-circle`}
                                ></Link>
                            ))}
                        </div>
                        :
                        <div className="product-color-list mt-2 gap-2 d-flex align-items-center">
                            {product.color && product.color.map((color: any, index: number) => (
                                <Link
                                    href="#!"
                                    key={index}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setImageUrl(color.imageUrl);
                                        setIsHovered(false);
                                    }}
                                    style={{
                                        background: `url('${color.imageUrl.src}')`,
                                        backgroundSize: 'cover'
                                    }}
                                    className="d-inline-block bg-body-tertiary rounded-circle"
                                />
                            ))}
                        </div>
                    }
                </div>
            </div>
        </>
    );
};

const FilterTab = ({
    products,
    filters,
    onFilterChange,
} : {
    products: ProductCardObject[],
    filters: TaxonomyFiltersObject,
    onFilterChange: (
        attribute: attributeObject,
        term: attributeTermFunctionalityObject,
        checked: boolean,
    ) => void,
}) => {

    const [open, setOpen] = useState(true);
    const [show, setShow] = useState(false);
    const [cardShow, setCardShow] = useState(false);
    const [display, setDisplay] = useState(3);

    const handleShow = () => setShow(!show);
    const handleAddToCardModalShow = () => setCardShow(true);
    const handleAddToCardModalClose = () => setCardShow(false);
    const handleOpen = () => setOpen(!open);
    const handleClick = (id: any) => setDisplay(display === id ? null : id);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setDisplay(1); // 2 columns for mobile view
            } else {
                setDisplay(3); // Default columns for larger screens
            }
        };
        window.addEventListener('resize', handleResize);
        // Set initial value based on the current window size
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <React.Fragment>
            <Container>
                <div className="mt-5 d-flex justify-content-between align-items-center">
                    <div className="text-muted fs-16 align-items-center d-none d-lg-flex" id="filter-icon" onClick={handleOpen}>
                        <i className={`iccl fwb iccl-filter fwb me-2 fw-medium ${!open ? "d-none" : ""}`} id="icon-filter"></i>
                        <i className={`pe-7s-close pegk ${!open ? "" : "d-none"} me-2 fw-medium fw-semibold`} id="icon-close" style={{ fontSize: "24px" }}></i>
                        <p className="mb-0">Filter</p>
                    </div>

                    <div className="d-flex align-items-center d-lg-none fs-16 text-muted" data-bs-toggle="offcanvas">
                        <i className="iccl fwb iccl-filter fwb me-2 fw-medium" id="icon-filter"></i>
                        <i className="pe-7s-close pegk d-none me-2 fw-medium fw-semibold" id="icon-close" style={{ fontSize: "24px" }}></i>
                        <p className="mb-0">Filter</p>
                    </div>

                    <Dropdown>
                        <Dropdown.Toggle className="btn d-flex align-items-center justify-content-between featurnBtn rounded-pill dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Feature
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu filter-dropdown">
                            <Dropdown.Item><li><Link href="#">Feature</Link></li></Dropdown.Item>
                            <Dropdown.Item><li><Link href="#">Best selling</Link></li></Dropdown.Item>
                            <Dropdown.Item> <li><Link href="#">Alphabetically, A-Z</Link></li></Dropdown.Item>
                            <Dropdown.Item> <li><Link href="#">Alphabetically, Z-A</Link></li></Dropdown.Item>
                            <Dropdown.Item><li><Link href="#">Price, low to high</Link></li></Dropdown.Item>
                            <Dropdown.Item><li><Link href="#">Date, old to new</Link></li></Dropdown.Item>
                            <Dropdown.Item><li><Link href="#">Date, new to old</Link></li></Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                <TaxonomyFilters
                    filters={filters}
                    open={open}
                    onFilterChange={onFilterChange}
                />

                <div className="my-3 my-md-4">
                    <div>
                        <Row className="g-lg-4 g-3">
                            {
                                products.map(product => (
                                    <div className='col-3' key={product.id}>
                                        <ProductCard key={product.id} product={product} handleShow={handleShow} handleAddToCardModalShow={handleAddToCardModalShow} />
                                    </div>
                                ))
                            }
                        </Row>
                    </div>
                </div>
            </Container>

            <ProductModal show={show} handleClose={handleShow} />

            <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />
        </React.Fragment>
    )
}

export default FilterTab