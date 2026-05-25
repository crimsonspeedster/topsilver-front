import {
    CategoriesGridObject,
    GRID_LAYOUT_MAP
} from "@interfaces/entities/blocks/categories-grid";
import CategoriesGridItem from "@src/components/Blocks/CategoriesGridItem";


const CategoriesGrid = (props: CategoriesGridObject) => {
    return (
        <section className="cat-section pb-4">
            <div className="container">
                <div className="row g-2 g-md-4">
                    {
                        props.categories.map((item, index) => {
                            const layout = GRID_LAYOUT_MAP[item.attributes.position];

                            return (
                                <div
                                    key={index}
                                    className={layout.wrapper}
                                >
                                    <div className="row g-2 g-md-4">
                                        <div className={layout.col}>
                                            <CategoriesGridItem
                                                item={item}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </section>
    );
};

export default CategoriesGrid;