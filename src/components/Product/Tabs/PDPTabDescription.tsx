type Props = {
    description?: string|null,
};


const PDPTabDescription = (
    {
        description,
    }: Props
) => {
    if (!description)
        return null;

    return (
        <div
            className="text-black"
            dangerouslySetInnerHTML={{ __html: description }}
        />
    );
}

export default PDPTabDescription;