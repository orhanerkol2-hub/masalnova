# MasalNova SEO operations

## Editorial release gate

Every new story is written and added manually. Start each new story with:

```yaml
editorialStatus: draft
```

Draft and `needs_review` stories are built so an editor can preview their URL, but they receive
`noindex, follow`, are excluded from public story discovery, and are omitted from the XML sitemap.
There is no automatic story creation or automatic rewriting step. An editor writes and revises the
story manually and only sets the status below after checking plot, title overlap, summary, Turkish,
age, cover, internal links and parent value:

```yaml
editorialStatus: approved
modifiedAt: "YYYY-MM-DD"
```

Update `modifiedAt` only when the main story or its substantive editorial guidance changes.

## Search placeholder removal

The obsolete `WebSite.SearchAction` has been removed. All real `/ara/` result pages return
`noindex, follow` and `/ara/` is excluded from the sitemap.

This repository is deployed as a static GitHub Pages site. GitHub Pages cannot return a different
HTTP status for one query-string value, so the exact request below still needs an edge/hosting rule
if a real `410 Gone` response is required:

```text
/ara/?q={search_term_string}
```

Recommended operational sequence:

1. Add an exact-match 410 rule at the CDN or future application server. Do not block `/ara/` in
   `robots.txt`.
2. Use Google Search Console → Removals to temporarily hide the placeholder URL.
3. Inspect the URL after deployment and request validation once Google can see the 410 response.
4. Keep ordinary searches crawlable so Google can read their `noindex` directive.

## Content cleanup queue

Review repetitive clusters in this order: Balıkçı Sadık, Nine, Dede, Işıltılı Saray, Ay Işığı,
Altın Tarla, then one-to-two-minute stories. Record one decision per URL:

- **A — retain:** distinctive and useful; keep indexed and improve.
- **B — rewrite:** set `editorialStatus: needs_review` until the rewrite is approved.
- **C — merge:** move the strongest unique material into the best URL, then add a real 301 at the
  hosting layer from the retired URL.
- **D — remove:** delete only after deciding whether the old URL should return 410.

Never redirect unrelated retired stories to the homepage and do not use cross-story canonicals as
a substitute for a merge or redirect.

## Search Console checks after deployment

- Submit `https://masalnova.com/sitemap-index.xml`.
- Inspect `/`, `/masallar/`, one category page, one pagination page, one exact-age page, one topic
  page and one story page.
- Confirm the old placeholder URL leaves the index.
- Compare Core Web Vitals separately for home, category and story templates.
- Use 90-day query and click data before removing older stories solely for low traffic.
