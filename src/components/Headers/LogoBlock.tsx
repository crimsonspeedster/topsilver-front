import Link from "next/link";
import Image from "next/image";
import {usePathname} from "next/navigation";


type Props = {
    logo: string;
    className?: string;
};

const LogoBlock = (
    {
        logo,
        className,
    }: Props
) => {
    const pathname = usePathname();

    if (pathname === '/') {
        return (
            <div
                className={className}
            >
                <Image
                    src={logo}
                    alt="logo"
                    width="190"
                    height="41"
                    className="logo-img"
                />
            </div>
        );
    }

    return (
        <Link
            className={className}
            href="/"
        >
            <Image
                src={logo}
                alt="logo"
                width="95"
                height="20"
                className="logo-img"
            />
        </Link>
    );
}

export default LogoBlock;