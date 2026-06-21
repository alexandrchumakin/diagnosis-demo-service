#!/usr/bin/env bash
set -euo pipefail

branch_name="${1:-bug/restrict-customer-email}"
repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$repo_root"

if ! git rev-parse --verify HEAD >/dev/null 2>&1; then
  echo "Create and commit the clean main branch first, then run this script." >&2
  exit 1
fi

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "Working tree must be clean before creating the bug branch." >&2
  exit 1
fi

git switch -c "$branch_name"
git apply bug-restrict-customer-email.patch

echo "Created $branch_name with the demo bug."
echo "Review, commit manually, then push the branch and open a PR to main."
