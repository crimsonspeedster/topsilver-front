type Props = {
    description: string|null,
};


const PDPTabDescription = (
    {
        description,
    }: Props
) => {
    return (
        <div
            className="text-black"
            dangerouslySetInnerHTML={{ __html: description ?? '' }}
        />
    );
}

export default PDPTabDescription;