import { StyleSheet, ScrollView, Text } from "react-native";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MatchTeamBox from "@/components/MatchTeamBox";
import MatchCalendar from "@/components/MatchCalendar";

const matchTeam = [
  {
    time: "14:00",
    homeTeamImg: require("@/assets/team_logo/ssg.png"),
    awayTeamImg: require("@/assets/team_logo/kt.png"),
    homeTeamNm: "SSG",
    awayTeamNm: "KT",
  },
  {
    time: "15:00",
    homeTeamImg: require("@/assets/team_logo/ssg.png"),
    awayTeamImg: require("@/assets/team_logo/kt.png"),
    homeTeamNm: "SSG",
    awayTeamNm: "KT",
  },
  {
    time: "16:00",
    homeTeamImg: require("@/assets/team_logo/ssg.png"),
    awayTeamImg: require("@/assets/team_logo/kt.png"),
    homeTeamNm: "SSG",
    awayTeamNm: "KT",
  },
];
const MatchScreen = () => {
  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <View style={styles.headerTitleBox}>
        <Text style={styles.headerTitle}>경기일정</Text>
      </View>
      <ScrollView style={styles.scrollMatchContainer}>
        <MatchCalendar />
        <View style={styles.matchBox}>
          {matchTeam.map((ev, idx) => {
            return (
              <MatchTeamBox
                key={idx}
                time={ev.time}
                homeTeamImg={ev.homeTeamImg}
                awayTeamImg={ev.awayTeamImg}
                homeTeamNm={ev.homeTeamNm}
                awayTeamNm={ev.homeTeamNm}
                isSelected={false}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MatchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerTitleBox: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#171716",
  },
  scrollMatchContainer: {
    flex: 1,
    backgroundColor: "#fffcf3",
    padding: 24,
  },
  matchBox: {
    flexDirection: "column",
    gap: 20,
  },
});
