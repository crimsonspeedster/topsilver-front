import {AdvantageObject} from "@interfaces/entities/blocks/advantages";
import Image from "next/image";


const AdvantageItem = ({item} : {item: AdvantageObject}) => {
    return (
        <div className="d-flex gap-3">
            <Image
                src={item. image}
                alt={item.title}
                width={36}
                height={36}
            />

            <div className="flex-grow-1">
                <h6 className="text-uppercase font-playfair">{item.title}</h6>

                <p className="text-muted mb-0">{item.description}</p>
            </div>
        </div>
    );
}

export default AdvantageItem;