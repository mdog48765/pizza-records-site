import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

function run(cmd) {
  console.log(`\n> ${cmd}`);
  execSync(cmd, { stdio: "inherit" });
}

function getCurrentBranch() {
  try {
    return execSync("git rev-parse --abbrev-ref HEAD").toString().trim();
  } catch {
    return "unknown";
  }
}

function hasUncommittedChanges() {
  try {
    const out = execSync("git status --porcelain").toString().trim();
    return out.length > 0;
  } catch {
    return true;
  }
}

function bumpPatchVersion(version) {
  const parts = version.split(".");
  if (parts.length !== 3) return version;
  const [major, minor, patch] = parts.map((n) => parseInt(n, 10) || 0);
  const nextPatch = patch + 1;
  return `${major}.${minor}.${nextPatch}`;
}


const args = process.argv.slice(2);
const extraMessage = args.length > 0 ? args.join(" ") : "";

console.log("🚀 Pizza Records – Release Pipeline with Versioning\n");

const branch = getCurrentBranch();
console.log(`Current git branch: ${branch}`);

if (branch !== "main") {
  console.log(
    "⚠️  You are not on 'main'. This will still run, but remember Vercel is watching the main branch."
  );
}

if (!hasUncommittedChanges()) {
  console.log("✅ No uncommitted changes detected. Nothing to release.");
  process.exit(0);
}

console.log("\nReading package.json…");
const pkgRaw = readFileSync("package.json", "utf8");
const pkg = JSON.parse(pkgRaw);

const oldVersion = pkg.version || "0.0.0";
const newVersion = bumpPatchVersion(oldVersion);

pkg.version = newVersion;
writeFileSync("package.json", JSON.stringify(pkg, null, 2) + "\n");

console.log(`🔢 Version bumped: ${oldVersion} → ${newVersion}`);

console.log("\nRunning production build…");
try {
  run("npm run build");
  console.log("\n✅ Build completed successfully.");
} catch (err) {
  console.error("\n❌ Build failed. Version was bumped, but nothing was committed or pushed.");
  console.error("   Fix the errors above, then run: npm run release");
  process.exit(1);
}

console.log("\nStaging changes…");
run("git add .");

let commitMessage = `chore: release v${newVersion}`;
if (extraMessage) {
  commitMessage += ` – ${extraMessage}`;
}

console.log(`\nCommitting with message: "${commitMessage}"`);
try {
  run(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`);
} catch (e) {
  console.log("⚠️  git commit failed (maybe nothing to commit). Continuing…");
}

const tagName = `v${newVersion}`;
console.log(`\nTagging release: ${tagName}`);
try {
  run(`git tag ${tagName}`);
} catch (e) {
  console.log("⚠️  Failed to create tag (it may already exist). Continuing…");
}

console.log("\nPushing to origin with tags…");
run("git push --follow-tags");

console.log(`
✅ Release complete.

- Version: v${newVersion}
- Code + tag pushed to GitHub.
- Vercel will detect the push to 'main', build, and deploy the updated site.
`);
