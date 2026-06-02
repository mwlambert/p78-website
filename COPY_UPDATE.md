# P78 Website — Copy Update v1

Apply these copy changes to the site. **Copy only — do not change layout, components, or design.** If anything below would require structural changes, flag it before doing it.

The current live site is at `https://keen-beijinho-47b2f9.netlify.app` — use that as the reference for what's currently there.

---

## HERO

**Eyebrow:** remove. (No eyebrow on hero.)

**Headline:** unchanged.
> The logistics layer of the in-space economy.

**Sub:** replace.
> Propulsion systems and vehicles that move, service, and reach every asset in space.

(Note: drops the "from orbital data centres to the lunar surface" specifics — those examples were too prescriptive.)

**CTAs:** unchanged.

**Stat band:** replace all four cells.

| Value | Label |
|---|---|
| `HTP` | Propellant architecture |
| `LEO → Cislunar` | Operating envelope |
| `Re-usable` | Design principle |
| `20+ years` | Combined team experience |

(Removes the abstract "$90B" and replaces with a real, ownable stat — combined team experience. HTP is now public-facing.)

---

## MISSION

**Eyebrow:** unchanged — `The thesis`

**Section headline:** unchanged.
> The next decade of space will be defined not by what gets launched — but by what gets reused, repositioned, and reached.

**"Why P78" column body:** replace with this (pulled from the pitch deck, tightened).

> Stations age. Data centres fill. Satellites run out of fuel. The Moon stays out of routine reach. Not because the destinations are impossible — because the connective layer between them doesn't exist.
>
> P78 is building that layer: propulsion, vehicles, and logistics designed from day one for reuse, servicing, and cislunar range.

**"What we do" triad:** REPLACE Connect / Service / Reach with the three architectural layers from the deck.

| # | Title | Description |
|---|---|---|
| 01 | Propulsion | HTP-fuelled engines for re-usable spacecraft. |
| 02 | Craft | Refuelable vehicles with cislunar range. |
| 03 | Logistics | Routing, servicing, and supply across the in-space economy. |

(Note: "Depots" from the deck is intentionally replaced with "Logistics" — broader and doesn't commit to building depots publicly.)

---

## PRODUCTS

**Section eyebrow:** unchanged — `The products`

**Section headline:** unchanged.
> An engine, then a vehicle. The smallest pieces of in-space infrastructure.

### Product 01 — Propulsion

- **Category label:** `Product 01 / Propulsion` ← unchanged
- **Name:** change from "The propulsion system." to **`Modern hypergolic propulsion.`**
- **Status tag:** `In development` ← unchanged
- **Body:** replace.

> A non-toxic hypergolic engine for re-usable spacecraft. HTP-fuelled, fast to integrate, EU Space Act compliant — performance matched to legacy toxic systems without the handling burden.
>
> Sized for the 350–600 kg small-sat market, then scaled across the vehicle layer.

- **Chips:** replace.
  - `Hypergolic`
  - `Non-toxic`
  - `HTP-fuelled`
  - `Storable`

- **Spec table:** replace.

| Key | Value |
|---|---|
| Thrust class | 500 N |
| ISP | 310 s |
| Propellant | HTP bipropellant |
| Stage | Development |

- **Link text:** unchanged — `Read the system brief ↗`

### Product 02 — Vehicle

- **Category label:** `Product 02 / Vehicle` ← unchanged
- **Name:** keep `The vehicle.` (avoid "OTV" — keep generic for now)
- **Status tag:** `Concept` ← unchanged
- **Body:** replace.

> Re-usable in-space vehicles built around P78 propulsion. Refuelable in orbit, cislunar range from day one — sized to move payloads, service assets, and recover them across the in-space economy.
>
> One platform, many missions.

- **Chips:** replace (must NOT overlap with propulsion chips).
  - `Re-usable`
  - `Refuelable`
  - `Cislunar range`
  - `Multi-mission`

- **Spec table:** replace.

| Key | Value |
|---|---|
| Class | In-space vehicle |
| Range | LEO → Lunar |
| Refuelling | In-orbit |
| Stage | Concept |

- **Link text:** unchanged — `Read the vehicle brief ↗`

---

## CAREERS

**Eyebrow:** unchanged — `Careers`

**Heading:** unchanged.
> Build the connective layer of space.

**Intro paragraph:** unchanged.
> We are a small team building the vehicles an orbital economy depends on. Come build them with us.

**Role rows:** unchanged.

---

## PARTNER

**Eyebrow:** unchanged — `Partner with us`

**Heading:** unchanged.
> Build, fund, or fly with P78.

**Lede:** replace.
> Infrastructure for the in-space economy. Investors, customers, and partners — we'd like to hear from you.

**Form:** unchanged.

---

## FOOTER

**Tagline:** unchanged.
> The logistics layer of the in-space economy.

**Bottom-right tagline:** replace.
> Change `Built for the in-space decade` → `Space logistics specialists`

**Everything else:** unchanged.

---

## META TAGS

Update the meta description and OG description to match the new hero sub:

> Propulsion systems and vehicles that move, service, and reach every asset in space.

Page title and OG title: unchanged.

---

## Implementation notes

- This is a copy-only update. No component changes, no styling changes, no layout changes.
- Where copy is "unchanged," do not modify it.
- The four stat-band cells, the three Mission triad items, and the chip lists should be data-driven (arrays/props) — if they're already components with props, just update the props. If they're hardcoded in the page, leave the structure but swap the strings.
- Verify against the new copy after build — particularly that propulsion chips and vehicle chips do not overlap.
