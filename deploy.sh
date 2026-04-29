#!/usr/bin/env bash
# World Cup H5 一键部署 · Vercel + 自定义域名
# 用法：从项目根目录运行 `./deploy.sh`，或从任意目录 `bash /path/to/deploy.sh`
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
APP_DIR="$ROOT/worldcup"
DOMAIN="worldcup.jekae.com"

c_green=$'\033[0;32m'
c_red=$'\033[0;31m'
c_cyan=$'\033[0;36m'
c_dim=$'\033[2m'
c_rst=$'\033[0m'

say()  { printf "%s→%s %s\n"  "$c_cyan" "$c_rst" "$*"; }
ok()   { printf "%s✓%s %s\n"  "$c_green" "$c_rst" "$*"; }
die()  { printf "%s✗%s %s\n"  "$c_red"   "$c_rst" "$*"; exit 1; }

# ─── 0. 前置检查 ──────────────────────────────────────────────
[ -d "$APP_DIR" ]                  || die "找不到 $APP_DIR"
[ -f "$APP_DIR/index.html" ]       || die "$APP_DIR 下没有 index.html"
command -v vercel >/dev/null 2>&1  || die "未安装 vercel CLI (brew install vercel-cli)"
command -v curl   >/dev/null 2>&1  || die "未安装 curl"

vercel whoami >/dev/null 2>&1      || die "vercel 未登录，请先 vercel login"

# ─── 1. 部署 ─────────────────────────────────────────────────
cd "$APP_DIR"
say "在 $APP_DIR 触发 vercel --prod ..."
LOG_DIR="/Volumes/Loom/DataHub/Cache/CLI"
mkdir -p "$LOG_DIR"
LOG="$LOG_DIR/worldcup-deploy-$(date +%Y%m%d-%H%M%S).log"
vercel --prod --yes 2>&1 | tee "$LOG"

DEPLOY_URL=$(grep -oE 'https://worldcup-jekae-[a-zA-Z0-9]+-moons-projects-cc633ac1\.vercel\.app' "$LOG" | head -1 || true)
if [ -z "${DEPLOY_URL:-}" ]; then
  # fallback：匹配更宽松的 *.vercel.app
  DEPLOY_URL=$(grep -oE 'https://[a-z0-9-]+\.vercel\.app' "$LOG" | head -1 || true)
fi
[ -n "${DEPLOY_URL:-}" ] || die "无法从输出解析 deployment URL（见 $LOG）"

ok "部署完成: $DEPLOY_URL"

# ─── 2. 绑定自定义域名（幂等，允许已存在） ────────────────────
say "将 $DOMAIN 指向本次部署 ..."
if vercel alias set "$DEPLOY_URL" "$DOMAIN" 2>&1 | tee -a "$LOG"; then
  ok "alias set 成功"
else
  die "alias set 失败（见 $LOG）"
fi

# ─── 3. 冒烟 curl ────────────────────────────────────────────
say "curl 验证 https://$DOMAIN ..."
sleep 2  # 给 CDN 一点时间
STATUS=$(curl -sk -o /dev/null -w "%{http_code}" --max-time 20 "https://$DOMAIN")
if [ "$STATUS" = "200" ]; then
  ok "https://$DOMAIN → 200 OK"
else
  printf "%s!%s https://%s 返回 %s（CDN 可能还没刷新，稍等几十秒再试）\n" "$c_red" "$c_rst" "$DOMAIN" "$STATUS"
  exit 2
fi

printf "\n%s━━━━━━━━━━━━━━━━━━━━━━━━━━━%s\n" "$c_dim" "$c_rst"
printf "%s上线地址%s: %shttps://%s%s\n" "$c_dim" "$c_rst" "$c_green" "$DOMAIN" "$c_rst"
printf "%s部署快照%s: %s\n" "$c_dim" "$c_rst" "$DEPLOY_URL"
printf "%s日志保留%s: %s\n" "$c_dim" "$c_rst" "$LOG"
