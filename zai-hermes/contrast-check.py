#!/usr/bin/env python3
def lum(hex):
    h = hex.lstrip('#')
    r, g, b = [int(h[i:i+2], 16) / 255 for i in (0, 2, 4)]
    def f(c):
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)

def ratio(a, b):
    l1, l2 = sorted([lum(a), lum(b)], reverse=True)
    return (l1 + 0.05) / (l2 + 0.05)

tests = [
    ('footer portal #cccccc/#000000', '#cccccc', '#000000'),
    ('texte-subtle #78716c/#f5f3f1', '#78716c', '#f5f3f1'),
    ('muted #57534e/#ffffff', '#57534e', '#ffffff'),
    ('interactive #3556d9/#f5f3f1', '#3556d9', '#f5f3f1'),
    ('CTA blanc/#29cc57', '#ffffff', '#29cc57'),
    ('badge or #c69c1e/papier', '#c69c1e', '#f5f3f1'),
    ('btn warning blanc/#a16207', '#ffffff', '#a16207'),
    ('btn success blanc/#047857', '#ffffff', '#047857'),
    ('btn danger blanc/#b91c1c', '#ffffff', '#b91c1c'),
    ('key-tag #6ee7b7/papier', '#6ee7b7', '#f5f3f1'),
    ('dashboard muted #78716c/#ffffff', '#78716c', '#ffffff'),
    ('footer link #ffffff/#000000', '#ffffff', '#000000'),
    ('demo-banner #cccccc/#000000', '#cccccc', '#000000'),
    ('pastel teal #a0dcd5/#000000', '#a0dcd5', '#000000'),
    ('php primary #DB2777/#ffffff', '#DB2777', '#ffffff'),
    ('linux CTA blanc/#EA580C', '#ffffff', '#EA580C'),
    ('linux CTA blanc/#c2410c', '#ffffff', '#c2410c'),
    ('linux lien #EA580C/papier', '#EA580C', '#f5f3f1'),
    ('ring #456dff/papier', '#456dff', '#f5f3f1'),
    ('msg error #B91C1C/#FEE2E2', '#B91C1C', '#FEE2E2'),
    ('msg success #047857/#D1FAE5', '#047857', '#D1FAE5'),
    ('warning #a16207/papier', '#a16207', '#f5f3f1'),
    ('promo or #c69c1e/#141414', '#c69c1e', '#141414'),
    ('tab actif #ffffff/#456dff', '#ffffff', '#456dff'),
    ('dashboard btn-danger hover #dc2626', '#ffffff', '#dc2626'),
    ('dashboard btn-warning hover #d97706', '#ffffff', '#d97706'),
    ('perwi DESIGN #456dff lien/papier', '#456dff', '#f5f3f1'),
    ('sommaire num accent course-php DB2777/papier', '#DB2777', '#f5f3f1'),
    ('hero desc muted #57534e/papier', '#57534e', '#f5f3f1'),
    ('linux muted #78716c/papier', '#78716c', '#f5f3f1'),
    ('react sommaire muted/papier', '#57534e', '#f5f3f1'),
    ('probabilites #7C3AED/papier', '#7C3AED', '#f5f3f1'),
    ('react #0891B2/papier', '#0891B2', '#f5f3f1'),
]
for name, fg, bg in tests:
    r = ratio(fg, bg)
    verdict = 'OK AA' if r >= 4.5 else ('AA-large seulement' if r >= 3 else 'FAIL')
    print(f'{name}: {r:.2f}:1 {verdict}')
