/**
 * P78 — site-wide configuration.
 *
 * Tally form base URL for role applications.
 *
 * The role's pageTitle is appended as a URL-encoded `?role=` query param
 * to pre-fill the Role dropdown in the Tally form. The Role dropdown
 * options in Tally must therefore match each role's pageTitle exactly
 * (e.g. "Propulsion Engineering Intern", "Propellant Intern", etc.).
 *
 * Format: "https://tally.so/r/<form-id>"
 *
 * Leave as an empty string until the Tally form is set up. While empty,
 * JD pages render a "Applications opening soon" fallback that points at
 * the partner form.
 */
export const TALLY_APPLICATION_URL = "https://tally.so/r/gDvopJ";
