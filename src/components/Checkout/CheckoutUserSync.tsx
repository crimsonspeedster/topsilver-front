import {useAuthStore} from "@src/store/client-store";
import {useFormikContext} from "formik";
import {useEffect} from "react";
import {getUserFormData} from "@src/helpers";
import {CheckoutFormValues} from "@interfaces/layouts/checkoutForm";


const CheckoutUserSync = () => {
    const user = useAuthStore((state) => state.user);

    const {
        values,
        setFieldValue,
    } = useFormikContext<CheckoutFormValues>();

    useEffect(() => {
        if (!user) {
            return;
        }

        const userData = getUserFormData(user);

        Object.entries(userData).forEach(([key, value]) => {
            const currentValue = values[key as keyof typeof values];

            if (!currentValue && value) {
                setFieldValue(key, value, false);
            }
        });
    }, [user]);

    return null;
};

export default CheckoutUserSync;