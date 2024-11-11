import type { components } from "@/schemas/schema.d.ts"; // generated by openapi-typescript
import type {
  GetLeagueDateResponse,
  GetLeagueDetailResponse,
  GetLeagueMonthResponse,
  PatchLeagueRequest,
  PatchLeagueResponse,
  PostLeagueRequest,
  PostLeagueResponse,
} from "@/types/leagueTypes";
import restClient from "../restClient";

type LeagueParticipantResponse =
  components["schemas"]["LeagueParticipantResponse"];
type LeagueParticipationCancelResponse =
  components["schemas"]["LeagueParticipationCancelResponse"];
type LeagueUpdateRequest = components["schemas"]["LeagueUpdateRequest"];
// type LeagueUpdateResponse = components["schemas"]["LeagueUpdateResponse"];

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

export const postLeague = async (
  postLeagueData: PostLeagueRequest,
  clubId: string,
): Promise<PostLeagueResponse> => {
  return restClient.post<PostLeagueResponse>(
    `/clubs/${clubId}/leagues`,
    postLeagueData,
  );
};

export const getMonthLeagues = async (
  clubId: number,
  date: string,
): Promise<GetLeagueMonthResponse> => {
  const response = await fetch(
    `${BASE_URL}/clubs/${clubId}/leagues/month?date=${date}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );
  if (!response.ok) {
    throw new Error("리그 정보를 확인할 수 없습니다.");
  }
  return response.json();
};

export const getDateLeague = async (
  clubId: string,
  date: string,
): Promise<GetLeagueDateResponse> => {
  const response = await fetch(
    `${BASE_URL}/clubs/${clubId}/leagues/date?date=${date}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );
  if (!response.ok) {
    throw new Error("리그 일별 정보를 확인할 수 없습니다.");
  }
  return response.json();
};

// TODO: props 타입 분리
export const getLeagueDetail = async (
  clubId: string,
  leagueId: string,
): Promise<GetLeagueDetailResponse> => {
  return restClient.get<GetLeagueDetailResponse>(
    `/clubs/${clubId}/leagues/${leagueId}`,
  );
};

export const postParticipateLeague = async (
  clubId: string,
  leagueId: string,
): Promise<LeagueParticipantResponse> => {
  const response = await fetch(
    `${BASE_URL}/clubs/${clubId}/leagues/${leagueId}/participation`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("경기 참여 신청에 실패했습니다. ");
  }

  return response.json();
};

export const deleteParticipateLeague = async (
  clubId: string,
  leagueId: string,
): Promise<LeagueParticipationCancelResponse> => {
  const response = await fetch(
    `${BASE_URL}/clubs/${clubId}/leagues/${leagueId}/participation`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("경기 참여 취소에 실패했습니다. ");
  }

  return response.json();
};

export const patchLeague = async (
  leagueData: PatchLeagueRequest,
  clubId: string,
  leagueId: string,
): Promise<PatchLeagueResponse> => {
  const response = await fetch(
    `${BASE_URL}/clubs/${clubId}/leagues/${leagueId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(leagueData),
    },
  );
  if (!response.ok) {
    throw new Error("경기 수정에 실패했습니다.");
  }
  return response.json();
};

export const deleteLeagues = async (
  clubId: string,
  leagueId: string,
): Promise<string> => {
  const response = await fetch(
    `${BASE_URL}/clubs/${clubId}/leagues/${leagueId}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    },
  );
  if (!response.ok) {
    throw new Error("경기 삭제에 실패했습니다.");
  }
  return response.json();
};
