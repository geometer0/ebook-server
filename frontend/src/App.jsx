import { useState, useEffect } from 'react'
import PDFViewer from './PDFViewer'
import './App.css'
const backend = 'http://192.168.1.183:3000/'

function App() {
  const [pdfs, setPdfs] = useState([]);
  const [selectedPDF, setSelectedPDF] = useState(null);

  useEffect(() => {
    fetch(backend)
      .then(res => res.json())
      .then(data => setPdfs(data.pdfs))
      .catch(err => console.error('Error fetching PDFs:', err));
  }, []);

  if (selectedPDF) {
    const encodedPdfUrl = backend + 'pdfs/' + encodeURIComponent(selectedPDF);
    return (
      <div>
        <button onClick={() => setSelectedPDF(null)}>← Back to Library</button>
        <PDFViewer url={encodedPdfUrl} />
      </div>
    );
  }

  return (
    <>
      <h1>Library</h1>
      <ul>
        {pdfs.map((pdf, index) => (
          <li key={index}>
            <button 
              onClick={(e) => {
                e.preventDefault();
                setSelectedPDF(pdf);
              }}
            >
              {pdf}
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
