import {LayoutProps} from "@interfaces/common/layouts";
import DashboardSidebar from "@src/components/Dashboard/DashboardSidebar";
import {getUserSSR} from "@lib/auth/getUser.server";
import {redirect} from "next/navigation";


const DashboardLayout = async ({ children }: LayoutProps) => {
    const user = await getUserSSR();

    if (!user) {
        redirect('/');
    }

    return (
        <div className="dashboard">
            <DashboardSidebar />

            <div className="dashboard__main">
                {children}
            </div>
        </div>
    );
}

export default DashboardLayout;