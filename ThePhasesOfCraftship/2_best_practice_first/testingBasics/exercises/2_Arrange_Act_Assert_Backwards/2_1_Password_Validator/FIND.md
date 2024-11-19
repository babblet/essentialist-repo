# Find

Problem Description
---
Write a function (or a stateless class) for validating passwords. Passwords must meet the following criteria:
  1. Between 5 and 15 characters long
  2. Contains at least one digit
  3. Contains at least one upper case letter
  4. Return an object containing a boolean result and an  errors key that — when provided with an invalid password — contains an error message or type for all errors in occurrence. There can be multiple errors at a single time.

Responsebilites
---
Validate a single password and return a object with a result key, and a errors key that can contains none to many errors.

Assumptions (Examples)
---
Valid Passwords (1,2,3):
- Test1
- Test4Pass
- someThing4u
- thisIsGreat4me
###
Invalid Passwords (1,2,3):
- (1) "Pa55"
- (1) "ALongPassword12345"
- (2) "TeStInG"
- (3) "password123"
- (1,2) "Test"
- (1,2) "AVeryLongPassword"
- (1,3) "pa55"
- (2,3) "testing"
- (1,2,3) "test"
- (1,2,3) "averylongpassword"
###
Object to be Returned (4):
###
``` typescript
type PasswordValidationResult {
  result: boolean,
  errors: PasswordValidationError[]
}
```
``` typescript
enum PasswordValidationError {
  Length = "Password must be between 5 and 15 characters long",
  Digit = "Password must contain at least one digit",
  UpperCase = "Password must contain at least one upper case letter"
}
```