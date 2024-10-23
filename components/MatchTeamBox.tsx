import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

const MatchTeamBox = () => {
  return (
    <View style={styles.gameInfoBox}>
      <View style={styles.matchDayBox}>
        <Text style={styles.matchDayTitle}>15:00</Text>
        <Image
          source={require("@/assets/icons/ellipse.png")}
          resizeMode="contain"
        />
        <Text style={[styles.matchDayTitle, { marginLeft: 3 }]}>수원</Text>
      </View>
      <View style={styles.matchTeamBox}>
        <View style={styles.matchTeamInfo}>
          <Image
            source={require("@/assets/team_logo/ssg.png")}
            resizeMode="contain"
          />
          <View style={styles.ellipseBox}>
            <Image
              source={require("@/assets/icons/ellipse.png")}
              resizeMode="contain"
            />
            <Image
              source={require("@/assets/icons/ellipse.png")}
              resizeMode="contain"
            />
          </View>
          <Image
            source={require("@/assets/team_logo/kt.png")}
            resizeMode="contain"
          />
        </View>
        <View style={styles.teamNameBox}>
          <Text style={styles.teamText}>SSG</Text>
          <Text style={styles.teamText}>KT</Text>
        </View>
      </View>
    </View>
  );
};

export default MatchTeamBox;

const styles = StyleSheet.create({
  gameInfoBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "100%",
    borderWidth: 1,
    borderColor: "#E4E2DC",
    height: 113,
    padding: 12,
    flexDirection: "column",
    alignItems: "center",
  },
  matchTeamBox: {
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    marginTop: 12,
  },
  matchDayBox: {
    borderRadius: 10,
    backgroundColor: "#F3F2EE",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  matchDayTitle: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 19.6,
    color: "#000000",
  },
  matchTeamInfo: {
    flexDirection: "row",
    gap: 20,
    width: "100%",
    justifyContent: "center",
  },
  ellipseBox: {
    flexDirection: "column",
    gap: 6,
    justifyContent: "center",
  },
  teamNameBox: {
    width: "100%",
    flexDirection: "row",
    gap: 45,
    justifyContent: "center",
  },
  teamText: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 19.6,
    textAlign: "center",
    width: 35,
  },
});
