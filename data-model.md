# Database model Kattis API

## User
Built-in model of LoopBack.js

#### name:string
### email:string
### emai

---

## Human
Extends User
has_many: submissions

---

## Problem
has_many: tests, submissions
has_and_belongs_to_many: ProblemSets
#### name: string
#### is_program: boolean
Default: false
#### description: string
#### test: object array
`test` model (object) related to input and output files of the problem.
Access using Problem.tests
---

## Test
belongs_to: Problem
#### input:string
ULR to input file
#### output:strign
ULR to input file
#### is_public:boolean
Public tests are for examples, not evaluating.
Default: false

---

## ProblemSet
has_and_belongs_to_many: Problems
#### name:string
#### description:string
#### start_time:date
#### end_time:date
#### restricted_access:boolean
Used to filter access to certain sets (evaluations, for example)

---

## Submission
belongs_to: problem, human
#### problem_id:number
#### user_id:number
#### status:number
Number related to an enum of possible status.
| Number | Status |
|--------|--------|
| 0 | [P] Pending|
| 1 | [D] Done |
| 2 | [F] Failure |
### url_content:string
URL string to .zip files.
#### kattis_result:string
URL to the file with the results. **The judge must return a file with them.**
