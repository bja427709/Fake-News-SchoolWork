# Example Tantalon News

A fictional newspaper article created for an English school assignment.

## Read or edit the article

The website reads `info.md`. Edit it, save, and refresh the page to see your changes locally. The `doc/` folder contains writing and formatting instructions.

Double-click `Start News.bat` to preview on Windows with Python and Edge or Chrome. Closing the launcher also closes its dedicated newspaper window.

## Publish with GitHub Desktop

1. In GitHub Desktop, choose **File → Add local repository** and select this folder (`F:\Documents\Webpage\fake news`).
2. Review the files in **Changes**, enter a summary such as `Add school newspaper`, and click **Commit to main**.
3. Click **Publish repository**. Use a repository name such as `tantalon-news`. For free GitHub Pages hosting, uncheck **Keep this code private** and publish.
4. Open the repository on GitHub. Under **Settings → Pages**, choose **Deploy from a branch**, select **main** and **/(root)**, then **Save**.
5. Wait for GitHub to display the website URL in Pages settings.

All website files are already in the repository root. The empty `.nojekyll` file keeps `info.md` available as a Markdown file for the page to load. No build step is required. The Windows launcher is only used locally; the published website runs independently.

To update the hosted article, edit `info.md` here, commit your changes in GitHub Desktop, then click **Push origin**.
