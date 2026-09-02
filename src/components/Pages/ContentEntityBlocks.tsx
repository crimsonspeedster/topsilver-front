import {LayoutObject} from "@interfaces/entities/page";
import {contentEntityBlocksMap} from "@src/helpers";


type Props = {
    content: LayoutObject[];
}

const ContentEntityBlocks = (
    {
        content,
    }: Props
) => {
    return (
        <>
            {
                content.map((block, index) => {
                    const Component = contentEntityBlocksMap[block.layout];

                    if (!Component)
                        return null;

                    return (
                        <Component
                            key={`${block.layout}-${index}`}
                            {...block.attributes}
                        />
                    )
                })
            }
        </>
    );
}

export default ContentEntityBlocks;