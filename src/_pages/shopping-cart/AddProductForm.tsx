"use client";
import React from "react";
import { Col, Row } from "react-bootstrap";
import Image from "next/image";
import cart1 from '@assets/images/shopping-cart/cart_image.png'

const AddProductForm = () => {
    return (
        <Row className="py-5 form-comman">
            <Col md={6}>
                <label className="fs-14 mb-2" htmlFor="order" role="button">Add Order Note</label>
                <textarea className="form-control rounded-0" id="order" placeholder="How can we help you ?" rows={6}></textarea>
                <div className="row">
                    <div className="col-12 col-md-7">
                        <label className="fs-14 mt-3 mb-2" htmlFor="coupon" role="button">Coupon:</label>
                        <p className="text-muted">Coupon code will work on checkout page</p>
                        <input className="form-control rounded-0" id="coupon" type="text" aria-label="default input example" placeholder="Coupon code" />
                    </div>
                </div>
            </Col>

            <Col md={6} className="text-md-end mt-4 mt-md-0">
                <h5>SUBTOTAL : $85.00</h5>

                <p className="text-muted mb-2">Taxes, shipping and discounts codes calculated at checkout</p>

                <div className="text-muted mb-3">
                    <input className="form-check-input rounded-0" type="checkbox" value="" id="flexCheckChecked" />
                    <label htmlFor="flexCheckChecked" role="button" className="ms-1">
                        I agree with the terms and conditions.
                    </label>
                </div>

                <button type="submit" className=" btn btn-teal px-5 py-2 rounded-pill mb-3">
                    CHECK OUT
                </button>
            </Col>
        </Row>
    )
}
export default AddProductForm