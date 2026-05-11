import {VariantAttributeObject} from "@interfaces/entities/product";
import VariationTerm from "@src/components/Product/Parts/VariationTerm";


type Props = {
    variants: VariantAttributeObject[],
    isTermsCentered?: boolean,
};

const Variations = (
    {
        variants,
        isTermsCentered,
    }: Props
) => {
    return (
        <div className="mb-4 pt-2">
            {
                variants.map((variant) => (
                    <div
                        key={variant.attribute.id}
                        className="mb-4 pt-2"
                    >
                        <h6 className="text-uppercase fw-bold mb-3">
                            {variant.attribute.title}: <span>TODO</span>
                        </h6>

                        <div className={`product-color-list size mt-2 gap-2 d-flex align-items-center flex-wrap ${isTermsCentered ? "justify-content-center" : ""}`}>
                            {
                                variant.terms.map((term) => (
                                    <VariationTerm
                                        key={term.id}
                                        term={term}
                                        isActive={false}
                                    />
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Variations;