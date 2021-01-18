//Dependencies packages
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const CFonts = require("cfonts");
//Local Connection to MySQL for database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employee_trackerdb"
})
//When connected use cfonts as a header and then go to the main function to prompt users
connection.connect(function(err){
    if (err) throw err;
    CFonts.say('Employee|Manager', {
    font: '3d',              
	align: 'left',           
	colors: ['red', "cyan"], 
	background: 'transparent',
	letterSpacing: 1,         
	lineHeight: 1,            
	space: true,              
	maxLength: '0',           
	gradient: false,           
	independentGradient: false, 
	transitionGradient: false,  
	env: 'node'     
    });    
    promptUser();
});
//Main Menu of Employee Manager, asks questions then divert to appropriate function
function promptUser() {
    inquirer.prompt([
      {
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Departments",
            "Add Role",
            "Add Employee",
            "Add Department",
            "Remove Employee",
            "Update Employee Role",            
            "Done!"
        ],
        name: "userchoice"
    }]).then(function(response){
        switch (response.userchoice){
            case "View All Employees":
            viewAll();
            break;

            case "View All Departments":
            viewByDepartment();
            break;

            case "Add Role":
            addRole();
            break;

            case "Add Employee":
            addEmployee();
            break;

            case "Add Department":
            addDepartment();
            break;

            case "Remove Employee":
            removeEmployee();
            break;

            case "Update Employee Role":
            updateEmployeeRole();
            break;

            case "Done!":
            missionComplete();            
            break;
        }
    });
}

//function to view all employees, departments, and roles
function viewAll() {
    let query = "SELECT employee.first_name, employee.last_name, role.title, departments.department, role.salary";
    query += " FROM employee INNER JOIN role ON (employee.role_id = role.id) INNER JOIN departments ON (role.department_id = departments.id)";
    query += " ORDER BY employee.last_name;";
    connection.query(query, function (err, res){
        if (err) throw err;
        console.table(res);
        promptUser();
    })
};

//function to view all employees by department
function viewByDepartment(){
    let query = "SELECT * FROM departments;"
    connection.query(query, function (err, res){
        if (err) throw err;
        console.table(res);
        promptUser();
    })
};

function addRole(){
    let departmentArr = [];    
    let departmentQuery = "SELECT * FROM departments;";
    connection.query(departmentQuery, function (err, res){
        if (err) throw err;
        for (i = 0; i < res.length; i++){
            departmentArr.push(res[i].department)
        }
        // console.log(departmentArr)    
    let query = "SELECT role.title, role.salary, departments.department";
    query += " FROM role INNER JOIN departments ON (role.department_id = departments.id);";
    connection.query(query, function (err, res){
        if (err) throw err;
        console.table(res);                
        inquirer.prompt([
            {
                type: 'input',
                message: 'What is the name of the role you want to add?',
                name: "newrole"
            },
            {
                type: 'input',
                message: 'How much does this role earn per year?',
                name: "newsalary"
            },
            {
                type: 'list',
                message: 'What department does this role belong to?',
                choices: departmentArr,
                name: "newdepartment"
            }
        ]).then(function(response){
            // console.log(response);
            // console.log(response.newdepartment);
            let test = response.newdepartment;            
            let newId = departmentArr.indexOf(test);
            newId++;
            console.log(newId);            
            console.log("Adding New Role...\n");
            connection.query("INSERT INTO role SET ?",
            {
                title: response.newrole,
                salary: response.newsalary,
                department_id: newId
            },
            function (err, res){
                if (err) throw err;
                console.log(res.affectedRows + " Role Created Succesfully\n");
                promptUser();
            });            
        })      
    })  
    })    
};

//function to add employees to DB and be reflected in all employees
function addEmployee(){
    inquirer.prompt([
        {
            type: 'input', 
            message: 'What is your employees first name?',
            name: "firstname"
        },
        {
            type: 'input',
            message: 'What is your employees last name?',
            name: "lastname"
        },
        {
            type: "list",
            message: "Choose your employees role",
            name: "role",
            choices: [
                {
                    name: "Sales Lead",
                    value: 1
                },
                {
                    name: "Salesperson",
                    value: 2
                },
                {
                    name: "Lead Engineer",
                    value: 3
                },
                {
                    name: "Software Engineer",
                    value: 4
                },
                {
                    name: "Accountant",
                    value: 5
                },
                {
                    name: "Legal Team Lead",
                    value: 6
                },
                {
                    name: "Lawyer",
                    value: 7
                },
            ]
        },        
    ]).then(function(response){
        console.log("Adding New Employee...\n");
        connection.query("INSERT INTO employee SET ?", 
        {
            first_name: response.firstname,
            last_name: response.lastname,
            role_id: response.role
        },
        function (err, res){
            if (err) throw err;
            console.log(res.affectedRows + " Employee Created Succesfully\n");
            promptUser();
        });
    });
};

function addDepartment() {
    let query = "SELECT * FROM departments;";
    connection.query(query, function (err, res){
        if (err) throw err;
        console.table(res);    
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the department you want to add?',
            name: "newdepartment"
        }
    ]).then(function(response){
        console.log("Adding New Department...\n");
        connection.query("INSERT INTO departments SET ?",
        {
            department: response.newdepartment
        },
        function (err, res){
            if (err) throw err;
            console.log(res.affectedRows + " Department Created Succesfully\n");
            promptUser();
        });
    })
});
};

//function to remove employees from DB
function removeEmployee() {
    let employeeArr = [];
    let query = "SELECT employee.first_name, employee.last_name, departments.department";
    query += " FROM employee INNER JOIN role ON (employee.role_id = role.id) INNER JOIN departments ON (role.department_id = departments.id)";
    query += " ORDER BY employee.last_name"
    connection.query(query, function (err, res){
        if (err) throw err;
        //console.log(res);
        //change later to map
        //+ " " + res[i].last_name + " " + res[i].department
        console.table(res);
        for (i = 0; i < res.length; i++){
            employeeArr.push(res[i].last_name);             
        }
        //console.log(employeeArr);
        inquirer.prompt([
            {
                type: "list",
                message: "Which employee do you want to remove?",
                choices: employeeArr,
                name: "last_name"
            }
        ]).then(function(response){
            //console.log(response);
            //var test = JSON.stringify(response);
            //console.log(test);
            //console.log(response[0]);
           // response.shift();
            console.log(response);            
            var query = "DELETE FROM employee WHERE (?)";
            console.log(query);
            connection.query(query, response, function (err, res){
                if (err) throw err;
                console.log("Yup that works")
                promptUser();
            })
        })
    })
};

//function to update Role of employee
function updateEmployeeRole(){
    let updateEmployeeRole = [];
    let query = "SELECT employee.first_name, employee.last_name, role.title, departments.department";
    query += " FROM employee INNER JOIN role ON (employee.role_id = role.id) INNER JOIN departments ON (role.department_id = departments.id)"
    query += " ORDER BY employee.last_name"
    connection.query(query, function (err, res){
        if (err) throw err;
        console.table(res);
        for (i = 0; i < res.length; i++){
            updateEmployeeRole.push(res[i].last_name);
        }
        inquirer.prompt([
            {
                type: "list",
                message: "Which employee do you want to update his/her role?",
                choices: updateEmployeeRole,
                name: "last_name"
            },
            {
                type: "list",
                message: "Choose the new role for the employee",
                name: "role_id",
                choices: [
                    {
                        name: "Sales Lead",
                        value: 1
                    },
                    {
                        name: "Salesperson",
                        value: 2
                    },
                    {
                        name: "Lead Engineer",
                        value: 3
                    },
                    {
                        name: "Software Engineer",
                        value: 4
                    },
                    {
                        name: "Accountant",
                        value: 5
                    },
                    {
                        name: "Legal Team Lead",
                        value: 6
                    },
                    {
                        name: "Lawyer",
                        value: 7
                    },
                ]
            }
        ]).then(function(response){
            console.log(response);
            console.log("Updating Role for Employee...\n");
            var query = "UPDATE employee SET ? WHERE ?";
            connection.query(query,[
                {
                    role_id: response.role_id
                },
                {
                    last_name: response.last_name
                }
            ],function (err, res){
                if (err) throw err;
                console.log("Role Successfully Changed!!\n")
                promptUser();
            })            
        })
    })
};

//function to end program
function missionComplete() {
    CFonts.say('Goodbye!', {
        font: 'block',              
        align: 'left',           
        colors: ['system'], 
        background: 'transparent',
        letterSpacing: 1,         
        lineHeight: 1,            
        space: true,              
        maxLength: '0',           
        gradient: false,           
        independentGradient: false, 
        transitionGradient: false,  
        env: 'node'     
        });
    connection.end();    
};