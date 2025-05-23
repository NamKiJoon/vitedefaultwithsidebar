import { PageWrap } from "@/components/PageWrap/PageWrap";
import { PageGrid } from "@/components/PageGrid/PageGrid";
import {
  HomeText,
  HomeMemo,
  NotePad,
  TextFieldWrapper,
  SaveBtn,
  Title,
} from "./Home.styles";
import { Button } from "@mui/material";
import { TextField, Box } from "@mui/material";
import { useState } from "react";

export const Home = () => {
  const [memo, setMemo] = useState<string>("memo");

  return (
    <PageWrap>
      <PageGrid>
        <HomeText>
          <Title>노동신문 플랫폼</Title>
          <span>
            <strong>
              노동신문 관련하여 여러가지 인터페이스를 제공하도록 만들어짐.
            </strong>
          </span>
          <span>
            <strong>
              상단 메뉴에서 원하는 기능을 선택하거나, 아래 메모장에 현황을
              기록할 수 있음.
            </strong>
          </span>
          <span>
            1. 현황판: 기간을 선택하여 OCR값이
            mou_union_rodong_index&#40;기관협조, 기존 크롤링, 새 크롤링&#41;이
            얼마나 반영됐는지 확인 가능.
          </span>
          <span>
            2. 노동신문 수정: 날짜 선택 시, 해당되는 노동신문 기사들을 가져와
            Title or Content를 교체 할 수 있음.
          </span>
          <span>
            3. 이미지 관리: 노동신문 영역이 잘못 잡혔을 경우, 해당 기사를
            조회하여 영역 수정 가능.
          </span>
          <span>4. 관리자 전용: 노동신문 데이터 삭제 가능.</span>
          <span>5. 메모: 작업이나 특이사항 있을 시, 아래에 메모 기입</span>
          <span></span>
        </HomeText>
        <HomeMemo>
          <Title>저장된 메모</Title>
          <span>전체 메모 보기</span>
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { width: "100%" } }}
            noValidate
            autoComplete="off"
          >
            <TextField
              multiline
              rows={8}
              defaultValue={memo}
              variant="filled"
              disabled
              InputProps={{
                disableUnderline: true,
              }}
              sx={{
                "& .MuiInputBase-inputMultiline": {
                  resize: "vertical",
                  overflow: "auto",
                },
              }}
            />
          </Box>
        </HomeMemo>
        <NotePad>
          <Title>공용 메모장</Title>
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { width: "100%" } }}
            noValidate
            autoComplete="off"
          >
            <TextFieldWrapper>
              <span>작성자</span>
              <TextField
                multiline
                rows={1}
                defaultValue={memo}
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                }}
                sx={{
                  "& .MuiInputBase-inputMultiline": {
                    resize: "vertical",
                    overflow: "auto",
                  },
                  border: "1px solid #686868",
                  padding: "10px",
                }}
              />
            </TextFieldWrapper>
            <TextFieldWrapper>
              <span>메모내용</span>
              <TextField
                multiline
                rows={8}
                defaultValue={memo}
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                }}
                sx={{
                  "& .MuiInputBase-inputMultiline": {
                    resize: "vertical",
                    overflow: "auto",
                  },
                  border: "1px solid #686868",
                  padding: "10px",
                }}
              />
            </TextFieldWrapper>
          </Box>
        </NotePad>
        <SaveBtn>
          <Button variant="contained" style={{ backgroundColor: "#2a2d3e" }}>
            저장하기
          </Button>
        </SaveBtn>
      </PageGrid>
    </PageWrap>
  );
};
