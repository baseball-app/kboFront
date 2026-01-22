import ApiClient from '@/api';

export const deleteTicket = async (id: number) => {
  const response = await ApiClient.post(`/tickets/ticket_del/`, {id});
  return response;
};
