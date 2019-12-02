'''
Day 2: 1202 Program Alarm
'''
def intcode(codes):
    n = len(codes)
    for i in range(0, n, 4):
        opcode = codes[i]
        if opcode == 99:
            break
        
        if (i+1) == n or (i+2) == n or (i+3) == n:
            break

        read_pos1 = codes[i+1]
        read_pos2 = codes[i+2]
        write_pos = codes[i+3]
        if opcode == 1:
            codes[write_pos] = codes[read_pos1] + codes[read_pos2]
        elif opcode == 2:
            codes[write_pos] = codes[read_pos1] * codes[read_pos2]
    return codes

code_nums = raw_input()
code_nums = code_nums.split(',')
code_nums = map(int, code_nums)
code_nums[1] = 12
code_nums[2] = 2
print intcode(code_nums)


