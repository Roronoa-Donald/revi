#!/usr/bin/env bash
set -eu

unshare -Urnm bash -s <<'ISOLATED'
set -eu
mount --make-rprivate /
mount -t tmpfs tmpfs /run
mkdir -p /run/netns
ip netns add pair
ip link add veth-a type veth peer name veth-b
ip link set veth-b netns pair
ip addr add 10.203.0.1/24 dev veth-a
ip link set veth-a up
ip -n pair addr add 10.203.0.2/24 dev veth-b
ip -n pair link set veth-b up
ip -n pair link set lo up

for mode in chiffrement_seul integrite_seule deux_services; do
  cipher=$(openssl rand -hex 16)
  auth=$(openssl rand -hex 32)
  case "$mode" in
    chiffrement_seul) algorithms=(enc 'cbc(aes)' "0x$cipher") ;;
    integrite_seule) algorithms=(enc 'cipher_null' '' auth-trunc 'hmac(sha256)' "0x$auth" 128) ;;
    deux_services) algorithms=(enc 'cbc(aes)' "0x$cipher" auth-trunc 'hmac(sha256)' "0x$auth" 128) ;;
  esac
  ip xfrm state add src 10.203.0.1 dst 10.203.0.2 proto esp spi 0x100 reqid 10 mode transport "${algorithms[@]}"
  ip -n pair xfrm state add src 10.203.0.1 dst 10.203.0.2 proto esp spi 0x100 reqid 10 mode transport "${algorithms[@]}"
  ip xfrm policy add src 10.203.0.1/32 dst 10.203.0.2/32 dir out tmpl src 10.203.0.1 dst 10.203.0.2 proto esp reqid 10 mode transport
  ip -n pair xfrm policy add src 10.203.0.1/32 dst 10.203.0.2/32 dir in tmpl src 10.203.0.1 dst 10.203.0.2 proto esp reqid 10 mode transport
  ping -n -c 1 -W 2 -I 10.203.0.1 10.203.0.2 >/dev/null
  sent=$(ip -s xfrm state list nokeys | awk '/lifetime current/ { getline; gsub(/[^0-9]/, "", $2); print $2; exit }')
  received=$(ip -n pair -s xfrm state list nokeys | awk '/lifetime current/ { getline; gsub(/[^0-9]/, "", $2); print $2; exit }')
  test "${sent:-0}" -ge 1
  test "${received:-0}" -ge 1
  printf '%s : émission ESP=%s paquet(s), réception ESP=%s paquet(s)\n' "$mode" "$sent" "$received"
  ip xfrm policy flush
  ip -n pair xfrm policy flush
  ip xfrm state flush
  ip -n pair xfrm state flush
done
ISOLATED
