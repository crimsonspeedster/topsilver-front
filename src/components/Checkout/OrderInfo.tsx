import {useTranslations} from "next-intl";
import {useFormikContext} from "formik";
import Link from "next/link";


const OrderInfo = () => {
    const tCheckout = useTranslations('Checkout');
    const tCart = useTranslations('Cart');
    const tForm = useTranslations('Form');
    const {isSubmitting, isValid} = useFormikContext();

    return (
        <div className="checkout-order">
            <h3 className="border-bottom pb-3 mb-0 fs-22">{tCheckout('your_order')}</h3>

            <div
                className="filter-title mb-4 bg-teal"
                style={{ width: '134px' }}
            />

            <div className="d-flex justify-content-between fw-medium border-bottom mb-0 p-2">
                <h6 className="mb-0 lh-lg">{tCart('table_name_product')}</h6>

                <h6 className="mb-0 lh-lg">{tCart('subtotal')}</h6>
            </div>

            <div>
                // ITEMS
            </div>

            <div className="d-flex justify-content-between fw-medium border-bottom mb-0 p-2">
                <h6 className="mb-0 lh-lg">{tCart('subtotal')}</h6>

                <p className="mb-0 lh-lg">$85.00</p>
            </div>

            <div className="d-flex justify-content-between fw-medium border-bottom mb-0 p-2">
                <h6 className="mb-0 lh-lg">{tCart('total')}</h6>

                <p className="mb-0 lh-lg">$145.00</p>
            </div>

            <div className="form-check mt-3">
                <input
                    className="form-check-input"
                    type="checkbox"
                    required
                    name="rules"
                />

                <label className="form-label form-check-label">
                    {
                        tCheckout.rich('read_rules', {
                            link: (chunks) => (
                                <Link
                                    href="/rules"
                                    className="underline"
                                >
                                    {chunks}
                                </Link>
                            )
                        })
                    }

                    <span className="text-danger"> *</span>
                </label>
            </div>

            <button
                className="btn btn-teal mt-3 px-5 py-3 fw-bold w-100 rounded-pill btn btn-primary"
            >
                {tForm('buttons.send_order')}
            </button>
        </div>
    );
}

export default OrderInfo;