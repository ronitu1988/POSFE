import { Delete } from "lucide-react";

type PinPadProps = {
  pinLength: number;
  disabled: boolean;
  onDigit: (digit: string) => void;
  onBackspace: () => void;
  onClear: () => void;
};

const DIGITS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

export function PinPad({
  pinLength,
  disabled,
  onDigit,
  onBackspace,
  onClear,
}: PinPadProps) {
  return (
    <div className="pin-pad" aria-label="PIN keypad">
      {DIGITS.map((digit) => (
        <button
          key={digit}
          type="button"
          className="keypad-key"
          disabled={disabled || pinLength >= 4}
          onClick={() => onDigit(digit)}
        >
          {digit}
        </button>
      ))}

      <button
        type="button"
        className="keypad-key keypad-key--subtle"
        aria-label="Remove last PIN digit"
        disabled={disabled || pinLength === 0}
        onClick={onBackspace}
      >
        <Delete size={20} aria-hidden="true" />
      </button>

      <button
        type="button"
        className="keypad-key"
        disabled={disabled || pinLength >= 4}
        onClick={() => onDigit("0")}
      >
        0
      </button>

      <button
        type="button"
        className="keypad-key keypad-key--subtle keypad-key--clear"
        disabled={disabled || pinLength === 0}
        onClick={onClear}
      >
        Clear
      </button>
    </div>
  );
}