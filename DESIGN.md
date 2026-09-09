# Aura Creator Management UI

The FanFlow project now uses the Aura premium agency interface from the supplied Stitch reference.

## Direction

- **Mood:** private members' club, intelligent, secure, editorial
- **Palette:** near-black workspace, charcoal surfaces, metallic gold actions, burgundy primary actions
- **Type:** Playfair Display for headings; Inter for labels, data, and controls
- **Shape:** 8px controls and cards with restrained borders and soft glass-like surfaces
- **Navigation:** fixed command sidebar on desktop, slide-out navigation on mobile

## Routes

- `/` and `/login` — Premium Agency Login
- `/apply` — Join the Elite application
- `/dashboard` — Creator Command Center
- `/earnings` — Earnings Overview
- `/chat-history` — AI Chat History monitoring
- `/persona` — AI Persona and Knowledge Base

The current interactions are intentionally prototype-level: sign-in, application submission, navigation, chat selection, and persona save states work in-browser. Supabase/auth wiring can be connected to the existing project when the backend flow is ready.
