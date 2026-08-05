# MasalNova AdSense and Google CMP checklist

## Current safe deployment state (5 August 2026)

Google Privacy & messaging is the selected Google-certified CMP. The account
message is published for `masalnova.com` with Turkish as the default language
and German among the additional languages. The message provides consent,
refusal and settings choices; closing the message also refuses consent.

The following account settings were verified before enabling the publisher
tag:

- Auto ads, in-page automatic formats and all overlay formats are off.
- Limited ads, user-based advertising and Google first-party advertising cookies are
  blocked; sharing the full IP address with ad buyers is blocked.
- Consent optimisation and advertising Consent Mode integration are off.
- Legitimate interest and special feature 2 (device scanning) are off.
- Creative consent verification is on.
- The provider list contains only the mandatory Google Advertising Products
  entry.
- Future sites default to Google's three-choice CMP message.
- Child-directed treatment remains forced in code with TFAT `1`.

The production build deliberately uses this split state:

```text
PUBLIC_ADSENSE_TAG_ENABLED=true
PUBLIC_GOOGLE_CMP_PUBLISHED=true
PUBLIC_ADSENSE_MANUAL_ONLY=true
PUBLIC_ADSENSE_ENABLED=false
```

The first three values allow the publisher tag to display the CMP and support
site review on the homepage, parent-facing colouring information pages and
editorially approved regular story pages. `PUBLIC_ADSENSE_ENABLED=false`,
together with empty slot IDs, prevents every manual `<ins class="adsbygoogle">`
unit from rendering. These environment values merely assert settings already
made in AdSense; they cannot configure or enforce the account-side controls.

## Before enabling manual ads

1. Wait for AdSense site approval. Do not infer approval from a successful CMP
   test or from the publisher tag being present.
2. Reconfirm in AdSense that Auto ads and every overlay format are still off.
   Also reconfirm that limited ads, user-based advertising, Google first-party advertising
   cookies and full-IP sharing with buyers remain blocked.
3. Reconfirm the published Google CMP message, its three choices, Turkish and
   German text, minimal provider list, disabled legitimate interest, disabled
   advertising Consent Mode and disabled special feature 2.
4. Keep the TFAT child-directed signal in `BaseHead.astro` before the publisher
   tag and `data-tag-for-age-treatment="1"` on every manual request.
5. Create and review only the five allowlisted manual placements in
   `AdSlot.astro`, then add their numeric IDs to:
   `PUBLIC_ADSENSE_HOME_FEED_SLOT`, `PUBLIC_ADSENSE_HOME_CONTENT_SLOT`,
   `PUBLIC_ADSENSE_BOYAMA_INDEX_SLOT` and
   `PUBLIC_ADSENSE_BOYAMA_DETAIL_SLOT` and `PUBLIC_ADSENSE_STORY_GUIDE_SLOT`.
6. Keep story monetisation limited to editorially approved regular stories:
   exactly one unit after the complete parent guide, at least 320 words and a
   reading time of at least three minutes. Short (`kisa`), bedtime (`uyku`) and
   İslami stories are excluded. Never insert an ad inside the prose or beside
   reader controls. Story archives, games, gameplay, videos, search, account-like
   tools, legal/trust pages and `/boyama/[slug]/boya/` stay entirely ad-free.
7. Test the CMP as a new EEA visitor: accept, refuse, open settings, close as
   refusal, and reopen the message through “Gizlilik ve çerez ayarları”. Test
   Turkish and German, keyboard use, focus, mobile layout and zoom.
8. Confirm that refusal never blocks stories, colouring downloads or games,
   and that no ad appears near interactive controls or as an overlay.
9. Run a production-like build and audit before changing the final switch:

   ```sh
   PUBLIC_ADSENSE_TAG_ENABLED=true \
   PUBLIC_GOOGLE_CMP_PUBLISHED=true \
   PUBLIC_ADSENSE_MANUAL_ONLY=true \
   PUBLIC_ADSENSE_ENABLED=false \
   npm run build:optimized && npm run audit:publishing -- --built
   ```

10. Only after all checks and approval, change `PUBLIC_ADSENSE_ENABLED` to
    `true`. Repeat the audit and browser tests. Unknown placements, blank or
    malformed slot IDs continue to fail closed.

These safeguards reduce accidental policy and privacy risk; they do not
guarantee AdSense approval or replace an individual legal review.

Official references:

- https://support.google.com/adsense/answer/13554116
- https://support.google.com/adsense/answer/16918505
- https://support.google.com/adsense/answer/12226986
- https://support.google.com/adsense/answer/9804260
- https://support.google.com/adsense/answer/10960768
- https://support.google.com/adsense/answer/16053245
- https://support.google.com/adsense/answer/16878447
- https://support.google.com/adsense/answer/17042704
- https://support.google.com/adsense/answer/9261805
- https://support.google.com/adsense/answer/14210870
