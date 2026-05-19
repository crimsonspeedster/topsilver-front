import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {attributeTermObject} from "@interfaces/entities/attribute";


type Props = {
    term: attributeTermObject,
    isActive: boolean,
    handleClick: (termId: number) => void;
};

const VariationTerm = (
    {
        term,
        isActive,
        handleClick,
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
                onClick={() => handleClick(term.id)}
                className={`d-inline-block rounded-circle square-xs ${isActive ? 'active' : ''}`}
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