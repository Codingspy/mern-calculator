// client/src/App.js

import React, { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleClick = (value) => {
    if (value === 'C') {
      setInput('');
      setResult('');
    } else if (value === '=') {
      // We'll send input to backend later
      calculate(input);
    } else {
      setInput(input + value);
    }
  };

  const calculate = async (expression) => {
    try {
      const res = await fetch('https://mern-calculator-api.onrender.com/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expression }),
      });
      const data = await res.json();
      setResult(data.result);
    } catch (err) {
      setResult('Error');
    }
  };

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', 'C', '=', '+',
  ];

  return (
    <div className="container">
      <h2>MERN Calculator</h2>
      <div className="display">
        <input type="text" value={input} disabled />
        <div className="result">{result}</div>
      </div>
      <div className="buttons">
        {buttons.map((btn, idx) => (
          <button key={idx} onClick={() => handleClick(btn)}>
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
