"use client";
import Head from "next/head";
import React from "react";

const HeadTitle = ({ title }: any) => {
    return (
        <React.Fragment>
            <Head>
                <title>{title} | TopSilver</title>
            </Head>
        </React.Fragment>
    )
}
export default HeadTitle