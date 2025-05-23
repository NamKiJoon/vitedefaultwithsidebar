import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { fetchPosts, type Post } from "@/api/api";

// 컴포넌트에서 필요한 데이터 타입 (필요한 필드만 포함)
export interface StatusPost {
  id: number;
  userId: number;
  title: string;
}

/**
 * Status 컴포넌트에서 사용할 포스트 데이터를 가져오는 React Query 훅
 */
export const useStatusPosts = (
  options?: Omit<UseQueryOptions<Post[]>, "queryKey" | "queryFn">
) => {
  const query = useQuery({
    queryKey: ["status-posts"],
    queryFn: fetchPosts,
    staleTime: 60000,
    gcTime: 300000,
    ...options,
  });

  // 필요한 필드만 추출하여 변환된 데이터
  const posts: StatusPost[] = query.data
    ? query.data.map((post) => ({
        id: post.id,
        userId: post.userId,
        title: post.title,
      }))
    : [];

  // 쿼리 객체와 가공된 데이터 함께 반환
  return {
    posts,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};

// 다른 Status 관련 API 훅들...
