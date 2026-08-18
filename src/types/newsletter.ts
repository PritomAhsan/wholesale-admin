export interface NewsletterSubscriber {
  uuid: string;
  email: string;
  topics: string[];
  frequency: string;
  subscribed_at: string | null;
  unsubscribed_at: string | null;
  created_at: string;
}
