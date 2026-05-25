import {BannersLayoutObject} from "@interfaces/entities/blocks/banners";
import { Col, Row } from 'react-bootstrap'
import BannersItem from "@src/components/Blocks/BannersItem";


const Banners = (props: BannersLayoutObject) => {
    return (
        <section className="banner-section position-relative mt-5 pt-4">
            <div className="container">
                <Row className="g-2 g-md-4">
                    {
                        props.attributes.banners.map((item, index) => (
                            <Col
                                key={index}
                                md={props.attributes.layout_type === '3x3' ? 4 : 'auto'}
                                lg={props.attributes.layout_type === '2x2' ? 2 : 'auto'}
                            >
                                <BannersItem
                                    item={item}
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