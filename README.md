# Markdown Reader

A native desktop applicaion for reading Markdown files, built entirely on the JavaScript/TypeScript ecosystem using Electron as the desktop runtime.

markdown-reader is to Markdown what Adobe Acrobat Reader is to PDF:
a dedicated, native, first-class desktop viewer for .md files.

## Table of Contents

- [Why Markdown Reader?](#why-markdown-reader)

---

## Why Markdown Reader ?

### The Problem

Markdown is the most widely used plain-text writing format in the world.
Developers, writers, and teams produce millions of .md files daily.
Yet there is no dedicated desktop reader for Markdown that:

| Missing Capability                       |             Current Workaround             | Pain Level |
| :--------------------------------------- | :----------------------------------------: | ---------: |
| Opens .md files natively on double-click |   No default handler — opens as raw text   |       High |
| Renders beautifully like a document      | VS Code preview pane feels like a dev tool |     Medium |
| Has a sidebar TOC like a PDF reader      |          Manual heading scanning           |     Medium |
| Supports all Markdown features           | GitHub renders some, browsers render none  |       High |
| Works fully offline                      |        Must open a browser manually        |       High |
| Feels like a reader, not an editor       |      Every tool adds edit affordances      |     Medium |

VS Code is an editor. GitHub is a web interface. Obsidian is a note-taking vault.
None of them are just a reader — a clean, dedicated app for opening and
reading Markdown files.

### The Solution

markdown-reader is a dedicated native desktop Markdown reader:

- Double-click any .md file and it opens in markdown-reader
- Registered as the system default application for .md files on install
- Beautiful readable typography — not a developer tool aesthetic
- Full Markdown support: code, diagrams, math, tables, task lists, callouts
- Auto-generated table of contents sidebar like a PDF reader
- File watching — live reload when the file is edited externally
- Multiple built-in themes
- Fully offline — zero cloud, zero telemetry, zero accounts
- Built entirely on the JS/TS ecosystem — no Rust, no Go, no C++

## Features

- Native desktop Markdown reader
- Fully offline-first experience
- GitHub Flavored Markdown (GFM) support
- Live file watching & auto reload
- Multiple built-in themes
- Syntax highlighting with Shiki
- KaTeX math rendering
- Mermaid diagram support
- In-document search
- Sidebar Table of Contents
- File explorer & recent files
- Keyboard shortcuts
- Native OS integration
- Cross-platform builds

---

## Supported Markdown Features

- Headings (H1–H6)
- Ordered & unordered lists
- Task lists
- Blockquotes
- Tables
- Horizontal rules
- Inline code
- Fenced code blocks
- Images
- Links
- Footnotes
- Inline HTML
- Mermaid diagrams
- KaTeX math

---

## Tech Stack

| Layer               | Technology    |
| ------------------- | ------------- |
| Desktop runtime     | Electron      |
| Frontend            | React         |
| Language            | TypeScript    |
| Build tool          | electron-vite |
| Styling             | Tailwind CSS  |
| Markdown parser     | Marked        |
| Syntax highlighting | Shiki         |
| Math rendering      | KaTeX         |
| Diagram rendering   | Mermaid       |
| Testing             | Vitest        |
| Package manager     | pnpm          |

---

## Project Structure

```
markdown-reader/
├── apps/
│   ├── main-processor/
│   ├── preload/
│   └── renderer/
│
├── packages/
│   ├── shared-constants/
│   └── shared-types/
│
├── assets/
├── release/
└── .github/
```

---

## Development Setup

### 1. Clone Repository

```bash
git clone https://github.com/mindfire-test/markdown-reader
cd markdown-reader
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Start Development Server

```bash
pnpm dev
```

---

## Available Scripts

### Development

```bash
pnpm dev
```

Starts Electron + Vite development environment.

### Production Build

```bash
pnpm build
```

Builds Electron main, preload, and renderer processes.

### Create Local Installer

```bash
pnpm dist
```

Builds production installer locally without publishing.

### Publish Release

```bash
pnpm dist:publish
```

Builds and publishes release artifacts to GitHub Releases.

### Run Tests

```bash
pnpm test
```

### Run Coverage

```bash
pnpm test:coverage
```

### Run Lint

```bash
pnpm lint
```

### Run Typecheck

```bash
pnpm typecheck
```

---

## Release Workflow

This project uses GitHub Actions for CI/CD.

### CI Pipeline

Runs automatically on:

- Pull requests
- Pushes to `main` & `dev`

Checks include:

- Build
- Lint
- Typecheck
- Tests

### Release Pipeline

Production releases are created using Git tags.

**Example:**

```bash
git tag v1.0.0
git push origin v1.0.0
```

This automatically:

- Builds installers
- Creates GitHub Release
- Uploads release artifacts

### Supported Release Formats

| Platform | Format              |
| -------- | ------------------- |
| Windows  | `.exe`              |
| Linux    | `.AppImage`, `.deb` |
| macOS    | `.dmg`              |

---

## Keyboard Shortcuts

| Shortcut           | Action                        |
| ------------------ | ----------------------------- |
| `Ctrl / Cmd + O`   | Open File                     |
| `Ctrl / Cmd + F`   | Search                        |
| `Ctrl / Cmd + +`   | Zoom In                       |
| `Ctrl / Cmd + -`   | Zoom Out                      |
| `Ctrl / Cmd + 0`   | Reset Zoom                    |
| `Ctrl / Cmd + T`   | Switch Theme                  |
| `Cmd/Ctrl+Shift+O` | Open folder                   |
| `Cmd/Ctrl+W`       | Close current tab             |
| `Ctrl+ [`          | Toggle TOC sidebar            |
| `Ctrl + \`         | Backslash Toggle file browser |
| `Ctrl+Tab`         | Next tab                      |
| `Ctrl+Shift+Tab`   | Previous tab                  |

---

## Themes

- GitHub Light
- GitHub Dark
- Dracula
- Nord
- Notion
- Minimal

---

## License

ISC License

---

## Author

**Mindfire Digital**

---

## Future Roadmap

- PDF export
- HTML export
- Multi-tab support improvements
- Plugin system
- Workspace support
- Better Mermaid rendering
- Performance optimizations
- Accessibility improvements
