export type ContactMessageStatus = "open" | "resolved";

export interface ContactMessage {
  uuid: string;
  topic: string;
  name: string;
  business_email: string;
  account_email: string | null;
  reference_number: string | null;
  message: string;
  attachment_url: string | null;
  status: ContactMessageStatus;
  created_at: string;
}
