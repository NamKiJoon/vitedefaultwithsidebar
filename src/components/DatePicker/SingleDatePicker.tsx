import { DayPicker } from "react-day-picker";
import type { DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface DatePickerProps {
  range: DateRange | undefined;
  setRange: (range: DateRange | undefined) => void;
}

/**
 * 단일 날짜 선택을 위한 DatePicker 컴포넌트
 */
export const SingleDatePicker = ({ range, setRange }: DatePickerProps) => {
  const monthCaptionStyle = {
    borderBottom: "1px solid none",
    paddingBottom: "0.5em",
    backgroundColor: "none",
  };

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      setRange({ from: date, to: date });
    } else {
      setRange(undefined);
    }
  };

  return (
    <div>
      <DayPicker
        mode="single"
        selected={range?.from}
        onSelect={handleSelect}
        defaultMonth={new Date()}
        required
        className="custom-day-picker"
        styles={{ month_caption: monthCaptionStyle }}
        captionLayout="dropdown"
      />

      {range?.from && (
        <p>
          선택된 날짜:
          <strong> {range.from.toLocaleDateString()} </strong>
        </p>
      )}
    </div>
  );
};
