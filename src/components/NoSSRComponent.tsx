"use client"
import dynamic from "next/dynamic";

const NoSSRComponent = dynamic(() => import("./PDFHolder"), {
    ssr: false,
});

export default function PdfContainer() {
    return (
        <NoSSRComponent/>
    );
}