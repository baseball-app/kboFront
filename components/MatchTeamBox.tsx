import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";

//TODO 목업 인터페이스 추후 실제 데이터 수정
interface IMatchTeamBox {
  time: string;
  homeTeamImg: ImageSourcePropType;
  awayTeamImg: ImageSourcePropType;
  homeTeamNm: string;
  awayTeamNm: string;
  isSelected?: boolean;
}

/** 매치 팀 경기 카드 컴포넌트 */
const MatchTeamBox = (props: IMatchTeamBox) => {
  const { time, homeTeamImg, awayTeamImg, homeTeamNm, awayTeamNm, isSelected } =
    props;
  return (
    <View style={isSelected ? styles.gameSelectedInfoBox : styles.gameInfoBox}>
      <View style={styles.matchDayBox}>
        <Text style={styles.matchDayTitle}>{time}</Text>
        <Image
          source={require("@/assets/icons/ellipse.png")}
          resizeMode="contain"
        />
        <Text style={[styles.matchDayTitle, { marginLeft: 3 }]}>수원</Text>
      </View>
      <View style={styles.matchTeamBox}>
        <View style={styles.matchTeamInfo}>
          <Image
            source={awayTeamImg}
            resizeMode="contain"
            style={{ width: 35, height: 35 }}
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
            source={homeTeamImg}
            resizeMode="contain"
            style={{ width: 35, height: 35 }}
          />
        </View>
        <View style={styles.teamNameBox}>
          <Text style={styles.teamText}>{homeTeamNm}</Text>
          <Text style={styles.teamText}>{awayTeamNm}</Text>
        </View>
      </View>
    </View>
  );
};

export default MatchTeamBox;

const styles = StyleSheet.create({
  gameInfoBox: {
    backgroundColor: "#F3F2EE",
    borderRadius: 10,
    width: "100%",
    borderWidth: 1,
    borderColor: "#E4E2DC",
    height: 113,
    padding: 12,
    flexDirection: "column",
    alignItems: "center",
  },
  gameSelectedInfoBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "100%",
    borderWidth: 2,
    borderColor: "#353430",
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
    fontWeight: "500",
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
    marginTop: 4,
    flexDirection: "row",
    gap: 45,
    justifyContent: "center",
  },
  teamText: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 19.6,
    textAlign: "center",
    width: 35,
  },
  teamImg: {
    width: 35,
    height: 35,
    resizeMode: "contain",
  },
});
