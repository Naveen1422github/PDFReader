import React, { useRef, useState, useEffect } from 'react';
import { Languages, Brain, BookMarked, ExternalLink } from 'lucide-react';


interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  selectedText: string;
  darkMode: boolean;
}

export function ContextMenu({ x, y, onClose, selectedText, darkMode }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [meaning, setMeaning] = useState<string | null>(null); // State to hold the meaning text
  const [translation, setTranslation] = useState<string | null>(null); // State to hold translation text
  const [showMenu, setShowMenu] = useState(true); // State to control visibility of the menu
  const [loading, setLoading] = useState(false); // State to control loading state
  const [loadingTranslation, setLoadingTranslation] = useState(false); // State for Translate loading
  const [showSaveOptions, setShowSaveOptions] = useState(false);
  const [saveType, setSaveType] = useState<'selection' | 'meaning' | null>(null);
  const [folders, setFolders] = useState<string[]>(["General", "Work", "Personal", "Important"]);




  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleTranslate = async () => {
    console.log('Translate:', selectedText);

    const prompt = `Translate the word "${selectedText}"`;

    // Hide context menu and show loading state
    setShowMenu(false);
    setLoadingTranslation(true);

    try {
      const response = await fetch("http://localhost:5000/translation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: prompt }),
      });

      const data = await response.json();
      console.log('Translation data:', data);

      if (data && data.data && Array.isArray(data.data) && data.data.length > 0) {
        const wordData = data.data[0]; // Extract first entry

        // Extracting meanings
        const meanings = wordData.meanings?.map((meaning) => {
          const definitions = meaning.definitions?.map((def) => def.definition).join("; ");

          const synonyms = meaning.synonyms?.join(", ") || "None";
          const antonyms = meaning.antonyms?.join(", ") || "None";

          return {
            partOfSpeech: meaning.partOfSpeech,
            definitions,
            synonyms,
            antonyms,
          };
        });

        setTranslation(meanings);
      } else {
        setTranslation([{ definitions: "No translation available", synonyms: "", antonyms: "" }]);
      }

      setLoadingTranslation(false);
    } catch (error) {
      console.error('Error fetching translation:', error);
      setLoadingTranslation(false);
      setTranslation([{ definitions: "Error fetching translation", synonyms: "", antonyms: "" }]);
    }
  };


  const handleGetMeaning = async () => {
    console.log('Get meaning:', selectedText);

    const prompt = `What is the meaning of the word "${selectedText}"?
    "direction: answer the question in simple and short way"`;

    // Immediately hide context menu and show loading state
    setShowMenu(false);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/meaning", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userText: prompt }),
      });

      let data = await response.json();
      console.log('Meaning data:', data);

      // Set the meaning to state
      setMeaning(data);
      setLoading(false);  // Stop loading when data is fetched

    } catch (error) {
      console.error('Error fetching meaning:', error);
      setLoading(false);  // Stop loading in case of error
    }
  };

  const handleSaveMeaning = () => {
    setSaveType('meaning');
    setShowSaveOptions(true);
  };

  const saveToFolder = async (folder: string) => {
    const payload = {
      text: saveType === 'selection' ? selectedText : meaning,
      folder,
    };
    console.log('Save to folder:', payload);
    try {
      const response = await fetch("http://localhost:5000/saveSelection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log("Saved successfully", data);
      setShowSaveOptions(false);
      setSaveType(null);
      onClose();
    } catch (error) {
      console.error("Error saving selection:", error);
    }
  };

  const handleSave = () => {
    setSaveType('selection');
    setShowSaveOptions(true);
    // console.log('Save:', selectedText);
    // onClose();
  };

  const handleSearch = () => {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(selectedText)}`, '_blank');
    onClose();
  };

  if (showSaveOptions) {
    return (
      <div
        className={`fixed z-50 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-lg py-2 min-w-[200px] max-w-[90vw]`}
        style={{ left: Math.min(x, window.innerWidth - 220), top: `${y}px` }}
      >
        <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
          <h3 className="font-semibold">Select Folder:</h3>
          {folders.map((folder) => (
            <button
              key={folder}
              onClick={() => saveToFolder(folder)}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {folder}
            </button>
          ))}
        </div>
      </div>
    );
  }


  // If meaning is available, show it
  if (meaning) {
    return (
      <div
        className={`fixed z-50 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-lg py-2 min-w-[200px] max-w-[30vw]`}
        style={{
          left: Math.min(x, window.innerWidth - 220),
          top: `${y}px`,
        }}
      >
        <div className="px-4 py-2 mt-2 text-sm text-gray-700 dark:text-gray-300">
          <div
            className="mt-2 max-h-[200px] overflow-y-auto"
            style={{ maxHeight: '200px', overflowY: 'auto' }}
          >
            <p>{meaning}</p>
          </div>

        </div>


        <button
          onClick={handleSaveMeaning}
          className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <BookMarked className="w-4 h-4" />
          Save Meaning
        </button>
      </div>
    );
  }

  // If translation is available, show it
  if (translation) {
    return (
      <div
        className={`fixed z-50 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-lg py-2 min-w-[200px] max-w-[90vw]`}
        style={{
          left: Math.min(x, window.innerWidth - 220),
          top: `${y}px`,
        }}
      >
        <div className="px-4 py-2 mt-2 text-sm text-gray-700 dark:text-gray-300">
          <h3 className="font-semibold">Translation:</h3>
          <div className="mt-2 max-h-[200px] overflow-y-auto">
            {loadingTranslation ? (
              <p className="text-gray-500">Fetching translation...</p>
            ) : (
              translation.length > 0 && translation?.data?.map((entry, index) => (
                <div key={index} className="mt-2">
                  <p><strong>Word:</strong> {entry.word}</p>
                  {entry.meanings?.map((meaning, mIndex) => (
                    <div key={mIndex} className="ml-2">
                      <p><strong>Part of Speech:</strong> {meaning.partOfSpeech}</p>
                      <p><strong>Definitions:</strong>
                        {meaning.definitions?.length > 0
                          ? meaning.definitions.map((def, dIndex) => (
                            <span key={dIndex}>{def.definition}{dIndex < meaning.definitions.length - 1 ? ", " : ""}</span>
                          ))
                          : "N/A"}
                      </p>

                      <p><strong>Synonyms:</strong> {meaning.synonyms?.join(", ") || "None"}</p>
                      <p><strong>Antonyms:</strong> {meaning.antonyms?.join(", ") || "None"}</p>
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }



  // If loading, show the loading spinner
  if (loading || loadingTranslation) {
    return (
      <div
        className={`fixed z-50 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-lg py-2 min-w-[200px] max-w-[90vw]`}
        style={{
          left: Math.min(x, window.innerWidth - 220),
          top: `${y}px`,
        }}
      >
        <div className="px-4 py-2 text-center text-sm text-gray-700 dark:text-gray-300">
          <h3 className="font-semibold">{loading ? 'Fetching Meaning...' : 'Translating...'}</h3>
          <div className="mt-4">
            <div className="animate-spin rounded-full border-t-2 border-blue-500 w-8 h-8 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  // If context menu is still shown, render it
  return (
    <div
      ref={menuRef}
      className={`fixed z-50 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-lg py-2 min-w-[200px] max-w-[90vw]`}
      style={{
        left: Math.min(x, window.innerWidth - 220),
        top: `${y}px`,
      }}
    >
      <button
        onClick={handleTranslate}
        className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <Languages className="w-4 h-4" />
        Translate
      </button>
      <button
        onClick={handleGetMeaning}
        className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <Brain className="w-4 h-4" />
        Get Meaning
      </button>
      <button
        onClick={handleSave}
        className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <BookMarked className="w-4 h-4" />
        Save Selection
      </button>
      <button
        onClick={handleSearch}
        className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <ExternalLink className="w-4 h-4" />
        Search on Google
      </button>
    </div>
  );
}



//   return (
//     <div
//       ref={menuRef}
//       className={`fixed z-50 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-lg py-2 min-w-[200px] max-w-[90vw]`}
//       style={{ left: Math.min(x, window.innerWidth - 220), top: `${y}px` }}
//     >
//       <button
//         onClick={handleSaveSelection}
//         className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700"
//       >
//         <BookMarked className="w-4 h-4" />
//         Save Selection
//       </button>
//       {meaning && (
//         <button
//           onClick={handleSaveMeaning}
//           className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700"
//         >
//           <BookMarked className="w-4 h-4" />
//           Save Meaning
//         </button>
//       )}
//     </div>
//   );
// }
