/* eslint-disable no-undef */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const CHANGESET_DIR = '.changeset';

if (fs.existsSync(CHANGESET_DIR)) {
  const existing = fs.readdirSync(CHANGESET_DIR).filter((f) => f.endsWith('.md'));
  if (existing.length > 0) {
    console.log('Changeset already exists, skipping generation');
    process.exit(0);
  }
} else {
  fs.mkdirSync(CHANGESET_DIR);
}

const commitMessage = execSync('git log -1 --format=%s').toString().trim();
console.log(`Processing commit message: "${commitMessage}"`);

const isBreaking = /!:/.test(commitMessage) || commitMessage.includes('BREAKING CHANGE');
let changeType = null;

if (isBreaking) {
  changeType = 'major';
} else if (/^feat(\(.+\))?:/.test(commitMessage)) {
  changeType = 'minor';
} else if (/^fix(\(.+\))?:/.test(commitMessage) || /^perf(\(.+\))?:/.test(commitMessage)) {
  changeType = 'patch';
}

if (changeType) {
  const summary = commitMessage.replace(/^[a-z]+(\(.+\))?!?:\s*/i, '').trim();
  const changesetContent = `---\ntype: ${changeType}\n---\n${summary}\n`;

  fs.writeFileSync(path.join(CHANGESET_DIR, `auto-${Date.now()}.md`), changesetContent);
  console.log(`Changeset created → ${changeType}`);
} else {
  console.log('No valid convention commit found (feat, fix, perf). Skipping.');
}
