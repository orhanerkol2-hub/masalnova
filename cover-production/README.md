# MasalNova Cover Production

Goal: replace emoji placeholders with story-specific, character-consistent thumbnail covers that still work at small card size.

## Production Standard

- Final files go in `public/covers/stories/<slug>.webp`.
- Story frontmatter uses `coverImage: "/covers/stories/<slug>.webp"`.
- Prompt pack is generated with `npm run gen:covers`.
- After generated PNG/JPEG files exist, run `npm run optimize:covers`.
- After WebP files exist, run `npm run apply:covers`.
- Then run `npm run build`.

## Visual Direction

- Premium Turkish children's-book illustration.
- Each image must depict a specific moment from that story, not a generic fairy-tale background.
- Recurring archetypes keep consistent clothing, color accents, age, and shape language.
- Thumbnail composition: one clear focal action, large readable eyes/faces, strong silhouette, high contrast.
- Leave top-left and top-right corners free for existing site badges.
- No in-image text, logo, watermark, frame, weapons, frightening expressions, or dark horror mood.

## Batch Workflow

1. `npm run gen:covers`
2. Use `cover-production/story-cover-prompts.jsonl` or `.csv` in the image generation workflow.
3. Save selected finals under `public/covers/stories/` using the story slug.
4. `npm run optimize:covers`
5. `npm run apply:covers`
6. `npm run build`

For a small validation batch first:

```bash
node scripts/generate-cover-briefs.mjs --limit=20
```
