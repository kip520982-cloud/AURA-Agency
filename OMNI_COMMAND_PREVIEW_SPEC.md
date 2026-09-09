# Aura Omni Command Preview

The Omni Command workspace is Aura's white-label operations console for a multi-platform creator agency. It is a local UI prototype and does not connect to social, creator, payment, or messaging accounts.

## Four-zone layout

1. **Account rail**: creator quick-switcher with account-health indicators.
2. **Core app navigation**: Multi-Scheduler, Dynamic Rotator, Unified AI Inbox, CRM & Fans, Vault Management, and Financial Splitter.
3. **Workspace canvas**: the selected app view remains inside the command surface.
4. **Context panel**: shown in Unified Inbox for fan value, purchase, interest, and vault-injection context.

## Preview interactions

| Area | Included preview interaction |
| --- | --- |
| Account rail | Switch the visible creator context |
| Scheduler | Select a day, channel toggles, increment queued-post count |
| Dynamic Rotator | Adjust OnlyFans/Fansly weighting and inspect privacy and audience rules |
| Unified AI Inbox | Select conversations and edit an AI reply draft |
| CRM & Fans | Search the fan matrix |
| Vault | Select media assets and see asset checks and destination fit |
| Financial Splitter | Read transparent creator/agency split and payout status |

## Future implementation contract

The backend should be built as a creator-authorised, multi-tenant service. Each source account needs a creator record, a scoped connection state, a data retention rule, an audit trail, and a safe error state. Raw credentials and message contents must not be used in this preview.

The first live build order is: account and creator tenancy; secure source connections; media vault; scheduler; data bridge and analytics; inbox; routing; payouts. Each surface should remain useful if a platform connection is unavailable.
