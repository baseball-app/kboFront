import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
} from "react-native";
import {
  format,
  startOfWeek,
  addDays,
  isSameDay,
  addMonths,
  isToday,
} from "date-fns";
import { Ionicons } from "@expo/vector-icons";

const MatchCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<any>(null);

  const prevMonth = () => {
    setCurrentDate(addMonths(currentDate, -1));
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity
          onPress={prevMonth}
          style={styles.headerTextContainer}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>
            {format(currentDate, "yyyy.MM")}
          </Text>
        </View>
        <TouchableOpacity
          onPress={nextMonth}
          style={styles.headerTextContainer}
        >
          <Ionicons name="chevron-forward" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  };

  const renderWeekDays = () => {
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    const days = [];
    const startDate = startOfWeek(currentDate); // 주의 첫 번째 날을 가져옴

    // 7일 동안의 날짜를 요일과 함께 표시
    for (let i = 0; i < 7; i++) {
      const day = addDays(startDate, i);
      const isSelected = isSameDay(day, selectedDate); // 선택된 날짜 여부
      const isTodaySelected = isToday(selectedDate); // 선택된 날짜가 오늘인지 여부
      const isTodayAndNotSelected = isToday(day) && !isSelected; // 오늘이지만 선택되지 않은 경우

      days.push(
        <TouchableOpacity
          key={i}
          style={[
            styles.dayContainer,
            isSelected && styles.selectedDay,
            isTodayAndNotSelected && styles.todayDay,
          ]}
          onPress={() => setSelectedDate(day)}
        >
          <Text
            style={[
              styles.dayOfWeekText,
              isSelected
                ? styles.selectedText
                : isToday(day)
                ? styles.todayText
                : styles.defaultText, // 선택된 날짜이면 선택된 스타일, 오늘이면 오늘 스타일, 기본이면 기본 스타일 적용
            ]}
          >
            {daysOfWeek[i]}
          </Text>
          <Text
            style={[
              styles.dayText,
              isSelected
                ? styles.selectedText
                : isToday(day)
                ? styles.todayText
                : styles.defaultText, // 선택된 날짜이면 선택된 스타일, 오늘이면 오늘 스타일, 기본이면 기본 스타일 적용
            ]}
          >
            {format(day, "d")} {/* 날짜 */}
          </Text>
        </TouchableOpacity>
      );
    }

    return <View style={styles.weekRow}>{days}</View>;
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderWeekDays()}
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderWeekDays()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    paddingVertical: 10,
  },
  headerTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 8,
  },
  navButton: {
    fontSize: 24,
    color: "black",
  },
  daysOfWeekContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  dayOfWeekText: {
    fontSize: 13,
    fontWeight: 400,
    lineHeight: 18.2,
    textAlign: "center",
    width: "100%",
    color: "#000",
  },
  singleRowDaysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  day: {
    width: "14.28%",
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  dayText: {
    fontSize: 18,
    lineHeight: 25.2,
    fontWeight: 500,
    textAlign: "center",
  },
  inactiveDay: {
    opacity: 0.5,
  },

  selectedDay: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 4,
    backgroundColor: "#000",
  },
  moodContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginBottom: 4,
  },
  datePickerContainer: {
    flexDirection: "row",
    height: 134,
    overflow: "hidden",
  },
  picker: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  pickerItem: {
    fontSize: 24,
    backgroundColor: "#fff",
  },
  moodIcon: {
    fontSize: 24,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "red",
    position: "absolute",
    top: 4,
    right: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "100%",
    padding: 24,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 28,
  },
  buttonBox: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 13,
    marginTop: 40,
    marginBottom: 16,
  },
  confirmButton: {
    flex: 1,
    height: 46,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#1E5EF4",
  },
  confirmText: {
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 22.4,
    color: "#fff",
  },
  cancelButton: {
    flex: 1,
    height: 46,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#D0CEC7",
  },
  cancelText: {
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 22.4,
    color: "#000",
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  dayContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    paddingHorizontal: 12,
    flexDirection: "column",
    gap: 6,
    borderRadius: 10,
  },
  selectedText: {
    color: "#fff",
  },
  todayDay: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 4,
    borderColor: "#55524E",
  },
  todayText: {
    color: "#000",
  },
  defaultText: {
    color: "#000",
  },
});

export default MatchCalendar;
