import type { components } from "@/schemas/schema.d.ts"; // generated by openapi-typescript

export type GetClubListResponse =
  components["schemas"]["CommonResponseCustomPageResponseClubCardResponse"];
export type GetClubListData =
  components["schemas"]["CustomPageResponseClubCardResponse"];
export type GetPopularClubListResponse =
  components["schemas"]["CommonResponseListClubCardResponse"];
export type GetPopularClubListData = components["schemas"]["ClubCardResponse"];
export type GetClubDetailsResponse =
  components["schemas"]["CommonResponseClubDetailsResponse"];
export type GetClubDetailData = components["schemas"]["ClubDetailsResponse"];

export type PostClubRequest = components["schemas"]["ClubCreateRequest"];
export type PostClubResponse =
  components["schemas"]["CommonResponseClubCreateResponse"];

export type PatchClubRequest = components["schemas"]["ClubUpdateRequest"];
export type PatchClubResponse =
  components["schemas"]["CommonResponseClubUpdateResponse"];

export type ClubParams = {
  page: number;
  size: number;
  sort: string;
};
