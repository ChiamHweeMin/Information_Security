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

print("=" * 10)
print("QUESTION 1")
print("=" * 10)

m1 = "N"
print("data type returned by function string_to_bits is " + str(type(string_to_bits(m1))))
print(m1 + " in binary python list is " + str(string_to_bits(m1)) + " a.k.a 0b" + display_bits(string_to_bits(m1)))
print(bits_to_char(string_to_bits(m1)))

m2 = "Not"
print(m2 + " in binary python list is " + str(string_to_bits(m2)) + " a.k.a 0b" + display_bits(string_to_bits(m2)))
print(bits_to_string(string_to_bits(m2)))







