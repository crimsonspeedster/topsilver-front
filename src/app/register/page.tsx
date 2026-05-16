import {redirect} from "next/navigation";
import {getUserSSR} from "@lib/auth/getUser.server";
import UserRegister from "@src/components/User/UserRegister";
import {getCitiesSSR} from "@lib/getCities.server";


const Register = async () => {
    const user = await getUserSSR();

    if (user) {
        redirect('/');
    }

    const cities = await getCitiesSSR();

    return (
        <UserRegister
            cities={cities}
        />
    );
}

export default Register;