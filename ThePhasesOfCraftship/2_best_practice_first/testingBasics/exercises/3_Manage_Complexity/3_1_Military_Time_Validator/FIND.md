# FIND

Promblem Description
---
Write a function (or a stateless class) capable of validating whether a string time range is a valid military time range or not.

examples:

    "25:00 - 12:23" (no)
    "22:00 - 23:12" (yes)

Responsebilites
---
- Validate a string time range
- Return a boolean value

Assumptions (Examples)
---
The time range will always be in the format "HH:MM - HH:MM"

    "01:12 - 14:32"  -> yes
    "001:12 - 14:32" -> no
    "01:012 14:32"   -> no
HH is in the range of 00-23

    "22:00 - 23:12" -> yes
    "25:00 - 12:23" -> no
MM is in the range of 00-59

    "22:00 - 23:12" -> yes
    "22:00 - 23:60" -> no
It allows Cross-Day time ranges

    "22:00 - 01:12" -> yes