import {color_token} from '@/constants/theme';
import {size} from '@/shared';
import {Txt} from '@/shared/ui';
import React from 'react';
import {StyleSheet, View} from 'react-native';

type Props = {
  title: string;
  percent: number;
  win: number;
  draw: number;
  lose: number;
};

function DetailSummary({title, percent, win, draw, lose}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.powerBox}>
        <Txt size={16}>{title}</Txt>
        <Txt size={24} weight="bold">
          {percent}%
        </Txt>
      </View>
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Txt size={16}>경기</Txt>
          <Txt size={24} weight="bold">
            {win + draw + lose}
          </Txt>
        </View>
        <View style={styles.statItem}>
          <Txt size={16}>승</Txt>
          <Txt size={24} weight="bold">
            {win}
          </Txt>
        </View>
        <View style={styles.statItem}>
          <Txt size={16}>패</Txt>
          <Txt size={24} weight="bold">
            {lose}
          </Txt>
        </View>
        <View style={styles.statItem}>
          <Txt size={16}>무</Txt>
          <Txt size={24} weight="bold">
            {draw}
          </Txt>
        </View>
      </View>
    </View>
  );
}

export {DetailSummary};

const styles = StyleSheet.create({
  container: {
    borderColor: color_token.gray350,
    borderWidth: 1,
    borderRadius: size(10),
    backgroundColor: color_token.white,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  powerBox: {
    paddingHorizontal: size(20),
    paddingVertical: size(16),
    alignItems: 'center',
    borderWidth: size(0.7),
    borderColor: color_token.gray350,
    borderStyle: 'dashed',
    marginLeft: -size(1),
    marginTop: -size(1),
    marginBottom: -size(2),
  },
  statsRow: {
    paddingHorizontal: size(24),
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  statItem: {
    paddingVertical: size(16),
    alignItems: 'center',
  },
});
