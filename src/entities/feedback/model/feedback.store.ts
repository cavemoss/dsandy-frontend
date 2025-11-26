import * as api from '@/api/entities/feedback';
import { createZustand } from '@/shared/lib/utils';

import { FeedbackState } from '../types';

export const useFeedbackStore = createZustand<FeedbackState>('feedback', (set, get) => ({
  feedbackByProduct: {},

  // getters
  getFeedback: (productId: number) => get().feedbackByProduct[productId] ?? [],

  // actions
  async loadFeedback(productId: number) {
    try {
      const feedback = get().feedbackByProduct[productId] ?? (await api.feedback.get(productId));

      set((state) => {
        state.feedbackByProduct[productId] ??= feedback;
        return state;
      });
    } catch (error) {
      console.debug('Error loading product feedback', { error });
    }
  },
}));
