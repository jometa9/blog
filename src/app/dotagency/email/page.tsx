import { redirect } from "next/navigation";

export default function Page() {
  redirect("https://calendly.com");
  return null;
}
