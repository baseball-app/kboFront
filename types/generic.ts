import {UseMutationResult} from '@tanstack/react-query';

export type Pagination<T> = {
  count: number;
  next: string; // 'http://api.example.org/accounts/?page=4'
  previous: string; // 'http://api.example.org/accounts/?page=2'
  results: T[];
  last_page: number;
};

export type MutationFn<T> = UseMutationResult<unknown, Error, T>['mutate'];

//
