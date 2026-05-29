import {ContactItemObject} from "@interfaces/entities/settings";
import Link from "next/link";
import ContactsNavItem from "@src/components/Footer/ContactsNavItem";


type Props = {
    contacts: ContactItemObject[];
};

const ContactsNav = (
    {
        contacts,
    }: Props
) => {
    return (
        <div className="contacts-nav">
            {
                contacts.map((item, index) => {
                    if (item.type === 'link') {
                        return (
                            <Link
                                key={index}
                                className="d-flex align-items-start text-muted gap-2"
                                href={item.link}
                            >
                                <ContactsNavItem
                                    item={item}
                                />
                            </Link>
                        );
                    }

                    return (
                        <div
                            key={index}
                            className="d-flex align-items-start text-muted gap-2"
                        >
                            <ContactsNavItem
                                item={item}
                            />
                        </div>
                    );
                })
            }
        </div>
    );
};

export default ContactsNav;