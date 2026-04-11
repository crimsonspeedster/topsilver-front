import {LayoutProps} from "@helpers/interfaces";

const DashboardLayout = async ({ children }: LayoutProps) => {
    return (
        <>
            <header>
                Header
            </header>

            <main>
                {children}
            </main>

            <footer>
                Footer
            </footer>
        </>
    );
}

export default DashboardLayout;