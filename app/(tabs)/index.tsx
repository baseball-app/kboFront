import {
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import Calendar from "@/components/Calendar";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FriendList from "@/components/FrendList";
import GameInfoCard from "@/components/GameInfoCard";

const CalendarScreen = () => {
  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <FriendList />
      <ScrollView style={styles.scollContainer}>
        <View style={styles.tabMenu}>
          <TouchableOpacity style={styles.tabMenuButton}>
            <View style={styles.arrowImgBox}>
              <Image
                source={require("@/assets/icons/left-arrow.png")}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.dayText}>어제의 야구</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabMenuButton}>
            <Text style={styles.todayText}>오늘의 야구</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabMenuButton}>
            <Text style={styles.dayText}>내일의 야구</Text>
            <View style={styles.arrowImgBox}>
              <Image
                source={require("@/assets/icons/right-arrow.png")}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        </View>
        <GameInfoCard matchSchedule="7월 16일(목) 15:00 ・ 수원" />
        <Calendar />
        <View style={styles.writeButtonBox}>
          <TouchableOpacity style={styles.writeScheduleButton}>
            <Image
              source={require("@/assets/icons/write.png")}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scollContainer: {
    flex: 1,
    backgroundColor: "#fffcf3",
    padding: 24,
  },
  tabMenu: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tabMenuButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  todayText: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    lineHeight: 22.4,
  },
  dayText: {
    fontSize: 12,
    color: "#95938B",
    fontWeight: 600,
    textAlignVertical: "center",
  },
  arrowImgBox: {
    height: 20,
    width: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  writeButtonBox: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  writeScheduleButton: {
    width: 48,
    height: 48,
    backgroundColor: "#353430",
    borderRadius: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
