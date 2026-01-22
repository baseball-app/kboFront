import Skeleton from '@/components/skeleton/Skeleton';
import {TicketCard, useTeam} from '@/entities/match';
import {ROUTES, size, useAppRouter} from '@/shared';
import {TicketListByTeam} from '@/entities/ticket';
import useProfile from '@/hooks/my/useProfile';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {color_token} from '@/constants/theme';
import {Txt} from '@/shared/ui';

const MyTicketList = ({isLoading, ticketList}: {isLoading: boolean; ticketList?: TicketListByTeam[]}) => {
  const {findTeamById} = useTeam();
  const {profile} = useProfile();
  const router = useAppRouter();

  return (
    <View style={styles.likeBoxContainer}>
      {(() => {
        if (isLoading) {
          return (
            <>
              <Skeleton height={100} width="100%" />
              <Skeleton height={100} width="100%" />
              <Skeleton height={100} width="100%" />
            </>
          );
        }

        return (
          <>
            {ticketList?.length ? (
              ticketList?.map(ticket => {
                const homeTeam = findTeamById(Number(ticket.hometeam_id));
                const awayTeam = findTeamById(Number(ticket.awayteam_id));

                const opponentTeam = (() => {
                  if (profile.my_team?.id === homeTeam?.id) return awayTeam;
                  if (profile.my_team?.id === awayTeam?.id) return homeTeam;
                })();

                return (
                  <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    homeTeam={homeTeam}
                    awayTeam={awayTeam}
                    opponentTeam={opponentTeam}
                    onClick={() =>
                      router.push(ROUTES.WRITE_TODAY_TICKET_CARD, {
                        id: ticket.id,
                        target_id: profile.id,
                        from_ticket_box: 'true',
                      })
                    }
                  />
                );
              })
            ) : (
              <View style={styles.emptyContainer}>
                <Txt size={14} color={color_token.gray900}>
                  해당 경기 티켓이 없어요.
                </Txt>
              </View>
            )}
          </>
        );
      })()}
    </View>
  );
};

export {MyTicketList};

const styles = StyleSheet.create({
  likeBoxContainer: {
    gap: size(12),
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
});
