import React from "react";
import { PageWrap } from "@/components/PageWrap/PageWrap";
import PDFEditorApp from "@/components/PDFEditor/PdfEditorApp";

export const EditSummary: React.FC = () => {
  return (
    <PageWrap>
      <PDFEditorApp />
    </PageWrap>
  );
};

export default EditSummary;
