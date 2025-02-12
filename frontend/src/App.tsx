
import React, { useState, useEffect } from 'react';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import { Header } from './components/Header/Header';
import { ContextMenu } from './components/ContextMenu/ContextMenu';
import { PDFUploader } from './components/PDFViewer/PDFUploader';
import { PDFViewer } from './components/PDFViewer/PDFViewer';
import { PDFControls } from './components/PDFViewer/PDFControls';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [searchText, setSearchText] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
    selectedText: string;
  }>({
    visible: false,
    x: 0,
    y: 0,
    selectedText: '',
  });

  useEffect(() => {
    function handleSelectionChange() {
      const selection = window.getSelection();
      if (selection && selection.toString().trim()) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        setContextMenu({
          visible: true,
          x: rect.left,
          y: rect.bottom + window.scrollY,
          selectedText: selection.toString().trim(),
        });
      } else {
        setContextMenu(prev => ({ ...prev, visible: false }));
      }
    }

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setScale(Math.min(window.innerWidth / 800, 1));
      } else {
        setScale(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDocumentLoadSuccess = (numPages: number) => {
    setNumPages(numPages);
    setPageNumber(1);
    setError(null);
  };

  const handleDocumentLoadError = (error: Error) => {
    console.error('Error loading PDF:', error);
    setError('Error loading PDF. Please make sure you have selected a valid PDF file.');
    setPdfFile(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError(null);
    if (file) {
      if (file.type === 'application/pdf') {
        setPdfFile(file);
        setPageNumber(1);
      } else {
        setError('Please select a valid PDF file.');
      }
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
    {contextMenu.visible && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          selectedText={contextMenu.selectedText}
          onClose={() => setContextMenu(prev => ({ ...prev, visible: false }))}
          darkMode={darkMode}
        />
    )}

      < Header
      darkMode = { darkMode }
      setDarkMode = { setDarkMode }
      searchText = { searchText }
      setSearchText = { setSearchText }
      mobileMenuOpen = { mobileMenuOpen }
      setMobileMenuOpen = { setMobileMenuOpen }
        />

  <main className="pt-16 pb-8 px-4">
    <div className="container mx-auto">
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {!pdfFile ? (
        <PDFUploader onFileChange={handleFileChange} />
      ) : (
        <>
          <PDFViewer
            file={pdfFile}
            scale={scale}
            darkMode={darkMode}
            isPageLoading={isPageLoading}
            onLoadSuccess={handleDocumentLoadSuccess}
            onLoadError={handleDocumentLoadError}
          />

        </>
      )}
    </div>
  </main>
    </div >
  );
}


export default App;