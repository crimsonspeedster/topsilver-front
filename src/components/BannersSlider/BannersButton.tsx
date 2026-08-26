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
                className="position-absolute top-0 start-0 w-100 h-100 z-2"
                href={button.link}
            />
        )
    }

    return (
        <a
            rel="noopener noreferrer noindex"
            target="_blank"
            className="position-absolute top-0 start-0 w-100 h-100 z-2"
            href={button.link}
        />
    );
}

export default BannersButton;