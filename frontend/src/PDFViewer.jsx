import { useState, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist';


function PDFViewer({ url }) {
  const [pdf, setPdf] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  
  useEffect(() => {
    const loadPDF = async () => {
      try {
        const loadedPdf = await pdfjsLib.getDocument(url).promise;
        setPdf(loadedPdf);
      } catch (error) {
        console.error('Error loading PDF:', error);
      }
    };
    loadPDF();
  }, [url]);

  useEffect(() => {
    if (!pdf) return;
    
    const renderPage = async () => {
      const page = await pdf.getPage(pageNum);
      const canvas = document.getElementById('pdf-canvas');
      const context = canvas.getContext('2d');
      
      const viewport = page.getViewport({ scale: 1.0 });
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      try {
        await page.render(renderContext).promise;
        
        const checkRender = () => {
          if (context.getImageData(0, 0, canvas.width, canvas.height).data.some(x => x !== 0)) {
            return;
          }
          page.render(renderContext);
        };
        
        setTimeout(checkRender, 100);
      } catch (error) {
        page.render(renderContext);
      }
    };
    
    renderPage();
  }, [pdf, pageNum]);

  return (
    <div>
      <canvas id="pdf-canvas"></canvas>
      <div>
        <button onClick={() => setPageNum(p => Math.max(1, p - 1))}>Previous</button>
        <button onClick={() => setPageNum(p => Math.min(pdf?.numPages || 1, p + 1))}>Next</button>
      </div>
    </div>
  );
}

export default PDFViewer;