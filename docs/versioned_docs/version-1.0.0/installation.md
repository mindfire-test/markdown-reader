---
title: Installation
sidebar_position: 2
---

# Installation

Download the latest version from GitHub Releases:

[Open GitHub Releases](https://github.com/mindfiredigital/markdown-reader/releases)

## Windows

Download the `.exe` installer.

1. Open `Markdown Reader Setup 1.0.0.exe`
2. Follow the installer wizard
3. Launch Markdown Reader from the Start Menu or Desktop shortcut

:::note Unsigned Windows build
If Windows shows **Windows protected your PC**, click **More info** and then **Run anyway**. This can happen because the early release is not code signed yet.
:::

## macOS

Download the `.dmg` file.

1. Open the `.dmg`
2. Drag Markdown Reader into Applications
3. Launch the app from Applications

:::note Unsigned macOS build
If macOS blocks the app, right-click the app and choose **Open**. You may also need to allow it from **System Settings → Privacy & Security**.
:::

## Linux

### AppImage

```bash
chmod +x Markdown-Reader-1.0.0.AppImage
./Markdown-Reader-1.0.0.AppImage
```

### Debian / Ubuntu

```bash
sudo dpkg -i markdown-reader_1.0.0_amd64.deb
```

## File association

After installation, Markdown Reader can be selected as the default app for `.md` and `.markdown` files.

On Windows:

1. Right-click any `.md` file
2. Choose **Open with**
3. Select **Markdown Reader**
4. Enable **Always use this app**

After that, double-clicking Markdown files opens them in Markdown Reader.
