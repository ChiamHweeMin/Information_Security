#-------------------------------------------------------------------------------
# Name:        module1
# Purpose:
#
# Author:      60111
#
# Created:     13/10/2022
# Copyright:   (c) 60111 2022
# Licence:     <your licence>
#-------------------------------------------------------------------------------

#convert one characters to bits
def convert_to_bits(n, pad):
    result = []
    while n > 0:
        if n % 2 == 0:
            result = [0] + result
        else:
            result = [1] + result
        n = n // 2
    while len(result) < pad:
        result = [0] + result
    return result

def display_bits(n):
    for each in n:
        print(each, end="")

#convert more than one characters to bits
def string_to_bits(s):
    result = []
    for c in s:
        result = convert_to_bits(ord(c), 7) + result
    return result



