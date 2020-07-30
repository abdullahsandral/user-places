
import React, { useState } from "react";
import { Document, Page } from "react-pdf";

const AllPages = props => {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  console.log(process.env.REACT_APP_ASSET_URL)
  return (
    <Document
      file={`${process.env.REACT_APP_ASSET_URL}/pdf2.pdf`}
      options={{ workerSrc: "/pdf.worker.js" }}
      onLoadSuccess={onDocumentLoadSuccess}
    >
      {Array.from(new Array(numPages), (el, index) => (
        <Page key={`page_${index + 1}`} pageNumber={index + 1} />
      ))}
    </Document>
  );
}

export default AllPages

