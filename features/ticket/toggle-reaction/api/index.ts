import ApiClient from '@/api';
import {UpdateReactionParam} from '../types';

const updateReaction = (id: number, data: UpdateReactionParam) =>
  ApiClient.post(`/tickets/ticket_reaction/`, {...data, id: Number(id)});

export {updateReaction};
