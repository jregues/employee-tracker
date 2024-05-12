const inquirer = require('inquirer');
const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    database: 'employee_db',
    password: 'password'
});

pool.connect();

// function departmentData() {
//     return new Promise((resolve, reject) => {
//     // get departments from db
//     // format the array for inquirer choices
//     pool.connect();
//     const depQuery = 'SELECT * FROM department'
//     pool.query(depQuery, (error, results) => {
//         if (error) {
//             reject(error);
//         } else {
//             const departments = results.map((department) => ({
//                 name: department.name,
//                 value: department.id,
//             }));

//             pool.end()
//             resolve(departments)
//         }
//     })
//     return []
// })
// }

function departmentData() {
    
    const depQuery = `SELECT * FROM department`;
    

    return[depQuery.name]
    
}

function employeeData() {
    
    const empQuery = `SELECT * FROM employee`;
    

    return[empQuery.name]
    
}

function roleData() {
    
    const roleQuery = `SELECT * FROM role`;
    

    return[roleQuery.name]
    
}


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
        departmentData()
        console.log(departmentData())
    } else if (answers.options === 'View all roles') {
        roleData()
        console.log(role)
    } else if (answers.options === 'View all employees') {
        employeeData()
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
        .then((answers) => {
            pool.connect()
            const insertDepQuery = `INSERT INTO department (name) VALUES ('${answers.dep_name}')`;

            pool.query(insertDepQuery, (error, results) => {
                if (error) {
                    console.error('Error inserting data:', error)
                } else {
                    console.log('Data inserted successfully')
                }

                pool.end()
            })
        })
    } else if (answers.options === 'Add a role') {
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
                choices: departmentData()
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
        .then((answers) => {
            pool.connect()
            const insertEmpQuery = `INSERT INTO employee (first_name, last_name) VALUES ('${answers.first_name}', '${answers.last_name}')`;

            pool.query(insertEmpQuery, (error, results) => {
                if (error) {
                    console.error('Error inserting data:', error)
                } else {
                    console.log('Data inserted successfully')
                }

                pool.end()
            })
        })
    } 
});

