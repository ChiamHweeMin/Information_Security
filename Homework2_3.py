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

k  = "supersecret"
m1 = "The beg is "
m2 = " The beg   "

kb = string_to_bits(k)

C1 = otp(string_to_bits(m1), kb)
C2 = otp(string_to_bits(m2), kb)
C3 = otp(C1, C2)

print("=" * 10)
print("QUESTION 3")
print("=" * 10)

print("Key       : ", display_bits(kb), "\n")
print("M1        : ", display_bits(string_to_bits(m1)))
print("M2        : ", display_bits(string_to_bits(m2)), "\n")
print("C1        : ", display_bits(C1))
print("C2        : ", display_bits(C2))
print("C1 XOR C2 : ", display_bits(C3), "\n")

print("M1 is     : ", m1)
print("M2 is     : ", m2)
print("\nPlaintext Messages for C1 XOR C2: ")
print(bits_to_string(C3), "\n")

#checking purpose, to compare the decimal value with the ASCII character code
#the result should same with the MC3
sC3 = ''.join([str(item) for item in C3])   #join the bits together and convert to string
gC3 = [(sC3[i:i+ASCII_BITS]) for i in range(0, len(sC3), ASCII_BITS)]   #group the binary number becomes to byte

list1 = []
#convert byte to decimal number
for each in gC3:
    decimal = int(each, 2)
    list1.append(decimal)

print("The ASCII character code in decimal for each bytes in C3: ")
print(list1)


