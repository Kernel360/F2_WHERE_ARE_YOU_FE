import { toast, useToast } from "@/hooks/use-toast";
import {
  getMatches,
  getSetScore,
  getSetsDetail,
  patchSetScore,
  postMatchStart,
  postMatches,
  postSetScore,
} from "@/lib/api/functions/matchFn";
import useQueryWithToast from "@/lib/api/hooks/useQueryWithToast";
import type {
  GetMatchesData,
  GetSetsDetailData,
  MatchStatusType,
  PatchMatchSetScoreData,
  PatchMatchSetScoreRequest,
  PatchMatchSetScoreResponse,
  PostMatchSetScoreData,
  PostMatchSetScoreRequest,
  PostMatchStartData,
  PostMatchesData,
} from "@/types/matchTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useMutationWithToast from "./useMutationWithToast";

export const useGetMatches = (clubId: string, leagueId: string) => {
  return useQueryWithToast<GetMatchesData>(["matchesData"], () =>
    getMatches(clubId, leagueId),
  );
};

export const useGetSetsDetail = (
  clubId: string,
  leagueId: string,
  matchId: string,
) => {
  return useQueryWithToast<GetSetsDetailData>(
    ["matchesData", clubId, leagueId, matchId],
    () => getSetsDetail(clubId, leagueId, matchId),
  );
};

export const useGetSetScore = (
  clubId: string,
  leagueId: string,
  matchId: string,
  setNumber: number,
  matchStatus: MatchStatusType,
) => {
  return useQuery({
    queryKey: ["matchDetail", leagueId, matchId, setNumber],
    queryFn: () => getSetScore(clubId, leagueId, matchId, setNumber),
    enabled: !(matchStatus !== "IN_PROGRESS"),
    refetchInterval: 5000, // 5초마다 재요청
  });
};

export const usePostMatches = (
  clubId: string,
  leagueId: string,
  matchId: string,
  onSuccess: () => void,
) => {
  const queryClient = useQueryClient();

  const mutationFn = () => postMatches(clubId, leagueId);

  const onSuccessCallback = () => {
    queryClient.invalidateQueries({
      queryKey: ["matchesData", clubId, leagueId, matchId],
    });
    queryClient.invalidateQueries({ queryKey: ["leagueDetails", leagueId] });
    onSuccess();
  };
  return useMutationWithToast<PostMatchesData, void>(
    mutationFn,
    onSuccessCallback,
  );
};

export const usePostMatchStart = (
  clubId: string,
  leagueId: string,
  matchId: string,
  // onSuccess: () => void,
) => {
  const queryClient = useQueryClient();

  const mutationFn = () => postMatchStart(clubId, leagueId, matchId);

  const onSuccessCallback = () => {
    queryClient.invalidateQueries({
      queryKey: ["matchesData", clubId, leagueId, matchId],
    });
    queryClient.invalidateQueries({ queryKey: ["leagueDetails", leagueId] });
    // onSuccess();
  };
  return useMutationWithToast<PostMatchStartData, void>(
    mutationFn,
    onSuccessCallback,
  );
};

export const usePostSetScore = (
  clubId: string,
  leagueId: string,
  matchId: string,
  setNumber: number,
) => {
  const queryClient = useQueryClient();

  const mutationFn = (score: PostMatchSetScoreRequest) =>
    postSetScore(score, clubId, leagueId, matchId, setNumber);

  const onSuccessCallback = () => {
    queryClient.invalidateQueries({
      queryKey: ["matchesData", clubId, leagueId, matchId],
    });
    queryClient.invalidateQueries({ queryKey: ["leagueDetails", leagueId] });
  };
  return useMutationWithToast<PostMatchSetScoreData, PostMatchSetScoreRequest>(
    mutationFn,
    onSuccessCallback,
  );
};

export const usePatchSetScore = (
  clubId: string,
  leagueId: string,
  matchId: string,
  setNumber: number,
) => {
  const queryClient = useQueryClient();

  return useMutation<
    PatchMatchSetScoreResponse,
    Error,
    PatchMatchSetScoreRequest,
    { previousMatchData?: PatchMatchSetScoreRequest }
  >({
    mutationFn: (score: PatchMatchSetScoreRequest) =>
      patchSetScore(score, clubId, leagueId, matchId, setNumber),
    onMutate: async (score) => {
      const previousMatchData =
        queryClient.getQueryData<PatchMatchSetScoreRequest>([
          "matchesData",
          clubId,
          leagueId,
          matchId,
        ]);

      // 낙관적 업데이트
      queryClient.setQueryData(
        ["matchesData", clubId, leagueId, matchId],
        (oldData: PatchMatchSetScoreRequest | undefined) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            ...score, // 새로운 점수로 덮어쓰기
          };
        },
      );

      return { previousMatchData }; // 롤백을 위해 이전 데이터 반환
    },
    onError: (err, score, context) => {
      const { toast } = useToast();
      toast({
        title: "점수 등록 실패",
        description: "점수 등록에 실패하였습니다",
        variant: "destructive",
      });

      if (context?.previousMatchData) {
        // 롤백
        queryClient.setQueryData(
          ["matchesData", clubId, leagueId, matchId],
          context.previousMatchData,
        );
      }
    },
    onSettled: () => {
      // 서버와 동기화
      queryClient.invalidateQueries({
        queryKey: ["matchesData", clubId, leagueId, matchId],
      });
      queryClient.invalidateQueries({ queryKey: ["leagueDetails", leagueId] });
    },
  });
};
