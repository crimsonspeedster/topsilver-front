import {LayoutObject} from "@interfaces/entities/page";
import dynamic from "next/dynamic";
import {ComponentType} from "react";


type Props = {
    content: LayoutObject[];
}

type BlockLayout = LayoutObject['layout'];

const contentEntityBlocksMap: Record<BlockLayout, ComponentType<any>> = {
    Advantages: dynamic(() => import('@src/components/Blocks/Advantages')),
    Banners: dynamic(() => import('@src/components/Blocks/Banners')),
    CategoriesGrid: dynamic(() => import('@src/components/Blocks/CategoriesGrid')),
    ContentBlock: dynamic(() => import('@src/components/Blocks/ContentBlock')),
    InstagramGrid: dynamic(() => import('@src/components/Blocks/InstagramGrid')),
    ProductsGrid: dynamic(() => import('@src/components/Blocks/ProductsGrid')),
    ProductsGridWithTabs: dynamic(() => import('@src/components/Blocks/ProductsGridWithTabs')),
};

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

                    console.log(block);

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