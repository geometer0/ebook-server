import { useState,useEffect } from 'react'
import './App.css'



function App() {
  const [pdfs, setPdfs] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000').then(res => res.json())
      .then(data => {
        setPdfs(data.pdfs);
      });
  }, []);

  return (
    <>
      <h1>Library</h1>
      <ul>
        {pdfs.map(pdf => (
          <li key={pdf}><a target="_blank" href={'pdfs/' + pdf}>{pdf.slice(0,-4)}</a></li>
        ))}
      </ul>
    </>
  )
}

export default App
