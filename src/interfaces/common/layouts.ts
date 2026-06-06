import {ReactNode} from "react";


export interface LayoutProps {
    children: ReactNode;
}

export type TabProps = {
    title: string,
    slug: string,
    content: ReactNode,
}

export type LiqPayProps = {
    data: string;
    signature: string;
    url: string;
}