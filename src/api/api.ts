import axios from "axios";

// 기본 API 클라이언트 설정
const apiClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// 포스트 타입 정의
export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// 포스트 목록 가져오기
export const fetchPosts = async (): Promise<Post[]> => {
  try {
    const response = await apiClient.get<Post[]>("/posts", {
      // timeout: 3000, // 3초 타임아웃 설정
    });
    return response.data;
  } catch (error) {
    console.error("API 호출 실패:", error);
    throw error;
  }
};

// 앨범 목록 가져오기
export const albumPosts = async (): Promise<Post[]> => {
  try {
    const response = await apiClient.get<Post[]>("/albums", {
      // timeout: 3000, // 3초 타임아웃 설정
    });
    return response.data;
  } catch (error) {
    console.error("API 호출 실패:", error);
    throw error;
  }
};

// 단일 포스트 가져오기
export const fetchPostById = async (id: number): Promise<Post> => {
  const { data } = await apiClient.get<Post>(`/posts/${id}`);
  return data;
};

// 새 포스트 생성
export const createPost = async (post: Omit<Post, "id">): Promise<Post> => {
  const { data } = await apiClient.post<Post>("/posts", post);
  return data;
};

// 포스트 업데이트
export const updatePost = async (
  id: number,
  post: Partial<Post>
): Promise<Post> => {
  const { data } = await apiClient.put<Post>(`/posts/${id}`, post);
  return data;
};

// 포스트 삭제
export const deletePost = async (id: number): Promise<void> => {
  await apiClient.delete(`/posts/${id}`);
};

export default apiClient;
