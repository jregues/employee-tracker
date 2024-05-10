const inquirer = require('inquirer');
const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    database: 'employee_db',
    password: 'password'
});

pool.connect();
}
})

inquirer
   .prompt([
    {
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
    }
])
.then((answers) => {
    if (answers.options === 'View all departments') {
        console.log(department)
    } else if (answers.options === 'View all roles') {
        console.log(role)
    } else if (answers.options === 'View all employees') {
        console.log(employee.name)
    } else if (answers.options === 'Add a department') {
        inquirer
        .prompt([
            {
                type: 'input',
                name: 'dep_name',
                message: 'Please enter the department name'
            }
        ])
    } else if (answers.options === 'Add a role') {
        
        pool.query('SELECT * FROM role', (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    const department = res.rows.map(row => `${row.id}: ${row.name}`)
        inquirer
        .prompt([
            {
                type: 'input',
                name: 'role_name',
                message: 'Please enter the role title'
            },
            {
                type: 'input',
                name: 'role_salary',
                message: 'Please enter the salary for this role'
            },
            {
                type: 'list',
                name: 'role_dep',
                message: 'Please enter the department this role belongs to',
                choices: [department.department_id]
            }
    ])
        .then((answers) => {
            console.log(answers)
            const query = 'INSERT INTO role(title, salary, department_id) VALUES($1, $2, $3)';
            const values = [answers.role_name, answers.role_salary, answers.role_dep]
            

            pool.query(query, values, (err, res) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Data inserted successfully!');
                }
            })
        }
    )
            pool.end();
        })

    } else if (answers.options === 'Add an employee') {
        inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'please enter the employee first name'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Please enter the employee last name'
            },
            {
                type: 'list',
                name: 'emp_role',
                message: 'Please select the employee role',
                choices: ['role']
            }
        ])
    } 
});

