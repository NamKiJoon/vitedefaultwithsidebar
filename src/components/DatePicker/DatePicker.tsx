// DatePicker.tsx
import { DayPicker } from "react-day-picker";
import type { DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface DatePickerProps {
  range: DateRange | undefined;
  setRange: (range: DateRange | undefined) => void;
}

export const DatePicker = ({ range, setRange }: DatePickerProps) => {
  const monthCaptionStyle = {
    borderBottom: "1px solid none",
    paddingBottom: "0.5em",
    backgroundColor: "none",
  };

  return (
    <div>
      <DayPicker
        mode="range"
        selected={range}
        onSelect={setRange}
        defaultMonth={new Date()}
        required
        className="custom-day-picker"
        styles={{ month_caption: monthCaptionStyle }}
        captionLayout="dropdown"
      />

      {range?.from && range?.to && (
        <p>
          선택된 날짜:
          <strong> {range.from.toLocaleDateString()} </strong> ~
          <strong> {range.to.toLocaleDateString()}</strong>
        </p>
      )}
    </div>
  );
};
