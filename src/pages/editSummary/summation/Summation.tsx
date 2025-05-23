import { type DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import {
  SummationWrap,
  DateSelectBox,
  DateSelectBtn,
  SelectWrap,
  SummationContents,
  SummationSelect,
  SummationResult,
} from "./Summation.styles";
import { SingleDatePicker } from "@/components/DatePicker/SingleDatePicker";
import { useDateRange } from "../contents/ContentsHook";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useState } from "react";

export const Summation = () => {
  const { range, setRange, isPickerOpen, setIsPickerOpen, format } =
    useDateRange();

  const [viewData, setViewData] = useState<string>();

  const isDateSelected = range?.from;

  const formatSelectedDate = () => {
    if (!range?.from) return "";
    return format(range.from);
  };
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));

  return (
    <SummationWrap>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <DateSelectBox>
          <DateSelectBtn onClick={() => setIsPickerOpen((prev) => !prev)}>
            {isDateSelected ? formatSelectedDate() : "날짜 선택"}
          </DateSelectBtn>
        </DateSelectBox>
        {isPickerOpen && (
          <SelectWrap>
            <SingleDatePicker
              range={range}
              setRange={(newRange) => {
                setRange(newRange);
                if (newRange?.from) {
                  setIsPickerOpen(false);
                }
              }}
            />
            {/* <ButtonBox>
                    <SelectButton
                      onClick={() => {
                        setIsPickerOpen(false);
                      }}
                    >
                      확인
                    </SelectButton>
                  </ButtonBox> */}
          </SelectWrap>
        )}
        {/* <NavButton onClick={() => refetch()}>새로고침</NavButton> */}
      </div>
      {!isDateSelected && (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "#6c757d",
            fontSize: "16px",
            backgroundColor: "#f8f9fa",
            border: "1px dashed #dee2e6",
            borderRadius: "8px",
            margin: "20px 0",
          }}
        >
          날짜를 선택하면 해당 기간의 데이터를 확인할 수 있습니다.
        </div>
      )}
      {isDateSelected && (
        <SummationContents>
          <SummationSelect>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid size={2}>
                  <Item>size=8</Item>
                </Grid>
                <Grid size={10}>
                  <Item>size=4</Item>
                </Grid>
                <Grid size={12}>
                  <Item
                    style={{ maxHeight: "500px", overflowY: "auto" }}
                  ></Item>
                </Grid>
              </Grid>
            </Box>
          </SummationSelect>
          <SummationResult>2</SummationResult>
        </SummationContents>
      )}
    </SummationWrap>
  );
};
