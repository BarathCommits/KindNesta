#!/usr/bin/env bash
# Re-provision the GitHub Pages TLS certificate for kindnesta.com.
#
# Required: GitHub CLI authenticated as a repo admin (BarathCommits), e.g.:
#   gh auth login
#   ./scripts/fix-pages-ssl.sh
#
# Why: when Pages serves the generic *.github.io cert for the custom domain,
# browsers show a certificate error. Clearing and re-adding the domain restarts
# Let's Encrypt provisioning. Actions GITHUB_TOKEN cannot do this (needs admin).

set -euo pipefail

REPO="${REPO:-BarathCommits/KindNesta}"
DOMAIN="${DOMAIN:-kindnesta.com}"

need_admin() {
  echo "error: this must be run with a GitHub token that can manage Pages settings" >&2
  echo "       (repo admin). In Actions, GITHUB_TOKEN is not enough." >&2
  echo "       Run locally: gh auth login && $0" >&2
  exit 1
}

echo "==> Checking auth for $REPO"
gh api "repos/$REPO" --jq '.permissions.admin' | grep -qx true || need_admin

echo "==> Current Pages settings"
gh api "repos/$REPO/pages" | jq '{cname, https_enforced, https_certificate, html_url}'

echo "==> Clearing custom domain (restarts certificate flow)"
printf '%s\n' '{"cname":null,"https_enforced":false}' \
  | gh api --method PUT "repos/$REPO/pages" --input -

echo "==> Waiting 20s"
sleep 20

echo "==> Re-adding $DOMAIN"
printf '%s\n' "{\"cname\":\"$DOMAIN\",\"https_enforced\":false}" \
  | gh api --method PUT "repos/$REPO/pages" --input -

echo "==> Waiting for Let's Encrypt approval (up to ~20 minutes)"
for i in $(seq 1 60); do
  payload=$(gh api "repos/$REPO/pages")
  state=$(printf '%s' "$payload" | jq -r '.https_certificate.state // "missing"')
  domains=$(printf '%s' "$payload" | jq -r '.https_certificate.domains // [] | join(",")')
  echo "  [$i/60] state=$state domains=$domains"
  case "$state" in
    approved)
      echo "==> Certificate approved — enabling Enforce HTTPS"
      printf '%s\n' "{\"cname\":\"$DOMAIN\",\"https_enforced\":true}" \
        | gh api --method PUT "repos/$REPO/pages" --input -
      gh api "repos/$REPO/pages" | jq '{cname, https_enforced, https_certificate, html_url}'
      echo
      echo "Done. Verify: curl -I https://$DOMAIN"
      exit 0
      ;;
    errored|bad_authz)
      echo "error: certificate provisioning failed (state=$state)" >&2
      printf '%s\n' "$payload" | jq . >&2
      echo "Check DNS A/AAAA for apex and CNAME for www → barathcommits.github.io" >&2
      exit 1
      ;;
  esac
  sleep 20
done

echo "error: timed out waiting for certificate approval" >&2
gh api "repos/$REPO/pages" | jq . >&2
exit 1
