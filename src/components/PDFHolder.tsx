"use client";
import PDFShape, {getPdfImageCanvas} from "@/components/PDFShape";
import {getDocument, GlobalWorkerOptions} from "pdfjs-dist";
import {memo, useEffect, useState} from "react";
import {Layer, Stage} from "react-konva";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {Separator} from "@/components/ui/separator";

export default function PDFHolder() {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);

    const MemoizedPDFShape = memo(PDFShape);

    useEffect(() => {
        const getPdfData = async () => {
            GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";
            const src: string = "/AzAHP Practitioner Data Form FINAL v4 2021.pdf"; // Replace with your PDF source
            const pdf = await getDocument(src).promise;
            setPageCount(pdf.numPages);
            const {canvas, height, width} = await getPdfImageCanvas(pdf, pageNumber);
            setCanvas(canvas);
            setHeight(height);
            setWidth(width);
            setContainerWidth(width + 20);
        };
        getPdfData();
    }, [pageNumber]);

    return (
        canvas && (
            <div className="flex flex-col items-center border-2 border-gray-200 rounded-md p-3 my-5 mx-auto"
                 style={{width: containerWidth}}>
                <div style={{width}} className="flex flex-col items-center">
                    <Stage
                        width={width}
                        height={height}
                        className="will-change-transform"
                    >
                        <Layer>
                            <MemoizedPDFShape pdfCanvas={canvas} width={width} height={height}/>
                        </Layer>
                    </Stage>
                    <Separator/>
                    <Pagination className="mt-4">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => {
                                        if (pageNumber > 1) {
                                            setPageNumber(pageNumber - 1);
                                        }
                                    }}
                                />
                            </PaginationItem>
                            <PaginationItem>{pageNumber}</PaginationItem>
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => {
                                        if (pageNumber < pageCount) {
                                            setPageNumber(pageNumber + 1);
                                        }
                                    }}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        )
    );
}
