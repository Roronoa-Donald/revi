def lum(hex):
    h = hex.lstrip('#')
    r, g, b = [int(h[i:i+2], 16) / 255 for i in (0, 2, 4)]
    def f(c):
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)

def ratio(a, b):
    l1, l2 = sorted([lum(a), lum(b)], reverse=True)
    return (l1 + 0.05) / (l2 + 0.05)

print('activate btn #14320f sur #29cc57:', round(ratio('#14320f', '#29cc57'), 2))
print('login btn white sur #29cc57:', round(ratio('#ffffff', '#29cc57'), 2))
print('badge teal-hover #a0dcd5 sur #000:', round(ratio('#a0dcd5', '#000000'), 2))
