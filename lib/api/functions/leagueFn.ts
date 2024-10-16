import type { components } from "@/schemas/schema.d.ts"; // generated by openapi-typescript

type LeagueCreateRequest = components["schemas"]["LeagueCreateRequest"];
type LeagueCreateResponse = components["schemas"]["LeagueCreateResponse"];
type MonthLeaguesResponse = components["schemas"]["LeagueReadResponse"];

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

export const postLeagues = async (
  clubData: LeagueCreateRequest,
  clubId: number,
): Promise<LeagueCreateResponse> => {
  const response = await fetch(`${BASE_URL}/clubs/${clubId}/leagues`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(clubData),
  });
  if (!response.ok) {
    throw new Error("경기 생성에 실패했습니다.");
  }
  return response.json();
};

export const getMonthLeagues = async (
  clubId: number,
  date: string,
): Promise<MonthLeaguesResponse> => {
  const response = await fetch(
    `${BASE_URL}/clubs/${clubId}/leagues?date=${date}`,
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
