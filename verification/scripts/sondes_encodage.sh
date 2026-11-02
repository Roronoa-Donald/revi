#!/bin/sh
set -eu

mkdir -p verification/tmp
work_dir=$(mktemp -d verification/tmp/xor.XXXXXX)
trap 'rm -rf "$work_dir"' EXIT

printf '.intel_syntax noprefix\n.text\nxor eax,eax\nxor rax,rax\nxor r8d,r8d\nmovsb\n' | as --64 -o "$work_dir/exemples.o" -
objdump -d -M intel "$work_dir/exemples.o" | tail -n 7
