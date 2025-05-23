// 테이블 스타일 정의
export const tableStyles = {
  border: 0,
  "& .MuiDataGrid-cell:focus": {
    outline: "none",
  },
  "& .MuiDataGrid-columnHeader:focus": {
    outline: "none",
  },

  //  MUI의 모든 기본 스타일을 강제로 제거
  "& .MuiDataGrid-row": {
    // 기본 상태
    backgroundColor: "transparent !important",

    // MUI 선택 상태 완전 제거
    "&.Mui-selected": {
      backgroundColor: "transparent !important",
    },
    "&.Mui-selected:hover": {
      backgroundColor: "transparent !important",
    },
    "&.Mui-selected.Mui-hovered": {
      backgroundColor: "transparent !important",
    },

    // 기본 호버 스타일
    "&:hover": {
      backgroundColor: "#f5f5f5 !important",
    },

    //  커스텀 클래스들 - 우선순위 최고로
    "&.modified-row": {
      backgroundColor: "#fff8e1 !important",
      position: "relative",
      fontWeight: "bold !important",

      "&::after": {
        content: '""',
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: "4px",
        backgroundColor: "#ffc107",
        zIndex: 1,
      },

      "&:hover": {
        backgroundColor: "#fff3c4 !important", // modified 호버
      },

      // MUI 선택 상태여도 무시
      "&.Mui-selected": {
        backgroundColor: "#fff8e1 !important",
        "&:hover": {
          backgroundColor: "#fff3c4 !important",
        },
      },
    },

    "&.selected-row": {
      backgroundColor: "#e3f2fd !important",

      "&:hover": {
        backgroundColor: "#bbdefb !important", // selected 호버
      },

      // MUI 선택 상태여도 무시
      "&.Mui-selected": {
        backgroundColor: "#e3f2fd !important",
        "&:hover": {
          backgroundColor: "#bbdefb !important",
        },
      },
    },

    "&.even-row": {
      backgroundColor: "#fafafa !important",

      "&:hover": {
        backgroundColor: "#eeeeee !important", // even 호버
      },

      "&.Mui-selected": {
        backgroundColor: "#fafafa !important",
        "&:hover": {
          backgroundColor: "#eeeeee !important",
        },
      },
    },
  },

  //  셀 레벨에서도 완전 제거
  "& .MuiDataGrid-cell": {
    "&.Mui-selected": {
      backgroundColor: "transparent !important",
    },
  },

  //  체크박스나 기타 선택 요소들도 숨김
  "& .MuiDataGrid-checkboxInput": {
    display: "none !important",
  },

  "& .MuiDataGrid-columnHeaderCheckbox": {
    display: "none !important",
  },
};

export const previewTableStyles = {
  border: 0,
  "& .MuiDataGrid-cell:focus": {
    outline: "none",
  },
  "& .MuiDataGrid-columnHeader:focus": {
    outline: "none",
  },

  //  미리보기 테이블도 MUI 선택 스타일 제거
  "& .MuiDataGrid-row": {
    backgroundColor: "#f0fff0 !important", // 연한 녹색 배경
    position: "relative",

    "&::before": {
      content: '""',
      position: "absolute",
      left: "8px",
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: "16px",
      color: "#28a745",
      fontWeight: "bold",
      zIndex: 1,
    },

    "&:hover": {
      backgroundColor: "#e8f5e8 !important",
    },

    // MUI 선택 상태 제거
    "&.Mui-selected": {
      backgroundColor: "#f0fff0 !important",
      "&:hover": {
        backgroundColor: "#e8f5e8 !important",
      },
    },
  },

  "& .MuiDataGrid-cell": {
    "&.Mui-selected": {
      backgroundColor: "transparent !important",
    },
  },
};
