export type ErrorCode =
  | "BAD_REQUEST"
  | "INVALID_PARAMETER"
  | "INVALID_RESOURCE"
  | "MISSING_PARAMETER"
  | "LIMIT_EXCEEDED"
  | "OUT_OF_RANGE"
  | "FILE_NOT_EXIST"
  | "VALIDATION_ERROR"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "ACCESS_DENIED"
  | "LIMIT_EXCEEDED_403"
  | "OUT_OF_RANGE_403"
  | "NOT_FOUND"
  | "JWT_COOKIE_NOT_FOUND"
  | "RESOURCE_NOT_EXIST"
  | "MEMBER_NOT_EXIST"
  | "CLUB_NOT_EXIST"
  | "LEAGUE_NOT_EXIST"
  | "BRACKET_NOT_EXIST"
  | "MATCH_NOT_EXIST"
  | "SET_NOT_EXIST"
  | "MEMBER_NOT_JOINED_CLUB"
  | "CLUB_MEMBER_NOT_EXIST"
  | "MATCH_DETAILS_NOT_EXIST"
  | "IMAGE_FILE_NOT_FOUND"
  | "CONFLICT"
  | "ALREADY_EXIST"
  | "CLUB_MEMBER_ALREADY_EXIST"
  | "LEAGUE_RECRUITING_ALREADY_COMPLETED"
  | "CLUB_MEMBER_ALREADY_OWNER"
  | "RESOURCE_ALREADY_EXIST"
  | "CLUB_NAME_ALREADY_EXIST"
  | "LEAGUE_ALREADY_EXIST"
  | "MATCH_ALREADY_EXIST"
  | "MEMBER_ALREADY_JOINED_CLUB"
  | "MEMBER_ALREADY_APPLY_CLUB"
  | "LEAGUE_ALREADY_PARTICIPATED"
  | "LEAGUE_NOT_PARTICIPATED"
  | "LEAGUE_PARTICIPATION_ALREADY_CANCELED"
  | "CLUB_MEMBER_ALREADY_BANNED"
  | "LEAGUE_ALREADY_CANCELED"
  | "LEAGUE_AT_LESS_THAN_THREE_HOUR_INTERVAL"
  | "CLUB_MEMBER_OWNER_PROTECT"
  | "LEAGUE_ALREADY_CANCELED"
  | "LEAGUE_AT_LESS_THAN_THREE_HOUR_INTERVAL"
  | "CLUB_MEMBER_OWNER_PROTECT"
  | "DELETED"
  | "INVALID_PLAYER_COUNT"
  | "LEAGUE_RECRUITING_MUST_BE_COMPLETED_WHEN_BRACKET_GENERATION"
  | "INSUFFICIENT_TIER"
  | "ONGOING_AND_UPCOMING_LEAGUE_CANNOT_BE_PAST"
  | "RECRUITMENT_END_DATE_AFTER_LEAGUE_START"
  | "PLAYER_LIMIT_COUNT_DECREASED_NOT_ALLOWED"
  | "PLAYER_LIMIT_COUNT_MUST_BE_MULTIPLE_WHEN_DOUBLES_MATCH"
  | "PLAYER_LIMIT_COUNT_MUST_BE_MORE_THAN_FOUR"
  | "LEAGUE_OWNER_CANNOT_CANCEL_LEAGUE_PARTICIPATION"
  | "LEAGUE_CANNOT_BE_CANCELED_WHEN_IS_NOT_RECRUITING"
  | "LEAGUE_PARTICIPANT_POWER_OF_TWO"
  | "LEAGUE_PARTICIPANTS_NOT_EXISTS"
  | "SET_FINISHED"
  | "ALREADY_WINNER_DETERMINED"
  | "CLUB_OWNER_CANT_WITHDRAW"
  | "INTERNAL_SERVER_ERROR"
  | "SERVICE_UNAVAILABLE";
