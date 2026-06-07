// Posts lead data to the server-owned lead router.
// No third-party API keys are used in the frontend.

const LEAD_ROUTER_URL = "https://api.iamagenci.com/lead";
const CLIENT_SLUG = "laser-location";

export type LeadRouterPayload = {
  name: string;
  email: string;
  phone: string;
  formName: string;
  message?: string;
  // Allow extra answers / treatment interests to be passed through.
  [key: string]: unknown;
};

const getUtmContext = () => {
  if (typeof window === "undefined") {
    return {
      page: "",
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_content: "",
      utm_term: "",
    };
  }
  const params = new URLSearchParams(window.location.search);
  return {
    page: window.location.href,
    utm_source: params.get("utm_source") ?? "",
    utm_medium: params.get("utm_medium") ?? "",
    utm_campaign: params.get("utm_campaign") ?? "",
    utm_content: params.get("utm_content") ?? "",
    utm_term: params.get("utm_term") ?? "",
  };
};

export const sendLeadToRouter = async (payload: LeadRouterPayload) => {
  const { formName, message, name, email, phone, _hp, ...extras } = payload as LeadRouterPayload & { _hp?: string };
  const ctx = getUtmContext();

  const body = {
    clientSlug: CLIENT_SLUG,
    name,
    email,
    phone,
    source: "website",
    page: ctx.page,
    formName,
    message: message ?? "",
    utm_source: ctx.utm_source,
    utm_medium: ctx.utm_medium,
    utm_campaign: ctx.utm_campaign,
    utm_content: ctx.utm_content,
    utm_term: ctx.utm_term,
    _hp: typeof _hp === "string" ? _hp : "",
    ...extras,
  };

  const response = await fetch(LEAD_ROUTER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Lead router responded with status ${response.status}`);
  }

  const data = await response.json().catch(() => ({}));

  if (import.meta.env.DEV) {
    // Dev-only diagnostic — never log personal lead data.
    // eslint-disable-next-line no-console
    console.log("[leadRouter] response:", {
      ok: (data as any)?.ok,
      delivered: (data as any)?.delivered,
      audited: (data as any)?.audited,
    });
  }

  return data;
};
