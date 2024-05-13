# Employee Tracker
This application is powered by Node.js and is run completely through the command line. It was created for my Module 12 Challenge assignment in the UNCC Coding Bootcamp. It was created in accordance to the following User Story and Acceptance Criteria.

## User Story
```
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria
```
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
```

## How to Use
After cloning the repository, run 'npm i' to install all the necessary packages. After installing the packages, connect into your postgres terminal and install the database. Run 'node index.js' to start the application. Select any of the options that show up and follow the questions.

## Links
https://drive.google.com/file/d/1H3d9FZ0EbYZbCy91X4mmE6mNORywbAxU/view

https://github.com/jregues/employee-tracker
