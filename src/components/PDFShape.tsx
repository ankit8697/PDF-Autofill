import {Shape} from "react-konva";
import {PDFDocumentProxy} from "pdfjs-dist";

type Props = {
    pdfCanvas: HTMLCanvasElement;
    width: number;
    height: number;
};

export const getPdfImageCanvas = async (
    pdf: PDFDocumentProxy,
    page: number
): Promise<{
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
}> => {
    const pdfPage = await pdf.getPage(page);
    const viewport = pdfPage.getViewport({scale: 1});
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (context) {
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        const renderContext = {
            canvasContext: context,
            viewport,
        };
        await pdfPage.render(renderContext).promise;
    }
    return {
        canvas,
        width: viewport.width,
        height: viewport.height,
    };
};

export default function PDFShape({pdfCanvas, width, height}: Props) {
    if (!pdfCanvas) {
        console.warn("pdfCanvas is null or undefined");
        return null;
    }
    return (
        <Shape
            width={width}
            height={height}
            sceneFunc={(context, shape) => {
                // Reset the canvas state
                context.save();

                // Draw the canvas onto the context
                context.drawImage(pdfCanvas, 0, 0, width, height);

                // Complete the rendering process
                context.restore();
                context.fillStrokeShape(shape);
            }}
        />
    );
}