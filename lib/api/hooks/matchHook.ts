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
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
    queryKey: ["matchDetail", leagueId, matchId, setNumber, matchStatus],
    queryFn: () => getSetScore(clubId, leagueId, matchId, setNumber),
    enabled: !(matchStatus !== "IN_PROGRESS"),
    refetchInterval: 5000, // 5초마다 재요청
  });
};

export const usePostMatches = (
  clubId: string,
  leagueId: string,
  onSuccess: () => void,
) => {
  const queryClient = useQueryClient();

  const mutationFn = () => postMatches(clubId, leagueId);

  const onSuccessCallback = () => {
    queryClient.invalidateQueries({ queryKey: ["matchesData"] });
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

  const mutationFn = (score: PatchMatchSetScoreRequest) =>
    patchSetScore(score, clubId, leagueId, matchId, setNumber);

  const onSuccessCallback = () => {
    queryClient.invalidateQueries({
      queryKey: ["matchesData", clubId, leagueId, matchId],
    });
    queryClient.invalidateQueries({ queryKey: ["leagueDetails", leagueId] });
  };
  return useMutationWithToast<
    PatchMatchSetScoreData,
    PatchMatchSetScoreRequest
  >(mutationFn, onSuccessCallback);
};
