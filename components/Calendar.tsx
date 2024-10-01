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
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";

const moodColors = {
  happy: "green",
  sad: "blue",
  neutral: "orange",
  angry: "red",
};

const moodIcons = {
  happy: "😊",
  sad: "😢",
  neutral: "😐",
  angry: "😡",
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerTextContainer}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.headerText}>
            {format(currentDate, "yyyy.MM")}
          </Text>
          <Ionicons name="chevron-down" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  };

  const renderDaysOfWeek = () => {
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    return (
      <View style={styles.daysOfWeekContainer}>
        {daysOfWeek.map((day, index) => (
          <Text key={index} style={styles.dayOfWeekText}>
            {day}
          </Text>
        ))}
      </View>
    );
  };

  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(startOfMonth(currentDate));
    const endDate = endOfWeek(endOfMonth(currentDate));

    let day = startDate;
    while (day <= endDate) {
      days.push(day);
      day = addDays(day, 1);
    }

    return (
      <View style={styles.daysContainer}>
        {days.map((day, index) => {
          const mood = getMoodForDate(day); // Replace with your logic to get the mood for the date
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.day,
                !isSameMonth(day, currentDate) && styles.inactiveDay,
                isSameDay(day, selectedDate) && styles.selectedDay,
              ]}
              onPress={() => setSelectedDate(day)}
            >
              <Text style={styles.dayText}>{format(day, "d")}</Text>
              {day.getDate() === 10 && <View style={styles.dot} />}
              <View
                style={[
                  styles.moodContainer,
                  mood && { backgroundColor: moodColors[mood] },
                ]}
              >
                {/* <Text style={styles.moodIcon}>{mood && moodIcons[mood]}</Text> */}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const getMoodForDate = (date: Date) => {
    // Replace this with your logic to get the mood for the date
    const day = date.getDate();
    if (day % 5 === 0) return "angry";
    if (day % 3 === 0) return "neutral";
    if (day % 2 === 0) return "sad";
    return "happy";
  };

  const handleMonthYearChange = () => {
    const newDate = new Date(selectedYear, selectedMonth, 1);
    setCurrentDate(newDate);
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderDaysOfWeek()}
      {renderDays()}

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Month and Year</Text>
            <Picker
              selectedValue={selectedMonth}
              onValueChange={(itemValue) => setSelectedMonth(itemValue)}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <Picker.Item
                  key={i}
                  label={format(new Date(0, i), "MMMM")}
                  value={i}
                />
              ))}
            </Picker>
            <Picker
              selectedValue={selectedYear}
              onValueChange={(itemValue) => setSelectedYear(itemValue)}
            >
              {Array.from({ length: 10 }, (_, i) => (
                <Picker.Item key={i} label={`${2020 + i}`} value={2020 + i} />
              ))}
            </Picker>
            <Button title="Confirm" onPress={handleMonthYearChange} />
            <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center", // Center the content horizontally
    alignItems: "center",
    marginBottom: 16,
  },
  headerTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Center the text and icon
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 8, // Add some space between the text and the icon
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
    width: "14.28%",
    textAlign: "center",
    fontWeight: "bold",
  },
  daysContainer: {
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
    fontSize: 16,
  },
  inactiveDay: {
    opacity: 0.5,
  },

  selectedDay: {
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 10,
    padding: 4,
  },
  moodContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginBottom: 4,
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default Calendar;
