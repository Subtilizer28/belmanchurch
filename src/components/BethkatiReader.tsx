/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

interface BethkatiViewerProps {
  file: string;
  onClose: () => void;
}

pdfjs.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.min.mjs";

export default function BethkatiViewer({ file, onClose }: BethkatiViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  const goNext = () =>
    setPageNumber((prev) => (numPages && prev < numPages ? prev + 1 : prev));
  const goPrev = () => setPageNumber((prev) => (prev > 1 ? prev - 1 : prev));

  return (
    <div className="absolute flex justify-center backdrop-blur-sm">
      <button
        onClick={onClose}
        className="absolute -right-6 -top-6 text-2xl text-white"
      >
        ✖
      </button>
      <div className="flex flex-col items-center">
          <Document
            file={file}
            onLoadSuccess={(pdf) => setNumPages(pdf.numPages)}
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              width={300}
              height={500}
            />
          </Document>
        <div className="mt-4 flex gap-4">
          <button
            onClick={goPrev}
            disabled={pageNumber === 1}
            className="rounded bg-white p-2"
          >
            Prev
          </button>
          <span className="text-white">
            Page {pageNumber} of {numPages ?? "?"}
          </span>
          <button
            onClick={goNext}
            disabled={numPages === null || pageNumber === numPages}
            className="rounded bg-white p-2"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
