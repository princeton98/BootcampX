SELECT COUNT(assistance_requests.*) as total_assistances, teachers.name as name
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
WHERE teachers.name = 'Waylon Boehm'
GROUP BY teachers.name;