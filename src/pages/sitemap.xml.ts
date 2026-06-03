import type { APIRoute } from "astro";

interface Role {
  slug: string;
}

export const GET: APIRoute = ({ site }) => {
  const base = site?.toString().replace(/\/$/, "") ?? "https://p78space.com";
  const today = new Date().toISOString().slice(0, 10);

  const roleModules = import.meta.glob<{ default: Role } | Role>(
    "../data/roles/*.json",
    { eager: true },
  );
  const roleUrls = Object.values(roleModules).map((mod) => {
    const role = ("default" in mod ? mod.default : mod) as Role;
    return `/careers/${role.slug}`;
  });

  const urls = ["/", "/privacy", ...roleUrls];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${base}${u}</loc>
    <lastmod>${today}</lastmod>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml" },
  });
};
