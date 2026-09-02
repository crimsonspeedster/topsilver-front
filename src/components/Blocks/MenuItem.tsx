import Link from "next/link";
import {MenuElementObject} from "@interfaces/entities/menu";

const MenuItem = (props: MenuElementObject) => {
    return (
        <div className="dropdown-sub-column-item">
            {
                props.title &&
                <div className="dropdown-menu-title">{props.title}</div>
            }

            <ul className="sub-column-menu">
                {
                    props.menu_items.map(item =>
                        {
                            const LinkComponent = item.type === 'custom' ? 'a' : Link;

                            return (
                                <li key={item.id} className="nav-item">
                                    <LinkComponent
                                        className="nav-link"
                                        href={item.url}
                                    >
                                        {item.title}
                                    </LinkComponent>
                                </li>
                            )
                        }
                    )
                }
            </ul>
        </div>
    );
}

export default MenuItem;