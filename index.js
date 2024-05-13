const inquirer = require("inquirer");
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  database: "employee_db",
  password: "password",
});

pool.connect();

const depQuery = `SELECT * FROM department`;

const empQuery = `SELECT * FROM employee`;

const roleQuery = `SELECT * FROM role`;

async function departmentData() {
  try {
    const result = await pool.query(depQuery);
    return result.rows.map((department) => ({
      name: department.name,
      value: department.id,
    }));
  } catch (error) {
    console.error("Error fetching department data:", error);
    return [];
  }
}

async function employeeData() {
  try {
    const result = await pool.query(empQuery);
    const test = result.rows.map((employee) => ({
      first_name: employee.first_name,
      last_name: employee.last_name,
      value: `${employee.first_name} ${employee.last_name}`,
      employee_id: employee.id,
      manager_id: employee.manager_id,
    }));
    return test;
  } catch (error) {
    console.error("Error fetching employee data:", error);
    return [];
  }
}

async function roleData() {
  try {
    const result = await pool.query(roleQuery);
    return result.rows.map((role) => ({
      name: role.title,
      id: role.id,
      value: role.title,
    }));
  } catch (error) {
    console.error("Error fetching role data:", error);
    return [];
  }
}
function menu() {


inquirer
  .prompt([
    {
      type: "list",
      name: "options",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
      ],
    },
  ])
  .then((answers) => {
    if (answers.options === "View all departments") {
      async function displayDepartmentData() {
        const departments = await departmentData();

        if (departments.length > 0) {
          console.table(departments);
          menu();
        } else {
          console.log("No departments found.");
          // pool.end(); // Close the database connection
        }
      }
    
      // Call the function to display department data
      displayDepartmentData();
    
    } else if (answers.options === "View all roles") {
      async function displayRoleData() {
        const roles = await roleData();

        if (roles.length > 0) {
          console.table(roles);
          menu()
        } else {
          console.log("No roles found.");
          // pool.end(); // Close the database connection
        }
      }

      // Call the function to display department data
      displayRoleData();
    } else if (answers.options === "View all employees") {
      async function displayEmployeeData() {
        const employees = await employeeData();

        if (employees.length > 0) {
          console.table(employees);
          menu();
        } else {
          console.log("No employees found.");
          // pool.end(); // Close the database connection
        }
      }

      // Call the function to display department data
      displayEmployeeData();
    } else if (answers.options === "Add a department") {
      inquirer
        .prompt([
          {
            type: "input",
            name: "dep_name",
            message: "Please enter the department name",
          },
        ])
        .then((answers) => {
          pool.connect();
          const insertDepQuery = `INSERT INTO department (name) VALUES ('${answers.dep_name}')`;

          pool.query(insertDepQuery, (error, results) => {
            if (error) {
              console.error("Error inserting data:", error);
            } else {
              console.log("Data inserted successfully");
              menu()
            }

            // pool.end();
          });
        });
    } else if (answers.options === "Add a role") {
      async function addRole() {
        try {
          await inquirer
            .prompt([
              {
                type: "input",
                name: "role_name",
                message: "Please enter the role title",
              },
              {
                type: "input",
                name: "role_salary",
                message: "Please enter the salary for this role",
              },
              {
                type: "list",
                name: "role_dep",
                message: "Please enter the department this role belongs to",
                choices: await departmentData(),
              },
            ])
            // Insert the role with the selected department ID
            .then((answers) => {
              const query = `INSERT INTO role(title, salary, department_id) VALUES ('${answers.role_name}', '${answers.role_salary}', ${answers.role_dep})`;
              pool.query(query, (err, res) => {
                if (err) {
                  console.error(err);
                } else {
                  console.log("Data inserted successfully!");
                  menu();
                }
                // pool.end();
              });
            });
        } catch (error) {
          console.error("Error adding role:", error);
        }
      }

      // Call the addRole function
      addRole();
    } else if (answers.options === "Add an employee") {
      async function addEmployee() {
        try {
          await inquirer
            .prompt([
              {
                type: "input",
                name: "first_name",
                message: "please enter the employee first name",
              },
              {
                type: "input",
                name: "last_name",
                message: "Please enter the employee last name",
              },
              {
                type: "list",
                name: "emp_role",
                message: "Please select the employee role",
                choices: await roleData(),
              },
              {
                type: "list",
                name: "manager",
                message: "Please select the employees manager",
                choices: await employeeData(),
              },
            ])

            .then(async (answers) => {
              const empRoleData = await roleData();
              const emp_role_id = empRoleData.find(
                (role) => role.name === answers.emp_role
              ).id;
              const empManagerData = await employeeData();
              const emp_manager_id = empManagerData.find(
                (employee) => employee.value === answers.manager
              ).employee_id;
              const insertEmpQuery = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answers.first_name}', '${answers.last_name}', '${emp_role_id}', '${emp_manager_id}')`;
              pool.query(insertEmpQuery, (err, res) => {
                if (err) {
                  console.error(err);
                } else {
                  console.log("Data inserted successfully!");
                  menu();
                }
                // pool.end();
              });
            });
        } catch (error) {
          console.error("Error adding employee:", error);
        }
      }

      // Call the addRole function
      addEmployee();
    }
  });
}
menu()