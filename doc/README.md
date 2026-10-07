# Example Tantalon News

A local-only, fictional newspaper for a school project.

## Open the page

Double-click `Start News.bat` in the project folder. It automatically opens the newspaper in a separate Edge or Chrome window. Close the launcher window, or press Ctrl+C inside it, to stop the server and close that newspaper window. Your other browser windows remain open. Python and Edge or Chrome are required (they are installed on this computer).

## Write your article

Edit `info.md` in a text editor. Keep the first three lines in this format:

```md
Title: Your headline
Date: October 7, 2026
Author: Your Name

Your first paragraph goes here.

Your next paragraph goes here.
```

The supplied `info.md` has spaces for every required part of the assignment: a news source, date, headline, the five Ws, four paragraphs, two or three attributed interview quotes, and an image or video. Keep your quotes in addition to the four paragraph spaces. Replace the bracketed prompts with your own writing; remove the third quote if you only use two.

`Source:` changes the newspaper name. For an image, place a picture in this folder and fill in `Image: photo.jpg` (use its actual filename). Fill in `ImageAlt:` with a description and `Caption:` with its caption and credit. Alternatively, fill in `Video:` with a video URL; it displays a watch link. Leave unused media fields blank. Until you add media, the page shows a space reserved for it.

Save the file and refresh the browser to see your changes. The date displays exactly as written. Separate paragraphs with a blank line. Supported formatting: `## Heading`, `### Smaller heading`, `**bold**`, `*italic*`, `> Quote`, and lists using `- Item` on each line. HTML is displayed as text. This page shows one article at a time.

## School submission

Bold (`**text**`), italic (`*text*` or `_text_`), and bold italic (`***text***`) also work in the title, source, author, date, and caption. The webpage displays the styled words without those markers; the browser tab title displays plain words. Formatting markers remain in `info.md` so you can edit them.

The teacher's sheet requires the article to be done in Google Docs, with at least three to four paragraphs and two to three interview quotes. Use `Google Docs Template.txt` as a copyable outline, or copy your finished article from the webpage into Google Docs and insert your image/video there. The story must be invented, and the rubric also awards marks for originality and creativity. The reverse-side persuasive writing rubric was not included in the supplied screenshot.

## Files

- `index.html`: page structure and newspaper name.
- `styles.css`: responsive newspaper styling.
- `app.js`: loads metadata and safely formats the article from `info.md`.
- `info.md`: editable article.
- `Start News.bat`: double-click launcher.
- `launch.py`: serves the page on an available local port and opens a dedicated browser window. A Windows job object closes its browser processes when the launcher exits, including when the console window is closed. Each launch uses an isolated profile in the Windows temporary folder.

Opening `index.html` directly cannot load the article in most browsers; use the launcher. The server selects an available port automatically and accepts connections only from this computer.

## GitHub Pages

The project root is ready for static hosting. Keep `.nojekyll` tracked so GitHub serves `info.md` unchanged. HTML, CSS, JavaScript, article text, and the image use relative paths and work beneath a repository URL. See the root `README.md` for GitHub Desktop publishing steps. `launch.py` and `Start News.bat` are only needed for local previews.
