# Aura Data Intelligence Foundation

Aura rebuilds the useful operating patterns from the two locally cloned reference projects in Aura's own product language and UI. It does not copy their screens, branding, account credentials, or source-specific automation.

## Product surfaces

- **Inbox Command**: conversation triage, AI-assist review, operator notes, and priority queues.
- **Conversation Intelligence**: response-time, coverage, engagement, topic, and sentiment summaries with clear date-window context.
- **Creator Data Bridge**: local companion setup, creator consent, scoped sharing, sync state, auditability, and data controls.
- **AI Persona and Knowledge Base**: creator-controlled guidance for any assistant feature.
- **Content Protection**: separate creator-owned evidence and takedown workflow.

## Data boundary

The first live integration should be local-first. The creator installs a companion that reads only data the creator can already view in their own signed-in session. It stores the raw source data locally, produces an account-scoped analytics document, and exposes only the creator-approved derived fields to Aura.

Aura must never request or store a platform password, session cookie, or full message history by default. Raw conversation text requires a separate, explicit opt-in and an audit record.

## Required implementation phases

1. Define Aura's versioned analytics contract: account reference, date window, response timing, engagement, topics, sentiment, unread count, priority score, and provenance.
2. Build the local companion with encrypted persistence, consent receipt, export, deletion, and reconnect/resync behaviour.
3. Add authenticated, least-privilege bridge sessions between the companion and Aura.
4. Replace the present fixture data with validated bridge updates and clear stale/partial-data UI states.
5. Add creator controls for account selection, retention, sharing scope, and disabling access.

## Reference handling

The implementation is a clean Aura rebuild informed by the architectures of `onlyfClient` and `onlyfans-conversational-analytics`. Do not copy their visual design, platform identity, or account automation. If any MIT-licensed source from `onlyfans-conversational-analytics` is later incorporated, retain its copyright and licence notice as required by that licence.
