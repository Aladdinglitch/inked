export async function submitNetlifyForm(
  formName: string,
  fields: Record<string, string | number | boolean | undefined>
) {
  const body = new URLSearchParams({ "form-name": formName });

  Object.entries(fields).forEach(([key, value]) => {
    if (value !== undefined) body.set(key, String(value));
  });

  const response = await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!response.ok) throw new Error("Form submission failed");
}
