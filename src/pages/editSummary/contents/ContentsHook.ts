import { useState, useEffect } from "react";
import { type DateRange } from "react-day-picker";
import { useStatusPosts, useStatusAlbums } from "./ContentsApi";

// 1. 날짜 관련 훅(이버달 조회)
const getCurrentMonthRange = (): DateRange => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return { from: start, to: end };
};

// 1. 날짜 관련 훅
export const useDateRange = () => {
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const format = (date: Date) => date.toLocaleDateString();
  return { range, setRange, isPickerOpen, setIsPickerOpen, format };
};

// 2. 데이터 관련 훅
export const useContentsData = (selectedDate?: Date) => {
  const [leftTableData, setLeftTableData] = useState<any[]>([]);
  const [rightTableData, setRightTableData] = useState<any[]>([]);
  const [selectedRawPost, setSelectedRawPost] = useState<any | null>(null);
  const [selectedCleanedPost, setSelectedCleanedPost] = useState<any | null>(
    null
  );

  const {
    posts: rawPostsFromApi,
    isLoading,
    isError,
    error,
  } = useStatusPosts();

  const { albums: rawAlbumsFromApi } = useStatusAlbums();

  useEffect(() => {
    if (
      rawPostsFromApi &&
      rawPostsFromApi.length > 0 &&
      leftTableData.length == 0
    ) {
      setLeftTableData(rawPostsFromApi);
    }
  }, [rawPostsFromApi]);

  useEffect(() => {
    if (
      rawAlbumsFromApi &&
      rawAlbumsFromApi.length > 0 &&
      rightTableData.length == 0
    ) {
      setRightTableData(rawAlbumsFromApi);
    }
  }, [rawAlbumsFromApi]);

  useEffect(() => {
    console.log("selectedDate ==>", selectedDate);
  }, [selectedDate]);

  return {
    leftTableData,
    rightTableData,
    selectedRawPost,
    selectedCleanedPost,
    isLoading,
    isError,
    error,
    setLeftTableData,
    setRightTableData,
    setSelectedRawPost,
    setSelectedCleanedPost,
  };
};

// 3. 테이블 선택 관련 훅
export const useTableSelection = (
  leftTableData: any[],
  rightTableData: any[],
  setSelectedRawPost: (post: any) => void,
  setSelectedCleanedPost: (post: any) => void,
  isEditing: boolean,
  setIsEditing: (editing: boolean) => void,
  setEditingData: (data: any) => void
) => {
  const [tableClickDisabled, setTableClickDisabled] = useState(false);
  const [isMatchingMode, setIsMatchingMode] = useState(true);

  // 매칭 모드 핸들러들
  const handleLeftClickMatching = (params: any) => {
    setTableClickDisabled(true);
    const selectedRow = leftTableData.find((post) => post.id === params.id);
    if (selectedRow) {
      setSelectedRawPost(selectedRow);
      const matchingRightData = rightTableData.find(
        (post) => post.id === params.id
      );
      setSelectedCleanedPost(matchingRightData || null);
      setTableClickDisabled(false);
      if (isEditing) {
        setIsEditing(false);
        setEditingData(null);
      }
    }
  };

  const handleRightClickMatching = (params: any) => {
    const selectedRow = rightTableData.find((post) => post.id === params.id);
    setTableClickDisabled(true);
    if (selectedRow) {
      setSelectedCleanedPost(selectedRow);
      const matchingRawPost = leftTableData.find(
        (post) => post.id === params.id
      );
      setSelectedRawPost(matchingRawPost || null);
      setTableClickDisabled(false);
      if (isEditing) {
        setIsEditing(false);
        setEditingData(null);
      }
    }
  };

  // 독립 모드 핸들러들
  const handleLeftClickIndependent = (params: any) => {
    setTableClickDisabled(true);
    const selectedRow = leftTableData.find((post) => post.id === params.id);
    if (selectedRow) {
      setSelectedRawPost(selectedRow);
      setTableClickDisabled(false);
      if (isEditing) {
        setIsEditing(false);
        setEditingData(null);
      }
    }
  };

  const handleRightClickIndependent = (params: any) => {
    const selectedRow = rightTableData.find((post) => post.id === params.id);
    setTableClickDisabled(true);
    if (selectedRow) {
      setSelectedCleanedPost(selectedRow);
      setTableClickDisabled(false);
      if (isEditing) {
        setIsEditing(false);
        setEditingData(null);
      }
    }
  };

  const handleLeftClick = isMatchingMode
    ? handleLeftClickMatching
    : handleLeftClickIndependent;
  const handleRightClick = isMatchingMode
    ? handleRightClickMatching
    : handleRightClickIndependent;

  const toggleMatchingMode = () => {
    setIsMatchingMode(!isMatchingMode);
    if (!isMatchingMode) {
      setSelectedRawPost(null);
      setSelectedCleanedPost(null);
    }
  };

  return {
    tableClickDisabled,
    handleLeftClick,
    handleRightClick,
    isMatchingMode,
    toggleMatchingMode,
  };
};

// 4. 편집 관련 훅
export const useDataEditor = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingData, setEditingData] = useState<any | null>(null);

  const startTitleEdit = (selectedRawPost: any, selectedCleanedPost: any) => {
    if (selectedCleanedPost && selectedRawPost) {
      setIsEditing(true);
      setEditingData({
        ...selectedRawPost,
        title: selectedCleanedPost.title,
        body: selectedRawPost.body,
      });
    }
  };

  const startBodyEdit = (selectedRawPost: any, selectedCleanedPost: any) => {
    if (selectedCleanedPost && selectedRawPost) {
      setIsEditing(true);
      setEditingData({
        ...selectedRawPost,
        title: selectedRawPost.title,
        body: selectedCleanedPost.body,
      });
    }
  };

  const startAllEdit = (selectedRawPost: any, selectedCleanedPost: any) => {
    if (selectedCleanedPost && selectedRawPost) {
      setIsEditing(true);
      setEditingData({
        ...selectedRawPost,
        title: selectedCleanedPost.title,
        body: selectedCleanedPost.body,
      });
    }
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditingData(null);
  };

  const handleEditChange = (field: string, value: string) => {
    if (editingData) {
      setEditingData({ ...editingData, [field]: value });
    }
  };

  return {
    isEditing,
    editingData,
    setIsEditing,
    setEditingData,
    startTitleEdit,
    startBodyEdit,
    startAllEdit,
    cancelEditing,
    handleEditChange,
  };
};

// 5. 미리보기 관련 훅
export const usePreviewData = (
  leftTableData: any[],
  rightTableData: any[],
  setLeftTableData: (data: any[]) => void,
  setRightTableData: (data: any[]) => void,
  selectedRawPost: any,
  selectedCleanedPost: any,
  setSelectedRawPost: (post: any) => void,
  setSelectedCleanedPost: (post: any) => void
) => {
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean | null>(null);

  const applyToPreview = (editingData: any) => {
    if (editingData) {
      const existingIndex = previewData.findIndex(
        (item) => item.id === editingData.id
      );
      if (existingIndex >= 0) {
        const updatedPreviewData = [...previewData];
        updatedPreviewData[existingIndex] = { ...editingData };
        setPreviewData(updatedPreviewData);
      } else {
        setPreviewData([...previewData, { ...editingData }]);
      }
    }
  };

  const removeFromPreview = (id: number) => {
    setPreviewData(previewData.filter((item) => item.id !== id));
  };

  const saveAllChanges = async () => {
    if (previewData.length === 0) return;
    setIsSaving(true);
    setSaveSuccess(null);

    try {
      console.log("저장할 데이터들:", previewData);
      setSaveSuccess(true);

      // 로컬 데이터 업데이트 로직...
      setTimeout(() => {
        setSaveSuccess(null);
        setPreviewData([]);
      }, 2000);
    } catch (error) {
      setSaveSuccess(false);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    previewData,
    isSaving,
    saveSuccess,
    applyToPreview,
    removeFromPreview,
    saveAllChanges,
  };
};
