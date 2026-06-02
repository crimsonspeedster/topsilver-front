import {ButtonObject} from "@interfaces/entities/blocks/banners-slider";
import Link from "next/link";


type Props = {
    button?: ButtonObject | null;
}

const BannersButton = (
    {
        button
    }: Props
) => {
    if (!button)
        return null;

    if (button.link_type === 'internal') {
        return (
            <Link
                className="button--banners rounded-0 min-w-150 min-h-45 d-inline-flex align-items-center justify-content-center fw-semibold px-4"
                href={button.link}
            >
                {button.title}
            </Link>
        )
    }

    return (
        <a
            rel="noopener noreferrer noindex"
            target="_blank"
            className="button--banners rounded-0 min-w-150 min-h-45 d-inline-flex align-items-center justify-content-center fw-semibold px-4"
            href={button.link}
        >
            {button.title}
        </a>
    );
}

export default BannersButton;