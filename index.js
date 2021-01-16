const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const CFonts = require("cfonts");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "#!Wm#!cKvsq6!bKSnEEh",
    database: "employee_trackerdb"
})

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

function addEmployee(){
    inquirer.prompt
}


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