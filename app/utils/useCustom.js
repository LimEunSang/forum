import useSWR from "swr";

const fetcher = (url) => fetch(url).then((response) => response.json());

export const useCommentList = (parent) => {
  const { data, isLoading } = useSWR(
    `/api/comment/list?parent=${parent}`,
    fetcher
  );

  return {
    data,
    isLoading,
  };
};

export const useCommentCount = (parent) => {
  const { data, isLoading } = useSWR(
    `/api/comment/count?parent=${parent}`,
    fetcher
  );

  return {
    count: data,
    isLoading,
  };
};
