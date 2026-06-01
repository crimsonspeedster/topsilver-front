import {AdvantagesObject} from "@interfaces/entities/blocks/advantages";
import AdvantageItem from "@src/components/Blocks/AdvantageItem";


const Advantages = (props: AdvantagesObject) => {
    return (
        <div className="kalles-section-type-shipping">
            <div className="container">
                <div className="gap-4 d-flex overflow-x-auto">
                    {
                        props.blocks.map((item, index) => (
                            <AdvantageItem
                                key={index}
                                item={item.attributes}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Advantages;