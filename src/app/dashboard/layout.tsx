import {LayoutProps} from "@interfaces/common/layouts";
import DashboardSidebar from "@src/components/Dashboard/DashboardSidebar";


const DashboardLayout = async ({ children }: LayoutProps) => {
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