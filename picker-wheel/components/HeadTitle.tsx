import React from "react";
import Head from "next/head";

interface HeadTitleProps {
    title: string;
    description: string;
}

const HeadTitle: React.FC<HeadTitleProps> = ({ title, description }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            {/* Ajoutez d'autres balises <meta>, <link>, etc. si nécessaire */}
        </Head>
    );
};

export default HeadTitle;
