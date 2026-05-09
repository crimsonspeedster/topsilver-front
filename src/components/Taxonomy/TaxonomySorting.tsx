import { Dropdown } from 'react-bootstrap';
import {SortObject} from "@interfaces/common";


type Props = {
    items: SortObject[],
    current: SortObject,
    handleSort: (
        item: SortObject,
    ) => void,
};

const TaxonomySorting = (
    {
        items,
        current,
        handleSort,
    }: Props
) => {
    return (
        <Dropdown>
            <Dropdown.Toggle
                className="btn d-flex align-items-center justify-content-between featurnBtn rounded-pill dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                {current.name}
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menu filter-dropdown">
                {
                    items.map(item => (
                        <Dropdown.Item
                            key={item.slug}
                            as='li'
                            className='cursor-pointer'
                            onClick={
                                () => handleSort(item)
                            }
                        >
                            {item.name}
                        </Dropdown.Item>
                    ))
                }
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default TaxonomySorting;