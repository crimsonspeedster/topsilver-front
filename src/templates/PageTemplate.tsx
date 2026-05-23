import {PageObject} from "@interfaces/entities/page";


type Props = {
    page: PageObject,
}

const PageTemplate = (
    {
        page,
    }: Props
) => {
    return (
        <p>Page</p>
    );
}

export default PageTemplate;