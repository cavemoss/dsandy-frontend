import { Review } from '@/api/entities/feedback';

export interface FeedbackState {
  feedbackByProduct: { [productId: number]: Review[] };
  // getters
  getFeedback: (productId: number) => Review[];
  // actions
  loadFeedback: (productId: number) => Promise<void>;
}
