import type { Metadata } from "next";
import { PolicyPage } from "@/components/sections/PolicyPage";

export const metadata: Metadata = { title: "Privacy notice" };

export default function Page() {
  return (
    <PolicyPage title="Privacy notice" />
  );
}
