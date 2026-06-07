'use client';

import {FaqItemObject} from "@interfaces/entities/blocks/faq";
import Accordion from 'react-bootstrap/Accordion';


type Props = {
    item: FaqItemObject;
};

const FaqBlockItem = (
    {
        item,
    }: Props
) => {
    return (
        <Accordion.Item eventKey={item.title}>
            <Accordion.Header>
                {item.title}
            </Accordion.Header>

            <Accordion.Body>
                <div
                    dangerouslySetInnerHTML={{
                        __html: item.content,
                    }}
                />
            </Accordion.Body>
        </Accordion.Item>
    );
}

export default FaqBlockItem;