import Link from "next/link";
import ContactsNavItem from "@src/components/Footer/ContactsNavItem";
import {ContactItemLinkLayoutObject, ContactItemTextLayoutObject} from "@interfaces/entities/blocks/contact-item";


type Props = {
    contacts: (ContactItemTextLayoutObject | ContactItemLinkLayoutObject)[];
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
                    if (item.layout  === 'ContactItemLink') {
                        return (
                            <Link
                                key={index}
                                className="d-flex align-items-start text-muted gap-2"
                                href={item.attributes.link}
                            >
                                <ContactsNavItem
                                   title={item.attributes.title}
                                   image={item.attributes.image}
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
                                title={item.attributes.title}
                                image={item.attributes.image}
                            />
                        </div>
                    );
                })
            }
        </div>
    );
};

export default ContactsNav;