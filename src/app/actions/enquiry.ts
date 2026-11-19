/**
 * Handles membership, partner and contact form submissions in the browser.
 *
 * The site is built as static files (for GitHub Pages), so there is no server of our own to
 * receive forms. When the club confirms its inboxes, set NEXT_PUBLIC_FORM_ENDPOINT to a form
 * service URL (e.g. Formspree or a CMS webhook) that accepts a JSON POST. Such an endpoint is
 * public by design and is not a secret.
 *
 * Until then the form validates input and tells the visitor it is not connected yet, rather
 * than pretending the message was sent (03, sections K and R).
 */
export type EnquiryState = {
  status: "idle" | "error" | "success" | "not-connected";
  message?: string;
  fieldErrors?: Record<string, string>;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  // Honeypot: real visitors never fill this hidden field.
  if (String(formData.get("company_website") ?? "").trim()) {
    return { status: "success", message: "Thank you." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const consent = formData.get("consent") === "on";

  const fieldErrors: Record<string, string> = {};
  if (name.length < 2) fieldErrors.name = "Enter your name.";
  if (!EMAIL.test(email)) fieldErrors.email = "Enter a valid email address, like name@example.com.";
  if (formData.has("message") && message.length < 5) fieldErrors.message = "Add a short message.";
  if (!consent) fieldErrors.consent = "Tick the box so we can use your details to reply.";
  if (Object.keys(fieldErrors).length) {
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors };
  }

  const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
  if (!endpoint) {
    return {
      status: "not-connected",
      message: "This form is not connected yet in this preview, so your message was not sent.",
    };
  }

  try {
    const data = Object.fromEntries(Array.from(formData.entries()).filter(([k]) => k !== "company_website"));
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(String(res.status));
    return { status: "success", message: "Your enquiry has been received. We will reply through the contact details you supplied." };
  } catch {
    return { status: "error", message: "We could not complete that action. Please try again." };
  }
}
