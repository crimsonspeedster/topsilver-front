import {ReactNode} from "react";

export type UserObject = {
    name: string,
    email: string,
}

export interface LayoutProps {
    children: ReactNode;
}