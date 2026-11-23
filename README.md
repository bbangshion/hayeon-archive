# HAYEON ARCHIVE — 정하연 S19

Mobile-first fan archive built by **@bbangshion**. Based on the same editorial React/Vite layout as YEONJI/SHION/CHAEWON ARCHIVE, with content and strict member filters customized for S19. This is an **unofficial** project, independent from existing hayeonarchive.com.

## First release

- Supplied, unaltered cover photo: `public/images/hayeon-home.jpg`
- Dark editorial UI + Medium Turquoise member color (`#52D9BB`)
- HOME · PROFILE · PHOTO · FILM · TIMELINE · OBJEKT · WORLD CUP · SEARCH
- KO/EN/JA navigation and mobile-responsive design
- A **single** locally supplied cover photo; selected source-linked biographical data and six verified YouTube links
- `public/data/objekt.json` is initially empty **by design**, never fake; run WAV S19 sync to populate actual cards
- No photos or objekts of unrelated members are carried over from the original project

## Deploy and data flow

1. New public GitHub repo `bbangshion/hayeon-archive`, default branch `main`.
2. Upload `HAYEON_SITE_PAYLOAD.zip` to the repository root **without extracting**.
3. Add `.github/workflows/install-hayeon.yml` from the separately supplied file.
4. Set **Settings → Actions → General → Workflow permissions → Read and write permissions**.
5. Set **Settings → Pages → Build and deployment → Source: GitHub Actions**.
6. Run **Actions → Install HAYEON ARCHIVE → Run workflow**, branch `main`.
7. Upload `deploy.yml` and `sync-s19-objekts.yml` into `.github/workflows/` separately.
8. Run **Sync HAYEON S19 Objekts from WAV ARCHIVE** once; it will commit `public/data/objekt.json` if the WAV feed is available and it contains valid S19 cards. Auto-deploy starts with the new commit.

Live URL after successful deployment: `https://bbangshion.github.io/hayeon-archive/`

### Important

- This **starter is not** the entire photo/Objekt/video archive. Don't claim unknown photos/cards or publish unrelated members' content.
- Fan websites and Fandom pages may contain copyrighted images; check the original attribution and rights before mass re-publication.
- Credentials must be kept in GitHub Secrets, not in frontend files or screenshots.
- Photo source and date fields are left blank rather than fabricated.
- To add photos, append objects to `public/data/photos.json` using the same JSON schema and stable unique IDs.
- To add YouTube entries, append verified IDs with `memberIds:["S19"]` in `public/data/films.json`.

## Original reference links

- https://www.triples-official.jp/profile/
- https://triples.fandom.com/wiki/Jeong_HaYeon
- https://triplesfans.com/members/hayeon
- https://www.youtube.com/watch?v=TvmLPQ7iBLQ

Curated and built by @bbangshion. Not affiliated with MODHAUS or tripleS.
