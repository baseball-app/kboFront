import ApiClient from '@/api';
import {Match, Team} from '../types';

export const getTeams = async () => {
  const response = await ApiClient.get<Team[]>('/teams/');
  return response;
};

export const getMatchByDate = async (date: string) => {
  const response = await ApiClient.get<Match[]>('/games/', {
    end_date: date,
    start_date: date,
  });
  return response;
};
