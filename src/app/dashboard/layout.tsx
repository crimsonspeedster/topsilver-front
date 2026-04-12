import {LayoutProps} from "@helpers/interfaces";
import Header from "@src/components/Headers/Header";
import React from "react";
import FooterPage from "@src/components/Footer";
import DashboardSidebar from "@src/components/Dashboard/DashboardSidebar";
import DashboardHeader from "@src/components/Dashboard/DashboardHeader";

const DashboardLayout = async ({ children }: LayoutProps) => {
    return (
        <>
            <Header />

            <main>
                <div className="dashboard">
                    <DashboardSidebar />

                    <div className="dashboard__main">
                        <DashboardHeader />

                        <div className="dashboard__content container-fluid">
                            {children}
                        </div>
                    </div>
                </div>
                {children}
            </main>

            <FooterPage />
        </>
    );
}

export default DashboardLayout;