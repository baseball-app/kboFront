import { Href } from "expo-router";

interface ITabRoutes {
  CALENDAR: Href<string>;
  MATCH: Href<string>;
}
/** 라우터 경로 관련 상수 */
export const router_address: { TAB: ITabRoutes } = {
  TAB: {
    CALENDAR: "/(tabs)/",
    MATCH: "/(tabs)/match",
  },
};
