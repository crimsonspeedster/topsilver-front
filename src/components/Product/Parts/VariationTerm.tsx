import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {attributeTermObject} from "@interfaces/entities/attribute";


type Props = {
    term: attributeTermObject,
    isActive: boolean,
};

const VariationTerm = (
    {
        term,
        isActive,
    }: Props
) => {
    return (
        <OverlayTrigger
            placement="top"
            overlay={
                <Tooltip
                    id={`tooltip-${term.id}`}
                >{term.title}</Tooltip>
            }
        >
            <button
                className={`d-inline-block rounded-circle bg-transparent square-xs ${isActive ? 'active' : ''}`}
                style={
                    term.meta_value ?
                        {
                            backgroundColor: term.meta_value,
                        }
                        :
                        undefined
                }
            >
                {term.meta_value ? null : term.title}
            </button>
        </OverlayTrigger>
    );
}

export default VariationTerm;