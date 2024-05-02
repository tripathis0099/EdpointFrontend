import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useLocation } from 'react-router-dom';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ReadNote() {
  const location = useLocation();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const generateFileLink = () => {
    if (location.state && location.state.currentNote) {
      return `${process.env.REACT_APP_API_CALLBACK}/pdf?driveLink=${encodeURIComponent(location.state.currentNote)}`;
    }
    return null;
  };

  const fileLink = generateFileLink();

  useEffect(() => {
    // Reset page number when fileLink changes
    setPageNumber(1);
  }, [fileLink]);

  return (
    <div style={{ minHeight: '100vh',width:'100vw',overflowX:'auto' }}>
      {fileLink && (
        <div>
          <Document
            file={fileLink}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            {/* Render all pages using a loop */}
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                // Apply custom styles to remove unwanted space
                style={{ display: "block", margin: 0 }}
                renderTextLayer={false} // Disable text layer rendering
              />
            ))}
          </Document>
        </div>
      )}
      {!fileLink && (
        <p>No PDF file provided</p>
      )}
    </div>
  );
}

export default ReadNote;
