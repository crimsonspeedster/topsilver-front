import HeadTitle from "@src/commonsections/HeadTitle";
import React from "react";
import {getTranslations} from "next-intl/server";
import Header from "@src/components/Headers/Header";
import FooterPage from "@src/components/Footer";

const Dashboard = async () => {
    const t = await getTranslations('Common');

    return (
        <>
            <section>Dashboard</section>
        </>
    );
}

export default Dashboard;