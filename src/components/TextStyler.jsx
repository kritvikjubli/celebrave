import React, { useState } from 'react';
import './TextStyler.css';

function App() {
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState({
    text: '',
    fontSize: 16,
    fontColor: '#000000',
    fontFamily: 'Arial',
  });
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const addEntry = () => {
    setEntries([...entries, currentEntry]);
    setCurrentEntry({
      text: '',
      fontSize: 16,
      fontColor: '#000000',
      fontFamily: 'Arial',
    });
    setHistory([]);
    setRedoStack([]);
  };

  const updateCurrentEntry = (newEntry) => {
    setHistory([...history, currentEntry]);
    setCurrentEntry(newEntry);
    setRedoStack([]);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const previousEntry = history.pop();
    setRedoStack([currentEntry, ...redoStack]);
    setCurrentEntry(previousEntry);
    setHistory([...history]);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const nextEntry = redoStack.shift();
    setHistory([...history, currentEntry]);
    setCurrentEntry(nextEntry);
    setRedoStack([...redoStack]);
  };

  const handleTextChange = (e) => updateCurrentEntry({ ...currentEntry, text: e.target.value });
  const handleFontSizeChange = (e) => updateCurrentEntry({ ...currentEntry, fontSize: e.target.value });
  const handleFontColorChange = (e) => updateCurrentEntry({ ...currentEntry, fontColor: e.target.value });
  const handleFontFamilyChange = (e) => updateCurrentEntry({ ...currentEntry, fontFamily: e.target.value });

  return (
    <>
    <div className="App">
      <div className='btns'>
      <button onClick={handleUndo} disabled={history.length === 0}>Undo</button>
      <button onClick={handleRedo} disabled={redoStack.length === 0}>Redo</button>
      </div>
      <textarea
        style={{
          fontSize: `${currentEntry.fontSize}px`,
          color: currentEntry.fontColor,
          fontFamily: currentEntry.fontFamily,
        }}
        value={currentEntry.text}
        onChange={handleTextChange}
        placeholder="Type your text here..."
      />
       <div className="controls">
        <label>
          Font Size:
          <input
            type="number"
            value={currentEntry.fontSize}
            onChange={handleFontSizeChange}
            min="10"
            max="100"
          />
        </label>
        <label>
          Font Color:
          <br/>
          <input type="color" value={currentEntry.fontColor} onChange={handleFontColorChange} />
        </label>
        <label>
          Font Family:
          <select value={currentEntry.fontFamily} onChange={handleFontFamilyChange}>
            <option value="Arial">Arial</option>
            <option value="Courier New">Courier New</option>
            <option value="Georgia">Georgia</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Verdana">Verdana</option>
          </select>
        </label>
      </div>
      <div className="buttons">
        <button onClick={addEntry}>Add Entry</button>
      </div>
    </div>
    <div className="entries">
        {entries.map((entry, index) => (
          <div
            key={index}
            style={{
              fontSize: `${entry.fontSize}px`,
              color: entry.fontColor,
              fontFamily: entry.fontFamily,
              marginBottom: '10px',
              border: '1px solid #ccc',
              padding: '10px',
              borderRadius: '4px',
            }}
          >
            {entry.text}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
