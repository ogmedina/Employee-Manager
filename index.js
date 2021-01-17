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
            "View All Employees By Department",
            "View All Employees By Manager",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "Done!"
        ],
        name: "userchoice"
    }]).then(function(response){
        switch (response.userchoice){
            case "View All Employees":
            viewAll();
            break;

            case "View All Employees By Department":
            viewByDepartment();
            break;

            case "View All Employees By Manager":
            viewByManager();
            break;

            case "Add Employee":
            addEmployee();
            break;

            case "Remove Employee":
            removeEmployee();
            break;

            case "Update Employee Role":
            updateEmployeeRole();
            break;

            case "Update Employee Manager":
            updateEmployeeManager();
            break;

            case "Done!":
            missionComplete();            
            break;
        }
    });
}

//function to view all employees, departments, and roles
function viewAll() {
    let query = "SELECT employee.first_name, employee.last_name, role.title, departments.department, role.salary, employee.manager_id";
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
    let query = "SELECT departments.department, employee.first_name, employee.last_name";
    query += " FROM employee INNER JOIN role ON (employee.role_id = role.id) INNER JOIN departments ON (role.department_id = departments.id)";
    query += " ORDER BY departments.department;";
    connection.query(query, function (err, res){
        if (err) throw err;
        console.table(res);
        promptUser();
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
}

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
        for (i = 0; i < res.length; i++){
            employeeArr.push(res[i].first_name);             
        }
        //console.log(employeeArr);
        inquirer.prompt([
            {
                type: "list",
                message: "Which employee do you want to remove?",
                choices: employeeArr,
                name: "first_name"
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
}


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
}