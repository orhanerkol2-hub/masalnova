# MasalNova AdSense activation checklist

AdSense remains disabled unless both `PUBLIC_ADSENSE_ENABLED` and
`PUBLIC_GOOGLE_CERTIFIED_CMP` are set to `true`.

Before activation:

1. Configure a Google-certified TCF CMP for EEA, UK and Swiss visitors (Google
   Privacy & messaging is one option).
2. Mark MasalNova or its child-directed sections for child age treatment in
   Search Console/AdSense. Every prepared Boyama ad request also sends
   `data-tag-for-age-treatment="1"`.
3. Add the Boyama slot IDs to `PUBLIC_ADSENSE_BOYAMA_INDEX_SLOT` and
   `PUBLIC_ADSENSE_BOYAMA_DETAIL_SLOT`. Add one horizontal banner slot to
   `PUBLIC_ADSENSE_BOYAMA_FOCUS_TOP_SLOT`.
4. Keep the `/boyama/[slug]/boya/` banner at the prepared top placement. It
   must not become sticky, overlay the canvas, auto-refresh, or move beside the
   canvas, colors, tools, or action buttons.
5. Enable the two environment flags only after the CMP and slot setup is live.
6. Review the site in Google's Ad Experience Report before launch and after
   meaningful layout changes.

Official references:

- https://support.google.com/adsense/answer/13554116
- https://support.google.com/adsense/answer/3248194
- https://support.google.com/adsense/answer/1346295
- https://support.google.com/publisherpolicies/answer/11035030
