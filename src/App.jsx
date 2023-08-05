import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [inputCode, setInputCode] = useState('');
  const [convertedCode, setConvertedCode] = useState('');
  const [debugResponse, setDebugResponse] = useState('');
  const [codeCheckResponse, setCodeCheckResponse] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('Python');

  const handleConvert = async () => {
    try {
      const response = await fetch('https://converter-1ttl.onrender.com/code/converter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ language: selectedLanguage, payload: inputCode }),
      });

      if (response.ok) {
        const data = await response.json();
        // Clear other responses and set the converted code
        setDebugResponse('');
        setCodeCheckResponse('');
        setConvertedCode(data.textResponse);
      } else {
        throw new Error('Failed to convert the code.');
      }
    } catch (error) {
      console.error(error);
      setConvertedCode('Error: Failed to convert the code.');
    }
  };

  const handleDebug = async () => {
    try {
      const response = await fetch('https://converter-1ttl.onrender.com/code/debugging', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payload: inputCode }),
      });

      if (response.ok) {
        const data = await response.json();
        // Clear other responses and set the debug response
        setConvertedCode('');
        setCodeCheckResponse('');
        setDebugResponse(data.text);
      } else {
        throw new Error('Failed to debug the code.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCodeCheck = async () => {
    try {
      const response = await fetch('https://converter-1ttl.onrender.com/code/quality_check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payload: inputCode }),
      });

      if (response.ok) {
        const data = await response.json();
        // Clear other responses and set the code check response
        setConvertedCode('');
        setDebugResponse('');
        setCodeCheckResponse(data.text);
      } else {
        throw new Error('Failed to check code quality.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mainDiv">
      <h1>Code Converter</h1>
      <div className="app">
        <div className="code-input">
          <div className="toolbar">
            <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
              <option value="Python">Python</option>
              <option value="JavaScript">JavaScript</option>
              <option value="C++">C++</option>
              {/* Add more language options here */}
            </select>
            <button onClick={handleConvert}>Convert</button>
            <button onClick={handleDebug}>Debug</button>
            <button onClick={handleCodeCheck}>Code Checker</button>
          </div>
          <textarea
            placeholder="Enter your code here"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
          ></textarea>
        </div>
        <div className="code-output">
          {/* Show the converted code */}
          {convertedCode && <pre>{convertedCode}</pre>}
          {/* Show the debug response */}
          {debugResponse && <pre>{debugResponse}</pre>}
          {/* Show the code check response */}
          {codeCheckResponse && <pre>{codeCheckResponse}</pre>}
        </div>
      </div>
    </div>
  );
};

export default App;
