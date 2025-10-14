(() => {
    const display = document.getElementById('number_input');
    const btnContainer = document.getElementById('button_container');
  
    let expr = '';
  
    const opSet = new Set(['+', '-', '*', '/']);
  
    function toDisplayString(s) {
      return s.replace(/\*/g, '×').replace(/\//g, '÷');
    }
  
    function updateDisplay() {
      display.value = expr === '' ? '0' : toDisplayString(expr);
    }
  
    function isOp(ch) {
      return opSet.has(ch);
    }
  
    function isDigit(ch) {
      return /\d/.test(ch);
    }
  
    function getLastNumberRange() {
      if (!expr) return null;
      let i = expr.length - 1;
      if (isOp(expr[i])) return null; 
      let j = i;
      while (j >= 0 && (isDigit(expr[j]) || expr[j] === '.')) j--;
      let start = j + 1;
  
      if (start - 1 >= 0 && expr[start - 1] === '-') {
        const k = start - 1;
        if (k === 0 || isOp(expr[k - 1])) {
          start = k; 
        }
      }
  
      const text = expr.slice(start, expr.length);
      if (text === '') return null;
      return { start, end: expr.length, text };
    }
  
    function appendDigit(d) {
      const last = getLastNumberRange();
      if (last && last.text === '0' && !last.text.includes('.')) {
        expr = expr.slice(0, last.start) + d;
      } else {
        expr += d;
      }
      updateDisplay();
    }
  
    function appendDot() {
      const last = getLastNumberRange();
      if (!last) {
        expr += '0.';
      } else {
        if (last.text.includes('.')) return;
        if (last.text === '-') {
          expr += '0.';
        } else {
          expr += '.';
        }
      }
      updateDisplay();
    }
  
    function handleOperator(op) {
      if (expr === '') {
        if (op === '-') {
          expr = '-';
          updateDisplay();
        }
        return;
      }
      if (isOp(expr[expr.length - 1])) {
        expr = expr.slice(0, -1) + op;
      } else {
        expr += op;
      }
      updateDisplay();
    }
  
    function clearAll() {
      expr = '';
      updateDisplay();
    }
  
    function deleteLast() {
      if (!expr) return;
      expr = expr.slice(0, -1);
      updateDisplay();
    }
  
    function toggleSign() {
      const last = getLastNumberRange();
      if (!last) {
        if (expr === '') {
          expr = '-';
        } else if (isOp(expr[expr.length - 1])) {
          expr += '-';
        }
        updateDisplay();
        return;
      }
  
      const { start, end, text } = last;
      if (text.startsWith('-')) {
        const newNum = text.slice(1);
        expr = expr.slice(0, start) + newNum;
      } else {
        expr = expr.slice(0, start) + '-' + text;
      }
      updateDisplay();
    }
  
    function applyPercent() {
      const last = getLastNumberRange();
      if (!last) return;
      const { start, end, text } = last;
      const num = parseFloat(text);
      if (Number.isNaN(num)) return;
      const replaced = String(num / 100);
      expr = expr.slice(0, start) + replaced;
      updateDisplay();
    }
  
    function evaluateExpr() {
      if (!expr) {
        updateDisplay();
        return;
      }
      while (expr.length > 0 && isOp(expr[expr.length - 1])) {
        expr = expr.slice(0, -1);
      }
      if (!expr) {
        updateDisplay();
        return;
      }
  
      if (!/^[0-9+\-*/().\s]+$/.test(expr)) {
        display.value = 'Error';
        expr = '';
        return;
      }
  
      try {
        const result = Function(`"use strict"; return (${expr})`)();
        if (result === Infinity || result === -Infinity || Number.isNaN(result)) {
          display.value = 'Error';
          expr = '';
        } else {
          expr = String(Number(result));
          updateDisplay();
        }
      } catch (e) {
        display.value = 'Error';
        expr = '';
      }
    }
  
    function mapButtonTextToOp(txt) {
      if (txt === '×' || txt.toLowerCase() === 'x' || txt === '*') return '*';
      if (txt === '÷' || txt === '/') return '/';
      if (txt === '+' || txt === '-') return txt;
      return null;
    }
  
    btnContainer.addEventListener('click', (ev) => {
      const t = ev.target;
      if (t.tagName !== 'BUTTON') return;
      const txt = t.innerText.trim();
  
      if (txt === 'C') { clearAll(); return; }
      if (txt === '<' || txt.toLowerCase() === 'del' || txt === '⌫') { deleteLast(); return; }
      if (txt === '+/-' || txt === '±') { 
        toggleSign(); 
        return; }
      if (txt === '%') { 
        applyPercent(); 
        return; }
      if (txt === '=' ) { 
        evaluateExpr(); 
        return; }
  
      const op = mapButtonTextToOp(txt);
      if (op !== null) { 
        handleOperator(op); return; }
  
      if (txt === '.') { 
        appendDot(); return; }
  
      if (/^[0-9]$/.test(txt)) { 
        appendDigit(txt); return; }
  
    });
  
    window.addEventListener('keydown', (e) => {
      const k = e.key;
      if (/^[0-9]$/.test(k)) { appendDigit(k); e.preventDefault(); return; }
      if (k === '.') { appendDot(); e.preventDefault(); return; }
      if (k === '+' || k === '-' || k === '*' || k === '/') { handleOperator(k); e.preventDefault(); return; }
      if (k === 'Enter' || k === '=') { evaluateExpr(); e.preventDefault(); return; }
      if (k === 'Backspace') { deleteLast(); e.preventDefault(); return; }
      if (k === 'Escape') { clearAll(); e.preventDefault(); return; }
      if (k === '%') { applyPercent(); e.preventDefault(); return; }
    });
  
    updateDisplay();
  })();