import type { Metadata } from "next";
import { PolicyPage } from "@/components/sections/PolicyPage";

export const metadata: Metadata = { title: "Terms of use" };

export default function Page() {
  return <PolicyPage title="Terms of use" />;
}
