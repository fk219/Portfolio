"use client";

import { useState } from "react";

type Operator = "+" | "−" | "×" | "÷";

function calculate(left: number, right: number, operator: Operator) {
  switch (operator) {
    case "+":
      return left + right;
    case "−":
      return left - right;
    case "×":
      return left * right;
    case "÷":
      return right === 0 ? Number.NaN : left / right;
  }
}

function format(value: number) {
  if (!Number.isFinite(value)) return "Error";
  const rounded = Number.parseFloat(value.toPrecision(10));
  return String(rounded);
}

export function IOSCalculatorApp() {
  const [display, setDisplay] = useState("0");
  const [stored, setStored] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator | null>(null);
  const [waiting, setWaiting] = useState(false);
  const [expression, setExpression] = useState("");

  const inputDigit = (digit: string) => {
    if (waiting) {
      setDisplay(digit);
      setWaiting(false);
    } else {
      setDisplay((current) =>
        current === "0" ? digit : `${current}${digit}`.slice(0, 12),
      );
    }
  };

  const inputDecimal = () => {
    if (waiting) {
      setDisplay("0.");
      setWaiting(false);
      return;
    }
    if (!display.includes(".")) setDisplay(`${display}.`);
  };

  const clear = () => {
    setDisplay("0");
    setStored(null);
    setOperator(null);
    setWaiting(false);
    setExpression("");
  };

  const toggleSign = () => {
    setDisplay((current) =>
      current === "0"
        ? "0"
        : current.startsWith("-")
          ? current.slice(1)
          : `-${current}`,
    );
  };

  const percent = () => {
    const value = Number.parseFloat(display) / 100;
    setDisplay(format(value));
  };

  const chooseOperator = (next: Operator) => {
    const value = Number.parseFloat(display);
    if (stored === null) {
      setStored(value);
    } else if (operator && !waiting) {
      const result = calculate(stored, value, operator);
      setDisplay(format(result));
      setStored(result);
    }
    setOperator(next);
    setExpression(`${format(stored ?? value)} ${next}`);
    setWaiting(true);
  };

  const equals = () => {
    if (stored === null || !operator) return;
    const value = Number.parseFloat(display);
    const result = calculate(stored, value, operator);
    setExpression(`${format(stored)} ${operator} ${format(value)} =`);
    setDisplay(format(result));
    setStored(null);
    setOperator(null);
    setWaiting(true);
  };

  const buttons: Array<{
    label: string;
    tone?: "function" | "operator";
    wide?: boolean;
    onClick: () => void;
    ariaLabel?: string;
  }> = [
    { label: "AC", tone: "function", onClick: clear },
    { label: "±", tone: "function", onClick: toggleSign },
    { label: "%", tone: "function", onClick: percent },
    { label: "÷", tone: "operator", onClick: () => chooseOperator("÷") },
    { label: "7", onClick: () => inputDigit("7") },
    { label: "8", onClick: () => inputDigit("8") },
    { label: "9", onClick: () => inputDigit("9") },
    { label: "×", tone: "operator", onClick: () => chooseOperator("×") },
    { label: "4", onClick: () => inputDigit("4") },
    { label: "5", onClick: () => inputDigit("5") },
    { label: "6", onClick: () => inputDigit("6") },
    { label: "−", tone: "operator", onClick: () => chooseOperator("−") },
    { label: "1", onClick: () => inputDigit("1") },
    { label: "2", onClick: () => inputDigit("2") },
    { label: "3", onClick: () => inputDigit("3") },
    { label: "+", tone: "operator", onClick: () => chooseOperator("+") },
    { label: "0", wide: true, onClick: () => inputDigit("0") },
    { label: ".", onClick: inputDecimal },
    { label: "=", tone: "operator", onClick: equals },
  ];

  return (
    <div className="ios-calculator">
      <span className="ios-calculator__expression">{expression || "\u00A0"}</span>
      <output className="ios-calculator__display">{display}</output>
      <div className="ios-calculator__grid">
        {buttons.map((button, index) => (
          <button
            key={`${button.label}-${index}`}
            type="button"
            className={`ios-calc-button ${button.tone ? `is-${button.tone}` : ""} ${
              button.wide ? "is-wide" : ""
            }`}
            onClick={button.onClick}
            aria-label={button.ariaLabel ?? button.label}
          >
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
}
