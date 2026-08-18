import { Metadata } from "next";

import NewsletterManager from "@/features/newsletter/NewsletterManager";

export const metadata: Metadata = {
  title: "Newsletter Subscribers",
};

export default function NewsletterPage() {
  return <NewsletterManager />;
}
