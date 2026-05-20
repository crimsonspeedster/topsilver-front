import { usePathname } from 'next/navigation';
import Link from "next/link";
import {useAuthStore} from "@src/store/client-store";
import React from "react";


type Props = {
    handleClick: () => void,
};

const LoginBadge = (
    {
        handleClick,
    }: Props
) => {
    const user = useAuthStore((state) => state.user);
    const pathname = usePathname();

    if (user || pathname.includes('dashboard')) {
        return (
            <Link
                className="d-md-block d-none"
                href="/dashboard/profile"
            >
                <i className="iccl iccl-user" />
            </Link>
        );
    }

    return (
        <button
            className="btn p-0 d-md-block d-none"
            onClick={handleClick}
        >
            <i className="iccl iccl-user" />
        </button>
    );
}

export default LoginBadge;