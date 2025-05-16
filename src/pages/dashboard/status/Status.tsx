import { useState } from "react";
import { type DateRange } from "react-day-picker";
import { DatePicker } from "@/components/DatePicker/DatePicker";
import "react-day-picker/dist/style.css";
import {
  StatusWrap,
  SelectWrap,
  SelectButton,
  ButtonBox,
} from "./Status.styles";
import { DataTableWrap } from "./Status.styles";

const getCurrentMonthRange = (): DateRange => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return { from: start, to: end };
};

export const Status = () => {
  const [range, setRange] = useState<DateRange | undefined>(
    getCurrentMonthRange()
  );
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const format = (date: Date) => date.toLocaleDateString();

  return (
    <StatusWrap>
      <button
        onClick={() => setIsPickerOpen((prev) => !prev)}
        style={{
          padding: "8px 16px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        {range?.from && range?.to
          ? `${format(range.from)} ~ ${format(range.to)}`
          : "날짜 선택"}
      </button>

      {isPickerOpen && (
        <SelectWrap
          style={{
            marginTop: "12px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "12px",
            backgroundColor: "#2a2d3e",
            color: "#fff",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            position: "absolute",
            top: "15%",
            left: "30px",
            zIndex: 1000,
          }}
        >
          <DatePicker range={range} setRange={setRange} />
          <ButtonBox>
            <SelectButton
              onClick={() => {
                setIsPickerOpen(false);
                console.log("선택된 날짜", range);
              }}
            >
              확인
            </SelectButton>
          </ButtonBox>
        </SelectWrap>
      )}

      <DataTableWrap>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "1rem",
          }}
        >
          <thead>
            <tr>
              <th style={{ padding: "8px", borderBottom: "1px solid #ccc" }}>
                날짜
              </th>
              <th style={{ padding: "8px", borderBottom: "1px solid #ccc" }}>
                상태
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }, (_, i) => (
              <tr key={i}>
                <td style={{ padding: "8px", borderBottom: "1px solid #ccc" }}>
                  {new Date(2023, 9, i + 1).toLocaleDateString()}
                </td>
                <td style={{ padding: "8px", borderBottom: "1px solid #ccc" }}>
                  상태 {i + 1}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTableWrap>
    </StatusWrap>
  );
};
