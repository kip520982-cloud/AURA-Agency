# Creator-platform MCPs — what exists, what's risky, what FanFlow should build

Research date: 5 August 2026

## Bottom line

1. **OnlyFans still has no official public API.** Every OnlyFans CRM, chatter tool and
   "OnlyFans MCP" on the market runs on a reverse-engineered layer. That is a terms-of-service
   grey area and the ban risk lands on the *creator's* account, not the tool vendor's.
2. **MCP servers for OnlyFans already exist and are mature.** OnlyFansAPI ships a hosted MCP with
   200+ tools that plugs straight into Claude. So "an MCP that automates everything" is not a
   greenfield idea — it is a solved commodity.
3. **The differentiated thing for FanFlow to build is a FanFlow MCP over our own CRM**, not
   another OnlyFans wrapper. It is the only version of this that is legally clean, that we control,
   and that matches the transparency promise the whole brand is built on.

---

## 1. The hard constraint

OnlyFans deliberately restricts programmatic access — no public API docs, no API keys, no OAuth,
no webhooks. A privacy policy published by Fans Holdings OÜ (OnlyFans' parent) carrying an
"OnlyFans API" title and a 25 June 2026 date has fuelled speculation about an official API, but
**nothing has been formally announced.** Treat an official API as a possibility to watch, not a
plan to depend on.

Also relevant to our marketing claims: OnlyFans tightened its AI rules in 2026 — mandatory AI
labelling, zero tolerance on deepfakes, and a penalty ladder ending in permanent bans. Our
"AI-powered chat automation" pitch needs to be compatible with mandatory AI disclosure.

## 2. What already exists

| Tool | What it is | MCP? | Official? |
|---|---|---|---|
| [OnlyFansAPI](https://onlyfansapi.com/mcp/claude) | 200+ tools over chats, fans, earnings. MCP URL `https://app.onlyfansapi.com/mcp/onlyfans-mcp`, pasted into Claude's connector panel. Free under $5k/account/month. Per-creator and read-only/full-write scoping, plus an audit log of Claude's calls. Claims five years live with zero bans. | Yes, hosted | No — unofficial |
| [OFMAPI](https://ofmapi.com/) | OnlyFans API with free webhooks, n8n node and MCP | Yes | No — unofficial |
| [OFAuth](https://ofauth.com/) | "The Plaid for OnlyFans" — the account-linking/auth layer other tools build on | Auth layer | No — unofficial |
| [of-api.com](https://www.of-api.com/), [ofans-api.com](https://www.ofans-api.com/) | Further unofficial API vendors | Varies | No |
| **[Fanvue](https://api.fanvue.com/docs/mcp-server)** | **Official** MCP at `https://mcp.fanvue.com/mcp`, OAuth browser flow (no API keys), revocable from Fanvue settings. Messaging, posts/scheduling, earnings insights, media vault, mass messaging, multi-creator agency tools. | Yes | **Yes — official** |
| [influencers.club Creator Data MCP](https://influencers.club/creator-mcp/) | 340M+ creator profiles, verified emails, 200+ data points — prospecting/lead-gen, not account management | Yes | Official to them |

Note the asymmetry: **Fanvue gives away an official, OAuth-secured MCP. OnlyFans gives nothing.**

## 3. Honest risk read

- **Ban risk sits with the creator.** "Zero bans in five years" is a vendor claim, not a guarantee,
  and it is not the vendor's account on the line. Any OnlyFans automation we ship must carry an
  explicit, informed consent step.
- **NZ Privacy Act 2020.** Routing fan messages and payment data through a third-party unofficial
  API is an offshore disclosure of personal information. That sits awkwardly next to the "data
  sovereignty — your data is stored in New Zealand" claim now on our About section. We need to
  either scope that claim carefully or keep the OF connector optional and disclosed.
- **Platform dependency.** An unofficial layer can break or be shut off with no notice. Do not let
  core FanFlow functionality depend on it.

## 4. What FanFlow should actually build

### 4a. A FanFlow MCP over our own CRM — the real opportunity

We already have the API surface in `~/creator-platform-crm` (`/api/fans`, `/api/analytics`,
`/api/webhooks`, plus the transparency/audit service). Wrapping *that* in an MCP means an owner or
agency can run the business from Claude in plain English, over data we already hold lawfully.

Candidate tools:

- `list_fans`, `get_fan`, `segment_fans` (VIP/whale detection)
- `revenue_summary`, `payout_breakdown` (gross → platform fee → agency fee → net)
- `staff_performance`, `chat_analytics` (human vs AI split, response times)
- `audit_search` — query the audit trail
- `export_data` — the "no lock-in" promise, callable

**The differentiator:** every MCP tool call writes into the same audit trail as human and AI
actions. No competitor MCP does this. It turns "complete transparency" from a marketing line into
a feature — the creator can ask "what did the AI do to my account last week?" and get a real
answer. That is genuinely on-brand and hard for an OnlyFans-wrapper vendor to copy.

### 4b. Platform connectors — staged by risk

1. **Fanvue first.** Official API, OAuth, an official MCP to learn from, zero ToS risk. Fastest
   path to a real working integration and a credible "we integrate with platforms" claim.
2. **OnlyFans via OFAuth or OnlyFansAPI**, behind a clear consent screen and risk disclosure.
   Buy this layer, do not build it — five years of endpoint reverse-engineering is not our edge.
3. **Fansly** — check for an official API before assuming an unofficial route is needed.

### 4c. What not to build

Another generic "OnlyFans MCP". It is commoditised, free under $5k/account/month, and we would be
competing on the one axis where we have no advantage.

## 5. Recommended next steps

1. Decide whether FanFlow is a **platform-integrated CRM** or a **transparency layer over agencies**.
   The research points hard at the second — it is defensible and it is what the site already sells.
2. Build the FanFlow MCP over our own CRM (est. small — the API exists; it is a tool-definition layer).
3. Get a Fanvue developer account and prototype the official OAuth connector.
4. Legal review before any OnlyFans connector ships: consent wording, Privacy Act 2020 offshore
   disclosure, and whether the "data stored in NZ" claim survives a third-party API in the path.
5. Reconcile the "AI chat automation" pitch with OnlyFans' 2026 mandatory AI-labelling rules.

Sources: [OnlyFansAPI MCP](https://onlyfansapi.com/mcp/claude) ·
[Fanvue MCP](https://api.fanvue.com/docs/mcp-server) · [OFAuth](https://ofauth.com/) ·
[OFMAPI](https://ofmapi.com/) · [influencers.club](https://influencers.club/creator-mcp/) ·
[OnlyFansAPI review](https://ofm-tools.com/onlyfansapi-review/) ·
[OnlyFans API privacy policy report](https://list25.com/onlyfans-api-privacy-policy-creators-fans-data/)
