"use strict";

function inline(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*\*([^*]+)\*\*\*/g, "<strong><em>$1</em></strong>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/_([^_]+)_/g, "<em>$1</em>");
}

function plainInline(text) {
  const span = document.createElement("span");
  span.innerHTML = inline(text);
  return span.textContent;
}

function renderMarkdown(text) {
  return text
    .trim()
    .split(/\n\s*\n/)
    .filter(Boolean)
    .map((block) => {
      const lines = block.split("\n");
      if (lines.every((line) => !/^(#{1,3}\s|>\s|[-*]\s)/.test(line))) {
        return "<p>" + inline(lines.join(" ")) + "</p>";
      }
      if (lines.every((line) => /^[-*] /.test(line))) {
        return (
          "<ul>" +
          lines
            .map((line) => "<li>" + inline(line.slice(2)) + "</li>")
            .join("") +
          "</ul>"
        );
      }
      return lines
        .map((line) => {
          const heading = line.match(/^(#{1,3})\s+(.+)$/);
          if (heading) {
            const level = Math.min(heading[1].length + 1, 3);
            return `<h${level}>${inline(heading[2])}</h${level}>`;
          }
          if (line.startsWith("> "))
            return "<blockquote>" + inline(line.slice(2)) + "</blockquote>";
          return "<p>" + inline(line) + "</p>";
        })
        .join("");
    })
    .join("");
}

async function loadArticle() {
  try {
    const response = await fetch("info.md", { cache: "no-store" });
    if (!response.ok) throw new Error("Article could not be loaded.");
    const text = (await response.text())
      .replace(/^\uFEFF/, "")
      .replace(/\r\n?/g, "\n");
    const lines = text.split("\n");
    const metadata = {};
    while (lines.length) {
      const match = lines[0].match(
        /^(title|date|author|source|image|imagealt|video|caption):\s*(.*)$/i,
      );
      if (!match) break;
      metadata[match[1].toLowerCase()] = match[2].trim();
      lines.shift();
    }
    const title = metadata.title || "Community news";
    document.getElementById("headline").innerHTML = inline(title);
    const source = metadata.source || "Example Tantalon News";
    document.getElementById("source").innerHTML = inline(source);
    document.title = plainInline(title) + " | " + plainInline(source);
    document.getElementById("author").innerHTML = metadata.author
      ? "By " + inline(metadata.author)
      : "School news desk";
    document.getElementById("date").innerHTML = inline(metadata.date || "");
    renderMedia(metadata);
    document.getElementById("body").innerHTML =
      renderMarkdown(lines.join("\n")) ||
      "<p>Your article will appear here. Add your story to info.md, save, and refresh this page.</p>";
  } catch {
    document.getElementById("headline").textContent =
      "The story could not be loaded";
    document.getElementById("body").textContent =
      "The article is temporarily unavailable. Please refresh the page or try again shortly.";
  } finally {
    document.getElementById("article").setAttribute("aria-busy", "false");
  }
}

function renderMedia(metadata) {
  const content = document.getElementById("media-content");
  content.replaceChildren();
  const safeUrl = (value) => {
    if (!value) return null;
    try {
      const url = new URL(value, window.location.href);
      return ["http:", "https:"].includes(url.protocol) ? url.href : null;
    } catch {
      return null;
    }
  };
  const imageUrl = safeUrl(metadata.image);
  const videoUrl = safeUrl(metadata.video);
  if (imageUrl) {
    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = plainInline(metadata.imagealt || "Article image");
    content.append(image);
  }
  if (videoUrl) {
    const link = document.createElement("a");
    link.href = videoUrl;
    link.textContent = "Watch the video";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    content.append(link);
  }
  if (!imageUrl && !videoUrl) {
    const placeholder = document.createElement("div");
    placeholder.className = "media-placeholder";
    placeholder.textContent = "Your image or video goes here";
    content.append(placeholder);
  }
  document.getElementById("caption").innerHTML = inline(metadata.caption || "");
  document.getElementById("media").hidden = false;
}

loadArticle();
