const { Pool } = require('pg');

const pool = new Pool ({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});
let cohortName = process.argv[2];
const values = [`%${cohortName}%`];
const queryString = `
SELECT teachers.name as teacher, cohorts.name as cohorts
FROM teachers
JOIN assistance_requests ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
GROUP BY teachers.name, cohorts.name
ORDER BY teachers.name`;
pool.query(queryString, values)
.then(res => {
  res.rows.forEach(section => {
    console.log(`${section.cohorts}: ${section.teacher}`);
  })
})
.catch(err => console.error('query error', err.stack));