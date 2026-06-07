'use client';

import {FaqObject} from "@interfaces/entities/blocks/faq";
import Accordion from 'react-bootstrap/Accordion';
import FaqBlockItem from "@src/components/Blocks/FaqBlockItem";

const FaqBlock = (props: FaqObject) => {
    return (
        <section className="py-5">
            <div className="container">
                <Accordion>
                    {
                        props.blocks.map((item, index) => (
                            <FaqBlockItem
                                item={item.attributes}
                                key={index}
                            />
                        ))
                    }
                </Accordion>
            </div>
        </section>
    );
}

export default FaqBlock;