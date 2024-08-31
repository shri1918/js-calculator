import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [input, setInput] = useState('0');
  const [operation, setOperation] = useState('');
  const [lastChar, setLastChar] = useState('');
  const [evaluated, setEvaluated] = useState(false); 

  const handleClick = (value) => {
    if (value === 'clear') {
      setInput('0');
      setOperation('');
      setLastChar('');
      setEvaluated(false);
    } else if (value === '=') {
      try {
        const result = new Function(`return ${operation.replace(/x/g, '*').replace(/÷/g, '/')}`)();
        setInput(result.toString());
        setOperation(result.toString());
        setLastChar('=');
        setEvaluated(true);
      } catch {
        setInput('Error');
        setOperation('');
        setLastChar('');
      }
    } else if (value === '.') {
      if (!input.includes('.') && lastChar !== '=') {
        setInput(input + value);
        setOperation(operation + value);
        setLastChar('.');
      }
    } else if (['+', '-', '*', '/'].includes(value)) {
      if (lastChar === '=') {
        setOperation(input + value);
      } else if (['+', '-', '*', '/'].includes(lastChar)) {
        if (value === '-') {
          setOperation(operation + value);
        } else {
          if (operation.slice(-1) === '-') {
            const newOperation = operation.slice(0, -2) + value;
            setOperation(newOperation);
          } else {
            const newOperation = operation.slice(0, -1) + value;
            setOperation(newOperation);
          }
        }
      } else {
        setOperation(operation + value);
      }
      setInput(value);
      setLastChar(value);
    } else {
      if (lastChar === '=') {
        setInput(value);
        setOperation(value);
        setEvaluated(false);
      } else if (input === '0' && value === '0') {
        return;
      } else if (input === '0' && value !== '.') {
        setInput(value);
        setOperation(operation + value);
      } else {
        setInput(input + value);
        setOperation(operation + value);
      }
      setLastChar('number');
    }
  };
  

  return (
    <div id="calculator">
      <div id="display">{operation || input}</div>
      <div id="buttons">
        <button id="clear" onClick={() => handleClick('clear')}>C</button>
        <button id="divide" onClick={() => handleClick('/')}>&divide;</button>
        <button id="multiply" onClick={() => handleClick('*')}>&times;</button>
        <button id="subtract" onClick={() => handleClick('-')}>&minus;</button>
        <button id="add" onClick={() => handleClick('+')}>+</button>
        <button id="decimal" onClick={() => handleClick('.')}>.</button>
        <button id="equals" onClick={() => handleClick('=')}>=</button>
        <button id="zero" onClick={() => handleClick('0')}>0</button>
        <button id="one" onClick={() => handleClick('1')}>1</button>
        <button id="two" onClick={() => handleClick('2')}>2</button>
        <button id="three" onClick={() => handleClick('3')}>3</button>
        <button id="four" onClick={() => handleClick('4')}>4</button>
        <button id="five" onClick={() => handleClick('5')}>5</button>
        <button id="six" onClick={() => handleClick('6')}>6</button>
        <button id="seven" onClick={() => handleClick('7')}>7</button>
        <button id="eight" onClick={() => handleClick('8')}>8</button>
        <button id="nine" onClick={() => handleClick('9')}>9</button>
      </div>
    </div>
  );
};

export default Calculator;
