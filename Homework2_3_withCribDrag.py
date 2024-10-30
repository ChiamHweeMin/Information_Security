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

def crib():
    #Get crib input
    input1 = str(input("Enter a word for crib drag: "))
    bWord = string_to_bits(input1)

    num=1
    #xor the input with C3
    for each in range(0, len(sC3), len(bWord)):
        #get the C3 in same length with crib word
        targetC3 = C3[each:each+len(bWord)]

        #compare the length
        if (len(targetC3) > len(bWord)):
            requireBit = len(targetC3) - len(bWord)
            for i in range(requireBit):
                bWord.apend(0)

        if (len(targetC3) < len(bWord)):
            requireBit = len(bWord) - len(targetC3)
            for i in range(requireBit):
                targetC3.append(0)

        crib = otp(targetC3, bWord)
        print("#", num, ": ", bits_to_string(crib))
        num+=1

    ans2 = str(input(print("Do you want to generate key? (y/n)")))
    if (ans2 == 'y'):
        if (len(C1) > len(bWord)):
            requireBit = len(C1) - len(bWord)
            for i in range(requireBit):
                bWord.append(0)

        if (len(C1) < len(bWord)):
            requireBit = len(bWord) - len(C1)
            for i in range(requireBit):
                C1.append(0)

        guessKey = otp(C1, bWord)
        print("KEY: ", display_bits(guessKey))
        print("KEY: ", bits_to_string(guessKey))

    else:
        print()


k  = "    super secret !   "
m1 = "Where is Angel's beg?"
m2 = "The beg is in room 55"

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

print()

print("*" * 13)
print("Crib dragging")
print("*" * 13)

count = 1
while(True):
    print("\n[", count, "]")
    count+=1
    crib()
    ans = input(print("Next Crib Drag? (y/n)"))
    if (ans == 'n'):
        print("\n" + "Exiting.......")
        break





