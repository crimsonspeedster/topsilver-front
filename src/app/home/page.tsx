import Header from "@src/components/Headers/Header";
import React from "react";
import FooterPage from "@src/components/Footer";
import HeadTitle from "@src/commonsections/HeadTitle";

const IndexPage = () => {
    return (
        <>
            <HeadTitle
                title="Home"
            />

            <Header />

            <main>
                <h1>HOME PAGE</h1>
            </main>

            <FooterPage />
        </>
    );
}

export default IndexPage;