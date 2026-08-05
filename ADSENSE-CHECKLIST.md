# MasalNova AdSense activation checklist

AdSense remains disabled unless `PUBLIC_ADSENSE_ENABLED`,
`PUBLIC_GOOGLE_CERTIFIED_CMP` and `PUBLIC_ADSENSE_MANUAL_ONLY` are all set to
`true`.

Before activation:

1. Configure a Google-certified TCF CMP for EEA, UK and Swiss visitors (Google
   Privacy & messaging is one option).
2. Mark MasalNova as child-directed for age-restricted treatment in Google's
   site-level controls. The code also sets `google_tag_for_age_treatment = 1`
   before the AdSense loader and every manual ad request sends
   `data-tag-for-age-treatment="1"`. Do not offer ad personalisation in the CMP;
   keep both safeguards in place and migrate to Google's unified TFAT API when
   AdSense supports it for this integration.
3. Disable Auto ads and every overlay format account-wide. MasalNova permits
   only the four reviewed manual placements listed in `AdSlot.astro`. Set
   `PUBLIC_ADSENSE_MANUAL_ONLY=true` only after confirming that account-side
   setting; the environment flag cannot disable Auto ads by itself.
4. Keep the Google CMP's optional Consent Mode integration from overwriting
   the separate analytics choice, or migrate analytics into the certified CMP
   before activation. Test both acceptance and rejection paths.
5. Add the Boyama slot IDs to `PUBLIC_ADSENSE_BOYAMA_INDEX_SLOT` and
   `PUBLIC_ADSENSE_BOYAMA_DETAIL_SLOT`.
6. Keep `/boyama/[slug]/boya/` entirely ad-free. The interactive canvas and
   its colors, tools and action buttons must never be surrounded by, overlaid
   with or interrupted by ads.
7. Enable all three environment flags only after the CMP, manual-only and slot
   setup is live.
8. Review the site in Google's Ad Experience Report before launch and after
   meaningful layout changes.
9. Keep drafts, `needs_review`, undersized/noindex pages, games, search,
   account-like tools, trust/legal pages and İslami Hikâyeler ad-free. The
   publishing audit fails if a protected story or the İslami index exposes
   any AdSense loader, request, container or eligibility signal.
10. Use numeric AdSense slot IDs only. Unknown placements and malformed slot
   IDs fail closed and do not render an ad container.
11. Run `npm run build:optimized` and `npm run audit:publishing -- --built`
   before every advertising release. The optimized build also regenerates the
   responsive homepage images. Do not activate ads if either command fails.

The technical safeguards reduce policy risk but do not guarantee AdSense
approval. Account-level CMP, age-treatment, content and traffic reviews remain
Google-controlled requirements.

Official references:

- https://support.google.com/adsense/answer/13554116
- https://support.google.com/adsense/answer/3248194
- https://support.google.com/adsense/answer/17042704
- https://support.google.com/adsense/answer/9261805
- https://support.google.com/adsense/answer/1346295
- https://support.google.com/publisherpolicies/answer/11035030
