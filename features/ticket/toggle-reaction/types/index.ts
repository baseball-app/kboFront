import {ReactionType} from '@/entities/ticket'

type UpdateReactionParam = {reaction_pos: 'add' | 'del'; reaction_type: ReactionType}

export type {UpdateReactionParam}
