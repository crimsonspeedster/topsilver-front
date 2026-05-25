import {AdvantagesLayoutObject} from "@interfaces/entities/blocks/advantages";
import AdvantageItem from "@src/components/Blocks/AdvantageItem";


const Advantages = (props: AdvantagesLayoutObject) => {
    return (
        <div className="kalles-section-type-shipping">
            <div className="container">
                <div className="gap-4 d-flex overflow-x-auto">
                    {
                        props.attributes.blocks.map((item, index) => (
                            <AdvantageItem
                                key={index}
                                item={item}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Advantages;