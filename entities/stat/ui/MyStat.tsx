import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {AnimatedCircularProgress} from 'react-native-circular-progress'

type Props = {
  percentage: number
}

const MyStat = ({percentage}: Props) => {
  return (
    <View style={styles.progressBox}>
      <AnimatedCircularProgress
        size={170}
        width={16}
        fill={percentage} // percentage
        tintColor="#1E5EF4"
        arcSweepAngle={270}
        backgroundColor="#E4E2DC"
        lineCap="round"
        rotation={225}
        children={() => (
          <View style={styles.progressContent}>
            <Text style={styles.progressText}>나의 승요력</Text>
            <Text style={styles.progressPercentage}>
              {percentage}
              <Text style={styles.progressPercentageUnit}>%</Text>
            </Text>
          </View>
        )}
      />
    </View>
  )
}

export {MyStat}

const styles = StyleSheet.create({
  progressBox: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  progressText: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 19.6,
  },
  progressPercentageUnit: {
    fontSize: 26,
    fontWeight: 700,
    lineHeight: 39,
  },
  progressPercentage: {
    fontSize: 30,
    fontWeight: 700,
    lineHeight: 42,
  },
  progressContent: {
    alignItems: 'center',
  },
})
