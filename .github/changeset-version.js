/* eslint-disable no-undef */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const CHANGESET_DIR = '.changeset';

if (!fs.existsSync(CHANGESET_DIR)) {
  console.log('No updates found.');
  process.exit(0);
}

const files = fs
  .readdirSync(CHANGESET_DIR)
  .filter((f) => f.startsWith('auto-') && f.endsWith('.md'));
if (files.length === 0) {
  console.log('No automated change metadata found.');
  process.exit(0);
}

const fileContent = fs.readFileSync(path.join(CHANGESET_DIR, files[0]), 'utf8');
let bumpType = 'patch';

if (fileContent.includes('type: major')) bumpType = 'major';
else if (fileContent.includes('type: minor')) bumpType = 'minor';

console.log(`Running dynamic version increment: [pnpm version ${bumpType}]...`);
execSync(`pnpm version ${bumpType} --no-git-tag-version`);

// Append text entry directly into CHANGELOG.md cleanly
const summaryText = fileContent.split('---')[2]?.trim() || 'Internal production improvements.';
const pkgVersion = JSON.parse(fs.readFileSync('package.json', 'utf8')).version;
const changelogLine = `\n## ${pkgVersion}\n- ${summaryText}\n`;

if (fs.existsSync('CHANGELOG.md')) {
  const oldChangelog = fs.readFileSync('CHANGELOG.md', 'utf8');
  fs.writeFileSync('CHANGELOG.md', changelogLine + oldChangelog);
} else {
  fs.writeFileSync('CHANGELOG.md', changelogLine);
}

console.log('Synchronising pnpm lock file metadata...');
execSync('pnpm install --no-frozen-lockfile');

// Clean up workspace tracking files
files.forEach((f) => fs.unlinkSync(path.join(CHANGESET_DIR, f)));
console.log('Version updates completed safely.');
