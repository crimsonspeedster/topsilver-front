import {BannersLayoutObject, BannersObject} from "@interfaces/entities/blocks/banners";
import { Col, Row } from 'react-bootstrap'
import BannersItem from "@src/components/Blocks/BannersItem";


const Banners = (props: BannersObject) => {
    return (
        <section className="banner-section position-relative mt-5 pt-4">
            <div className="container">
                <Row className="g-2 g-md-4">
                    {
                        props.banners.map((item, index) => (
                            <Col
                                key={index}
                                md={props.layout_type === '3x3' ? 4 : undefined}
                                lg={props.layout_type === '2x2' ? 6 : undefined}
                            >
                                <BannersItem
                                    item={item.attributes}
                                />
                            </Col>
                        ))
                    }
                </Row>
            </div>
        </section>
    );
}

export default Banners;