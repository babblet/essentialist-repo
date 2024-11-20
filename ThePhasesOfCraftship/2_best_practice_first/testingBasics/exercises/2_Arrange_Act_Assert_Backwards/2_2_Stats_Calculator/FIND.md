# Find

Problem Description
---
Your task is to process a sequence of integer numbers to determine the following statistics: Without using system Math library functions, process a sequence of integers to determine the following statistics:

For example: 
  - \[2, 4, 21, -8, 53, 40\] -> minimum value = -8, maximum value = 53, number of elements in the sequence = 6, average value = 18.666666666667

Responsebilites
---
- It validates the integer input sequence, both negative and positive integers, and returns an object with the calculated statistics.

Assumptions (Examples)
---

###
Input with positive numbers:
  \[1, 2, 3, 4, 5\] -> Calculate -> minimum value = 1, maximum value = 5, number of elements in the sequence = 5, average value = 3
###
Input with negative numbers:
  \[-1, -2, -3, -4, -5\] -> Calculate -> minimum value = -5, maximum value = -1, number of elements in the sequence = 5, average value = -3
###
Input with mixed numbers:
  \[1, -2, 3, -4, 5\] -> Calculate -> minimum value = -4, maximum value = 5, number of elements in the sequence = 5, average value = 0.6

###
###
Input Object:
``` typescript
// Note: typescript or javascript does not have a integer type, so we will consider the number type as an integer for now.
const input: number[] = [1,2]
```
###
Return Object:
``` typescript
type StatsResult {
  min: number,
  max: number, 
  count: number,
  avg: number
}
```
