import {Col, Row} from "react-bootstrap";
import {MegaMenuLayoutObject} from "@interfaces/entities/menu";
import {LayoutBaseObject} from "@interfaces/entities/page";
import {contentEntityBlocksMap} from "@src/helpers";

const MegaMenu = (
    {
        item,
        isOpened,
    }
    :
    {
        item: (LayoutBaseObject & MegaMenuLayoutObject),
        isOpened: boolean,
    }
) => {
    return (
        <div className={`dropdown-menu p-3 ${isOpened ? 'show' : ''}`}>
            <Row className="g-0">
                {
                    item.attributes.left_part.length > 0 &&
                    <Col lg={5}>
                        <Row className="g-0">
                            {
                                item.attributes.left_part.map((el, i) => {
                                    const Component = contentEntityBlocksMap[el.layout];

                                    if (!Component)
                                        return null;

                                    return (
                                        <Col
                                            key={i}
                                            lg={6}
                                        >
                                            <Component
                                                {...el.attributes}
                                            />
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </Col>
                }

                {
                    item.attributes.right_part.length > 0 &&
                    <Col lg={7}>
                        <Row className="p-4">
                            {
                                item.attributes.right_part.map((el, i) => {
                                    const Component = contentEntityBlocksMap[el.layout];

                                    if (!Component)
                                        return null;

                                    return (
                                        <Col
                                            key={i}
                                            lg={6}
                                            className="cat-section p-0"
                                        >
                                            <Component
                                                {...el.attributes}
                                            />
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </Col>
                }
            </Row>
        </div>
    );
}

export default MegaMenu;