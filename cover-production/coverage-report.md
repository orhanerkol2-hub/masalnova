# Cover Production Coverage

- Stories in repository: 491
- Stories in this prompt pack: 491
- Already have coverImage in frontmatter: 65
- Matching image files already in public/covers/stories: 65
- Target image format: /covers/stories/<slug>.webp

## By Category

- egitici: 97
- hayvan: 98
- keloglan: 100
- kisa: 96
- uyku: 100

## Next Steps

1. Generate images from story-cover-prompts.jsonl or story-cover-prompts.csv.
2. Save generated PNG/JPEG files under public/covers/stories/ using the story slug.
3. Run npm run optimize:covers to create lightweight WebP files.
4. Run npm run apply:covers to add coverImage and altText to stories that have matching files.
5. Run npm run build.
