/* eslint-disable no-undef */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const PACKAGE_NAME = 'markdown-reader';
const CHANGESET_DIR = '.changeset';

const commitMessage = execSync('git log -1 --format=%s').toString().trim();

const rules = [
  { type: 'major', regex: /!:|BREAKING CHANGE/i },
  { type: 'minor', regex: /^feat(\(.+\))?:/ },
  { type: 'patch', regex: /^fix(\(.+\))?:/ },
  { type: 'patch', regex: /^perf(\(.+\))?:/ },
];

const changeType = rules.find((rule) => rule.regex.test(commitMessage))?.type;

if (!changeType) {
  console.log('No changeset needed.');
  process.exit(0);
}

if (!fs.existsSync(CHANGESET_DIR)) {
  fs.mkdirSync(CHANGESET_DIR);
}

const existing = fs
  .readdirSync(CHANGESET_DIR)
  .filter((file) => file.endsWith('.md') && !file.startsWith('README'));

if (existing.length > 0) {
  console.log('Changeset already exists. Skipping.');
  process.exit(0);
}

const summary = commitMessage.replace(/^[a-z]+(\(.+\))?!?:\s*/i, '').trim();

const content = `---
"${PACKAGE_NAME}": ${changeType}
---

${summary}
`;

fs.writeFileSync(path.join(CHANGESET_DIR, `auto-${Date.now()}.md`), content);
console.log(`Created ${changeType} changeset.`);
