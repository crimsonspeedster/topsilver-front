"use client";

import AddToCardModal from '@src/commonsections/AddToCardModal';
import ProductModal from "@src/commonsections/ProductModal";
import {useProductPopupStore} from "@src/store/product-popup-store";


const ProductPopups = () => {
    const {
        quickView,
        quickShop,
        selectedProductQuickShop,
        selectedProductQuickView,
        closeQuickView,
        closeQuickShop,
    } = useProductPopupStore();
    return (
        <>
            <ProductModal
                cardShow={quickView}
                handleClose={closeQuickView}
                product={selectedProductQuickView}
            />

            <AddToCardModal
                cardShow={quickShop}
                handleAddToCardModalClose={closeQuickShop}
                product={selectedProductQuickShop}
            />
        </>
    );
}

export default ProductPopups;