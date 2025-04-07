export type NotificationCategory =
  | 'challenge'
  | 'translation'
  | 'feedback'
  | 'admin';
export type NotificationType =
  | 'created'
  | 'updated'
  | 'deleted'
  | 'approved'
  | 'rejected'
  | 'closed';

export interface Notification {
  id: number;
  userId: string;
  category: NotificationCategory;
  type: NotificationType;
  message: string;
  reason?: string;
  isRead: boolean;
  createdAt: string; // ISO 문자열
  challengeId?: string;
  translationId?: string;
  feedbackId?: string;
}
