#-------------------------------------------------------------------------------
# Name:        module1
# Purpose:
#
# Author:      60111
#
# Created:     21/10/2022
# Copyright:   (c) 60111 2022
# Licence:     <your licence>
#-------------------------------------------------------------------------------

import re

BITS = ('0', '1')
ASCII_BITS = 7

def display_bits(b):
    """converts list of {0, 1}* to string"""
    return ''.join([BITS[e] for e in b])

def seq_to_bits(seq):
    return [0 if b == '0' else 1 for b in seq]

def pad_bits(bits, pad):
    """pads seq with leading 0s up to length pad"""
    assert len(bits) <= pad
    return [0] * (pad - len(bits)) + bits

def convert_to_bits(n):
    """converts an integer 'n' to bit array"""
    result = []
    if n == 0:
        return [0]
    while n > 0:
        result = [(n % 2)] + result
        n = int(n / 2)
    return result

def string_to_bits(s):
    def chr_to_bit(c):
        return pad_bits(convert_to_bits(ord(c)), ASCII_BITS)
    return [b for group in
            map(chr_to_bit, s)
            for b in group]

def bits_to_char(b):
    assert len(b) == ASCII_BITS
    value = 0
    for e in b:
        value = (value * 2) + e
    return chr(value)

def list_to_string(p):
    return ''.join(p)

def bits_to_string(b):
    return ''.join([bits_to_char(b[i:i + ASCII_BITS])
        for i in range(0, len(b), ASCII_BITS)])

def otp(m, k):
    assert len(m) == len(k)
    return [(mm + kk) % 2 for mm, kk in zip(m, k)]

k = [0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,1,1]

m1 = "Yaya"
C1 = otp(string_to_bits(m1), k)

m2 = "YeYe"
C2 = otp(string_to_bits(m2), k)

C3 = otp(C1, C2)

print("=" * 10)
print("QUESTION 2")
print("=" * 10)

print("Key        : ", display_bits(k))
print("M1 is      : ", display_bits(string_to_bits(m1)))
print("C1         : ", display_bits(C1))
print("")

print("Key        : ", display_bits(k))
print("M2 is      : ", display_bits(string_to_bits(m2)))
print("C2         : ", display_bits(C2))
print("")

print("C1         : ", display_bits(C1))
print("C2         : ", display_bits(C2))
print("otp(C1,C2) : ", display_bits(C3))






