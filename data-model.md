# Database model Kattis API
##### Contents:

##### &nbsp;&nbsp; 1. User
##### &nbsp;&nbsp; 2. Human
##### &nbsp;&nbsp; 3. Problem
##### &nbsp;&nbsp; 4. Test
##### &nbsp;&nbsp; 5. ProblemSet
##### &nbsp;&nbsp; 6. Submission

---

### User
Built-in model of LoopBack.js
##### &nbsp;&nbsp; name:string
##### &nbsp;&nbsp; email:string

---

### Human
Extends User.

Relations:
1. `has_many`: `submissions`

---

### Problem
Relations:
1. `has_many`: `Tests`, `Submissions`
2. `has_and_belongs_to_many`: `ProblemSets`

#### &nbsp;&nbsp; name: string
#### &nbsp;&nbsp; is_program: boolean
&nbsp;Default: false
#### &nbsp;&nbsp; description: string
#### &nbsp;&nbsp; `Tests`: object array
&nbsp;`test` model (object) related to input and output files of the problem.
&nbsp;Access using Problem.tests

---

### Test
Relations:
1. `belongs_to`: `Problem`

#### &nbsp;&nbsp; input:string
&nbsp;ULR to input file
#### &nbsp;&nbsp; output:strign
&nbsp;ULR to input file
#### &nbsp;&nbsp; is_public:boolean
&nbsp;Public tests are for examples, not evaluations.
&nbsp;Default: `false`

---

### ProblemSet
Relations:
1. `has_and_belongs_to_many`: `Problems`

#### &nbsp;&nbsp; name:string
#### &nbsp;&nbsp; description:string
#### &nbsp;&nbsp; start_time:date
#### &nbsp;&nbsp; end_time:date
#### &nbsp;&nbsp; restricted_access:boolean
&nbsp;Used to filter access to certain sets (evaluations, for example)

---

### Submission
Relations:
1. `belongs_to`: `Problem`, `Human`

#### &nbsp;&nbsp; problem_id:number
#### &nbsp;&nbsp; user_id:number
#### &nbsp;&nbsp; status:number
&nbsp;Number related to an enum of possible status.

| Number | Status |
|:--------:|--------|
| 0 | [P] Pending|
| 1 | [D] Done |
| 2 | [F] Failure |

#### &nbsp;&nbsp; url_content:string
&nbsp;URL string to .zip files.
#### &nbsp;&nbsp; kattis_result:string
&nbsp;URL to the file with the results. **The judge must return a file with them.**
