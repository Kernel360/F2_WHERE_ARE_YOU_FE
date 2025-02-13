import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getLoginState, postLogout } from "../functions/SessionFn";

export const useGetLoginState = () => {
  return useQuery({
    queryKey: ["loginState"],
    queryFn: getLoginState,
  });
};

export const usePostLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loginState"] });
      queryClient.invalidateQueries({ queryKey: ["mySession"] });
    },
    onError: (error: Error) => alert(error),
  });
};
