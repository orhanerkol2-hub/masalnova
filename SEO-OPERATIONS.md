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

`editorialStatus: approved` is not a quality-core decision. Classify every URL
separately after comparing it with similar titles:

```yaml
qualityTier: core # A: distinctive quality inventory
# qualityTier: review # B: noindex, improve later
# qualityTier: retire # C: merge, rewrite or remove
qualityReviewedAt: "YYYY-MM-DD"
parentAgeGuidance: "Page-specific age rationale..."
parentEmotionalNotes: "Scenes that may need explanation..."
parentMessage: "What this exact plot conveys..."
parentEverydayUse: "How to connect it to the child's day..."
discussionQuestions: ["Scene-specific question 1?", "Scene-specific question 2?", "Question 3?"]
activity: "One story-specific follow-up activity."
```

Until classification is complete, unclassified short, bedtime, sub-320-word
and under-three-minute stories are excluded from discovery as an interim risk
control. `review` and `retire` are always excluded. A story can request ads only
after explicit `core` classification and completion of the individual parent
fields above. These are MasalNova controls, not Google word-count rules.

## Ebeveyn Rehberi release gate

New parent guides start with an organisational draft author and stay outside
the sitemap while their actual authorship and review are unresolved:

```yaml
author: "masalnova-redaksiyonu"
editorialStatus: "needs_review"
```

After a real named author has taken responsibility for the text, checked every
source and both listed editors have actually reviewed it, replace the draft
author, add the real `reviewedBy` tuple and set `editorialStatus: approved`.
The guide hub becomes indexable only when at least eight guides have completed
that process. Drafts are always `noindex`, absent from the sitemap and ad-free.

## Pedagogical quality-core workflow

The binding review criteria are documented in `PEDAGOGICAL-QUALITY-STANDARD.md`.
The first balanced candidate set lives in `src/data/quality-core-candidates.mjs`:
20 educational stories, 20 animal stories and 20 Keloğlan stories.

Each candidate needs an individual age rationale, emotional-content note,
nuanced message, everyday application, exactly three plot-specific questions,
a safe optional activity and a manually assessed emotional-intensity value.
The publishing audit checks minimum substance, visible story anchors, duplicate
copy and unsupported educational or therapeutic promises.

Completing those fields is not a human approval. Only after a real editor has
read the entire story and documented the review may `qualityTier: core` and a
real `qualityReviewedAt` date be added. Without both values, the story remains
ad-free and an incomplete `core` classification remains `noindex`, regardless
of its older editorial status.

When `PUBLIC_QUALITY_CORE_REVIEWED=true`, the transitional indexing fallback
also closes: regular stories without `qualityTier: core` become `noindex` and
leave sitemap and discovery surfaces. Properly sourced Islamic retellings keep
their separate source-based eligibility gate.

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
