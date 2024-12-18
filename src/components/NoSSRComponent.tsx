"use client"
import dynamic from "next/dynamic";

type Props = {
    className?: string,
}

const NoSSRComponent = dynamic(() => import("./PDFHolder"), {
    ssr: false,
});

export default function PdfContainer({className}: Props) {
    return (
        <NoSSRComponent className={className}/>
    );
}