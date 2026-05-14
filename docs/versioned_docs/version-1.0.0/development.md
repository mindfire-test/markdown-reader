---
title: Development Setup
sidebar_position: 6
---

# Development Setup

## Requirements

- Node.js 22+
- pnpm 10+
- Git

Check versions:

```bash
node -v
pnpm -v
git --version
```

## Install dependencies

```bash
pnpm install
```

## Start development app

```bash
pnpm dev
```

## Build production output

```bash
pnpm build
```

Build output is generated in:

```txt
out/
```

## Package desktop app

```bash
pnpm dist
```

Release artifacts are generated in:

```txt
release/
```

## Quality checks

```bash
pnpm typecheck
pnpm lint
pnpm test
```

## Release scripts

```bash
pnpm changeset
pnpm version-packages
pnpm dist:publish
```

Normal CI builds should use `pnpm dist`, which does not publish.

Release builds should use `pnpm dist:publish`, which uploads artifacts to GitHub Releases.
