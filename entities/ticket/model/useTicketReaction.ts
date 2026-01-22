import {useQuery} from '@tanstack/react-query';
import {ReactionType} from '../types';
import * as api from '../api';
const REACTION_TYPE_LIST: {key: ReactionType; title: string; count: number}[] = [
  {key: 'laugh', title: '😁', count: 0},
  {key: 'wink', title: '🤣', count: 0},
  {key: 'good', title: '🥲', count: 0},
  {key: 'confused', title: '🤔', count: 0},
  {key: 'rage', title: '🤬', count: 0},
  {key: 'clap', title: '👏', count: 0},
  {key: 'petulance', title: '✌️', count: 0},
  {key: 'dislike', title: '👎', count: 0},
  {key: 'point_up', title: '👍', count: 0},
];

const useTicketReaction = ({id}: {id: number}) => {
  const {data: my_reaction} = useQuery({
    queryKey: ['ticket', id, 'reaction'],
    queryFn: () => api.findTicketReaction({id}),
    enabled: Boolean(id),
  });

  const reactionList = REACTION_TYPE_LIST.map(reaction => ({
    ...reaction,
    count: 0,
    isPressed: Boolean(my_reaction?.[reaction.key]),
  }));

  return {reactionList};

  // const toggleReaction = (reaction: ReactionType) => {
  //   if (!ticketDetail) return
  //   if (ticketDetail.writer === profile.id) {
  //     openCommonPopup('반응은 친구만 남길 수 있어요!')
  //     return
  //   }

  //   addReaction({reaction_pos: my_reaction?.[reaction] ? 'del' : 'add', reaction_type: reaction})
  // }
};

export {useTicketReaction};
