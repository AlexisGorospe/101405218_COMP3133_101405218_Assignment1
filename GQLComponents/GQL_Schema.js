// This file will contain all GraphQL types
const {gql} = require("apollo-server-express")

exports.typeDefs = gql `
    #this is a comment in gql
    #! means important
    #object type - represents model
    scalar Date

    #this is an employee object
    type Employee{
        id: ID!
        firstname: String!
        lastname: String!
        email: String!
        gender: String!
        city: String!
        designation: String!
        salary: Float!
        date_of_joining: Date
        department: String!
        employee_photo: String!
        created_at: Date
        updated_at: Date


    }
    
    #this is a user object
    type User{
        id: ID!
        username: String!
        email: String!
        password: String!
        created_at: Date
        updated_at: Date
    }

    #query type - defines operations for retrieving data

    #this is a query object
    type Query{
        getEmployees: [Employee]
        getEmployeeByDesignation(designation: String!): [Employee]
        getEmployeeByDepartment(department: String!): [Employee]
        getEmployeeByFirstName(name: String!): [Employee]
        getEmployeeByID(id: ID!): Employee
    }
    type Mutation {
        addEmployee(
            firstname : String!
            lastname : String!
            email : String!
            gender : String!
            city : String!
            designation : String!
            salary : Float!
            date_of_joining: Date!
            department: String!
            employee_photo: String!
            created_at: String!
            updated_at: String!
        ) : Employee

        updateEmployee(
            id : ID!
            firstname : String!
            lastname : String!
            email : String!
            gender : String!
            city : String!
            designation : String!
            salary : Float!
            date_of_joining: Date!
            department: String!
            employee_photo: String!
            created_at: String!
            updated_at: String!
        ) : Employee

        userSignUp(
            username: String!
            email: String!
            password: String!
            created_at: Date
            updated_at: Date
        ) : User


        deleteEmployee(id : ID!) : Employee
    }
    
` //gql ends