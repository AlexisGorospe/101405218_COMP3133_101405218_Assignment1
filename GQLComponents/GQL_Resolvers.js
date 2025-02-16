const { emailRegex } = require('../constants');
const Employee = require('../models/Employee')
const User = require("../models/User")

// This file will contain all GraphQL Resolvers
// Resolvers perform operations to complete the types defined in typedefs.

exports.resolvers = {
    Query:{
        getEmployees: async(parent, args) => { //3
            console.log(`fetching all employees...`)
            return await Employee.find({})
        },
        
        getEmployeeByDesignation: async(parent, args) => { //8
            console.log(`Fetching all employees with designation : ${args.designation}`);

            const emps =  await Employee.find({designation: new RegExp(args.designation, 'i')})
            console.log(`matching employees : ${JSON.stringify(emps)}`);

            return emps
        },

        getEmployeeByDepartment: async(parent, args) => { //8
            console.log(`Fetching all employees with department : ${args.department}`);

            const emps =  await Employee.find({department: new RegExp(args.department, 'i')})
            console.log(`matching employees : ${JSON.stringify(emps)}`);

            return emps
        },

        getEmployeeByFirstName: async(parent, args) => { //not included
            console.log(`Fetching all employees with the firstname: ${args.first_name}`);
            
            const emps =  await Employee.find({first_name: new RegExp(args.first_name, 'i')})
            console.log(`matching employees : ${JSON.stringify(emps)}`);
            
            return emps
        },
        getEmployeeByID: async(parent, args) => { //5
            console.log(`Fetching all employees with the ID: ${args.id}`);
            
            const emps =  await Employee.findById({_id: args.id})
            console.log(`matching employees : ${JSON.stringify(emps)}`);
            
            return emps
        },

        
        userLogIn: async(parent, args) => { //2
            console.log(`lets look for ${args.username} to see if they are in the database`);
            try{
                const user_list = await User.find()
                console.log(user_list)  

                for (let i = 0; i < user_list.length; i++){
                    //get the username and password
                    if (user_list[i]["username"] == args.username  && user_list[i]["password"] == args.password){
                        return {message: "ur logged in now :)"}
                    }
                }
                return {message: "login failed"}
            }
            catch{
                return {message: "login failed"}
            }
        },
    },

    Mutation: {
        addEmployee: async(parent, args) => { //4
            console.log(`trying to insert employee with email ${args.email}`);

            let genderToAdd = args.gender

            if (args.gender !== "2SLGBTQQIA"){
                genderToAdd = args.gender.toLowerCase()
            } 

            const date = new Date();

            let newEmp = new Employee({
                first_name: args.first_name,
                last_name: args.last_name,
                email: args.email,
                gender: genderToAdd,
                city: args.city,
                designation: args.designation,
                salary: args.salary,
                department: args.department,
                employee_photo: args.employee_photo,
            })

            return await newEmp.save()
        },
        updateEmployee: async(parent, args) => { //6
            if (!args.id){
                console.log(`ID not provided`);
                return JSON.stringify({
                    status: false,
                    "message" : "Please provide employee ID to update"
                })
            }

            console.log(`Trying to update employee id ${args.id}`);

            let genderToAdd = args.gender

            if (args.gender !== '2SLGBTQQIA+'){
                genderToAdd = args.gender.toLowerCase()
            }

            return Employee.findOneAndUpdate(
                { _id: args.id },
                {
                    $set: {
                        first_name : args.first_name,
                        last_name : args.last_name,

                        gender : genderToAdd,
                        city : args.city,
                        designation : args.designation,
                        salary : args.salary,
                    }
                },
                {new: false},
                (err, employee) => {
                    if (err){
                        console.log(`Could not update employee : ${JSON.stringify(err)}`);
                        return null
                    }else{
                        console.log(`Employee info updated : ${JSON.stringify(employee)}`);
                        return employee
                    }
                }
            )
            
        },
        deleteEmployee: async(parent, args) => { //7
            if (!args.id){
                console.log(`ID not provided`);
                return JSON.stringify({
                    status: false,
                    "message" : "Please provide employee ID to delete"
                })
            }

            return await Employee.findOneAndDelete(args.id)
        },

        userSignUp: async(parent, args) => { //1
            console.log("trying to add your user...");

            let newUser = new User({
                username: args.username,
                email: args.email,
                password: args.password,
            })

            return await newUser.save()
        }
    }
}