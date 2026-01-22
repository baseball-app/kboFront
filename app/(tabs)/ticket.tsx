import {InitScrollProvider} from '@/components/provider/InitScrollProvider';
import React from 'react';
import {StyleSheet} from 'react-native';
import {StatProfileBox} from '@/widgets/stat';
import {MyTicketBox} from '@/widgets/ticket/my-ticket-list/ui';
import {color_token} from '@/constants/theme';

const MyTicketBoxScreen = () => {
  return (
    <InitScrollProvider style={styles.container}>
      <StatProfileBox />
      <MyTicketBox />
    </InitScrollProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color_token.gray100,
  },
});

export default MyTicketBoxScreen;
