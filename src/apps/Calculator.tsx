import React from "react";

// A classic 4-function calculator. No eval — a small operand/operator state
// machine, so it behaves predictably.
type Op = "+" | "-" | "×" | "÷";

function compute(a: number, b: number, op: Op): number {
  switch (op) {
    case "+": return a + b;
    case "-": return a - b;
    case "×": return a * b;
    case "÷": return b === 0 ? NaN : a / b;
  }
}

export function Calculator() {
  const [display, setDisplay] = React.useState("0");
  const [acc, setAcc] = React.useState<number | null>(null);
  const [op, setOp] = React.useState<Op | null>(null);
  const [fresh, setFresh] = React.useState(true); // next digit starts a new number

  const inputDigit = (d: string) => {
    if (fresh) {
      setDisplay(d === "." ? "0." : d);
      setFresh(false);
      return;
    }
    if (d === "." && display.includes(".")) return;
    setDisplay(display.length < 12 ? display + d : display);
  };

  const applyOp = (nextOp: Op) => {
    const cur = parseFloat(display);
    if (acc === null) {
      setAcc(cur);
    } else if (op && !fresh) {
      const r = compute(acc, cur, op);
      setAcc(r);
      setDisplay(fmt(r));
    }
    setOp(nextOp);
    setFresh(true);
  };

  const equals = () => {
    if (op === null || acc === null) return;
    const cur = parseFloat(display);
    const r = compute(acc, cur, op);
    setDisplay(fmt(r));
    setAcc(null);
    setOp(null);
    setFresh(true);
  };

  const clearAll = () => {
    setDisplay("0");
    setAcc(null);
    setOp(null);
    setFresh(true);
  };

  const negate = () => setDisplay(fmt(parseFloat(display) * -1));
  const percent = () => setDisplay(fmt(parseFloat(display) / 100));

  const fmt = (n: number) => {
    if (!isFinite(n)) return "Error";
    return String(parseFloat(n.toPrecision(11)));
  };

  const Btn = ({ label, on, wide, kind }: { label: string; on: () => void; wide?: boolean; kind?: string }) => (
    <button
      className={"bapsos-calc-btn" + (wide ? " wide" : "") + (kind ? " " + kind : "")}
      onClick={on}
    >
      {label}
    </button>
  );

  return (
    <div className="bapsos-pad bapsos-calc">
      <div className="bapsos-calc-display">{display}</div>
      <div className="bapsos-calc-pad">
        <Btn label="C" on={clearAll} kind="fn" />
        <Btn label="±" on={negate} kind="fn" />
        <Btn label="%" on={percent} kind="fn" />
        <Btn label="÷" on={() => applyOp("÷")} kind="op" />
        <Btn label="7" on={() => inputDigit("7")} />
        <Btn label="8" on={() => inputDigit("8")} />
        <Btn label="9" on={() => inputDigit("9")} />
        <Btn label="×" on={() => applyOp("×")} kind="op" />
        <Btn label="4" on={() => inputDigit("4")} />
        <Btn label="5" on={() => inputDigit("5")} />
        <Btn label="6" on={() => inputDigit("6")} />
        <Btn label="-" on={() => applyOp("-")} kind="op" />
        <Btn label="1" on={() => inputDigit("1")} />
        <Btn label="2" on={() => inputDigit("2")} />
        <Btn label="3" on={() => inputDigit("3")} />
        <Btn label="+" on={() => applyOp("+")} kind="op" />
        <Btn label="0" on={() => inputDigit("0")} wide />
        <Btn label="." on={() => inputDigit(".")} />
        <Btn label="=" on={equals} kind="op" />
      </div>
    </div>
  );
}
