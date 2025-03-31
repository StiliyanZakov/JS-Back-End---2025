import React, { useState, useEffect } from 'react';
import './Calculator.css';

function Calculator() {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([]);
    const [theme, setTheme] = useState('light');

    // Handle button clicks
    const handleClick = (value) => {
        setInput((prev) => prev + value);
    };

    // Handle calculation
    const handleCalculate = () => {
        try {
            const result = eval(input).toString();  // Avoid eval in production
            setHistory((prev) => [...prev, `${input} = ${result}`]);
            setInput(result);
        } catch (error) {
            setInput('Error');
        }
    };

    // Handle backspace
    const handleBackspace = () => {
        setInput((prev) => prev.slice(0, -1));
    };

    // Clear input
    const handleClear = () => {
        setInput('');
    };

    // Toggle Theme
    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    // Keyboard support
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (/[0-9+\-*/.]/.test(e.key)) {
                handleClick(e.key);
            } else if (e.key === 'Enter') {
                handleCalculate();
            } else if (e.key === 'Backspace') {
                handleBackspace();
            } else if (e.key === 'Escape') {
                handleClear();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [input]);

    return (
        <div className={`calculator ${theme}`}>
            <h1>Calculator</h1>
            <button className="theme-toggle" onClick={toggleTheme}>
                Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
            </button>

            <input type="text" value={input} readOnly />

            <div className="buttons">
                {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'].map((btn) => (
                    <button
                        key={btn}
                        onClick={() => (btn === '=' ? handleCalculate() : handleClick(btn))}
                        className={btn === '=' ? 'equal' : ''}
                        data-operator={['/', '*', '-', '+'].includes(btn) ? 'true' : undefined}
                    >
                        {btn}
                    </button>
                ))}
                <button onClick={handleBackspace} className="backspace">←</button>
                <button onClick={handleClear} className="clear">C</button>
            </div>

            <div className="history">
                <h2>Calculation History</h2>
                <ul>
                    {history.slice(-5).map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Calculator;
