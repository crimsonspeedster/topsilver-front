import Image from "next/image";


type Props = {
    title: string;
    image?: string | null;
};

const ContactsNavItem = (
    {
        title,
        image,
    }: Props
) => {
    return (
        <>
            {
                image &&
                <div>
                    <Image
                        src={image}
                        alt="logo"
                        className="object-fit-cover object-center"
                        width={24}
                        height={24}
                    />
                </div>
            }

            <div
                dangerouslySetInnerHTML={{
                    __html: title
                }}
            />
        </>
    )
};

export default ContactsNavItem;