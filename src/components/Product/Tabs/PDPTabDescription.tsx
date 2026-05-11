type Props = {
    description: string,
}


const PDPTabDescription = (
    {
        description,
    }: Props
) => {
    return (
        <div
            className="text-black"
            dangerouslySetInnerHTML={{ __html: description }}
        />
    );
}

export default PDPTabDescription;