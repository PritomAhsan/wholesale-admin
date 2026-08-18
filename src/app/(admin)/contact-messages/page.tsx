import { Metadata } from "next";

import ContactMessagesManager from "@/features/contact-messages/ContactMessagesManager";

export const metadata: Metadata = {
  title: "Contact Messages",
};

export default function ContactMessagesPage() {
  return <ContactMessagesManager />;
}
