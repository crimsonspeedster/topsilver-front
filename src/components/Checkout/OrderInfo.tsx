import {useTranslations} from "next-intl";
import {useFormikContext} from "formik";
import Link from "next/link";
import {CartObject} from "@interfaces/entities/cart";
import CheckoutItem from "@src/components/Checkout/CheckoutItem";
import {CheckoutFormValues} from "@interfaces/layouts/checkoutForm";
import {RelationPageObject} from "@interfaces/entities/settings";


type Props = {
    cart: CartObject;
    rulesPage?: RelationPageObject | null;
}

const OrderInfo = (
    {
        cart,
        rulesPage,
    }: Props
) => {
    const tCheckout = useTranslations('Checkout');
    const tCart = useTranslations('Cart');
    const tForm = useTranslations('Form');
    const {isSubmitting, isValid, submitForm, errors, values, setFieldValue} = useFormikContext<CheckoutFormValues>();

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
                {
                    cart.items.map((item) => (
                        <CheckoutItem
                            key={item.id}
                            title={item.entity.title}
                            qty={item.quantity}
                            price={item.price_formatted}
                        />
                    ))
                }
            </div>

            <div className="d-flex justify-content-between fw-medium border-bottom mb-0 p-2">
                <h6 className="mb-0 lh-lg">{tCart('subtotal')}</h6>

                <p className="mb-0 lh-lg">{cart.subtotal_formatted}</p>
            </div>

            <div className="d-flex justify-content-between fw-medium border-bottom mb-0 p-2">
                <h6 className="mb-0 lh-lg">{tCart('total')}</h6>

                <p className="mb-0 lh-lg">{cart.total_formatted}</p>
            </div>

            <div className="form-check mt-3">
                <input
                    className="form-check-input"
                    type="checkbox"
                    name="rules"
                    checked={values.rules}
                    onChange={(e) => {
                        setFieldValue('rules', e.target.checked);
                    }}
                />

                <div
                    className="form-label form-check-label"
                    onClick={() => {
                        setFieldValue('rules', !values.rules);
                    }}
                >
                    {
                        tCheckout.rich('read_rules', {
                            link: (chunks) => {
                                if (rulesPage) {
                                    return (
                                        <Link
                                            href={`/${rulesPage.model_slug}`}
                                            className="underline"
                                            target="_blank"
                                        >
                                            {chunks}
                                        </Link>
                                    );
                                }

                                return (chunks);
                            }
                        })
                    }

                    <span className="text-danger"> *</span>
                </div>
            </div>

            <button
                type="button"
                onClick={submitForm}
                disabled={!isValid || isSubmitting}
                className="btn btn-teal mt-3 px-5 py-3 fw-bold w-100 rounded-pill btn btn-primary"
            >
                {tForm('buttons.send_order')}
            </button>
        </div>
    );
}

export default OrderInfo;