import {ContactItemBaseObject} from "@interfaces/entities/settings";
import Image from "next/image";


type Props = {
    item: ContactItemBaseObject;
};

const ContactsNavItem = (
    {
        item,
    }: Props
) => {
    return (
        <>
            {
                item.image &&
                <div>
                    <Image
                        src={item.image}
                        alt="logo"
                        className="object-fit-cover object-center"
                        width={24}
                        height={24}
                    />
                </div>
            }

            <div
                dangerouslySetInnerHTML={{
                    __html: item.title
                }}
            />
        </>
    )
};

export default ContactsNavItem;