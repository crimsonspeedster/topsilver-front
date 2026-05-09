import {ProductCardObject} from "@interfaces/entities/product";
import Image from 'next/image';
import Link from 'next/link';


type Props = {
    product: ProductCardObject,
    handleShow: any,
    handleAddToCardModalShow: (
        id: number,
    ) => void,
}

const ProductBlock = (
    {
        product,
        handleShow,
        handleAddToCardModalShow
    }
    : Props) => {

    return (
        <div className="topbar-product-card pb-3 w-100">
            <div className="position-relative overflow-hidden">
                {
                    product.labels.length > 0 &&
                    (
                        <span className="labels">
                                {
                                    product.labels.map(label => (
                                        <span key={label.slug} className={`label label--${label.slug}`}>
                                            {label.name}
                                        </span>
                                    ))
                                }
                            </span>
                    )
                }

                <Image
                    src={product.media.url}
                    alt={product.title}
                    className="img-fluid w-100"
                    width={360}
                    height={459}
                />

                <Link href="#" className="d-lg-none position-absolute" style={{ zIndex: 1, top: 10, left: 10 }} data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to Wishlist">
                    <i className="facl facl-heart-o text-white"></i>
                </Link>

                <Link href="#" className="wishlistadd d-none d-lg-flex position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to Wishlist">
                    <i className="facl facl-heart-o text-white"></i>
                </Link>

                <div className="product-button d-none d-lg-flex flex-column gap-2">
                    <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14" onClick={handleShow}>
                        <span>Quick View</span>

                        <i className="iccl iccl-eye"></i>
                    </Link>

                    <button
                        type="button"
                        className="btn rounded-pill fs-14"
                        data-bs-toggle="modal"
                        data-bs-target="#cardModal"
                        onClick={() => handleAddToCardModalShow(product.id)}
                    >
                        <span>Quick Shop</span>

                        <i className="iccl iccl-cart"></i>
                    </button>
                </div>

                <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1 }}>
                    <Link href="#exampleModal" data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: 36, height: 36 }} onClick={handleShow}>
                        <i className="iccl iccl-eye fw-semibold"></i>
                    </Link>

                    <button
                        type="button"
                        className="btn responsive-cart rounded-pill fs-14 p-2"
                        style={{ width: 36, height: 36 }}
                        data-bs-toggle="modal"
                        data-bs-target="#cardModal"
                        onClick={() => handleAddToCardModalShow(product.id)}
                    >
                        <i className="iccl iccl-cart fw-semibold"></i>
                    </button>
                </div>
            </div>

            <div className="mt-3">
                <h6 className="mb-1 fw-medium">
                    <Link href={product.slug ?? ''} className="main_link_acid_green">{product.title}</Link>
                </h6>

                {
                    product.price_on_sale_formatted ?

                        <p className="mb-0 fs-14 text-muted">
                            <del>{product.price_formatted}</del>&nbsp;
                            <span className='text-danger'>{product.price_on_sale_formatted}</span>
                        </p>
                        :
                        <p className="mb-0 fs-14 text-muted">
                            <span>{product.price_formatted}</span>
                        </p>
                }
            </div>
        </div>
    );
};

export default ProductBlock;