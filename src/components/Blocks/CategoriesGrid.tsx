import { CategoriesGridObject } from "@interfaces/entities/blocks/categories-grid";
import CategoriesGridItem from "@src/components/Blocks/CategoriesGridItem";


const CategoriesGrid = (props: CategoriesGridObject) => {
    return (
        <section className="cat-section pb-4">
            <div className="container">
                <div className="categories__grid">
                    {
                        props.categories.map((item, index) => {
                            return (
                                <CategoriesGridItem
                                    key={index}
                                    item={item}
                                />
                            );
                        })
                    }
                </div>
            </div>
        </section>
    );
};

export default CategoriesGrid;