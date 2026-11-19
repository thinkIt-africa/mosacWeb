import type { Metadata } from "next";
import { PolicyPage } from "@/components/sections/PolicyPage";

export const metadata: Metadata = { title: "Accessibility" };

export default function Page() {
  return (
    <PolicyPage title="Accessibility" />
  );
}
