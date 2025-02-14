// This file will contain all GraphQL types

const {gql} = require("apollo-server-express")

exports.typeDefs = gql `
    #this is a comment in gql
    #! means important
    #object type - represents model

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
    }

    #query type - defines operations for retrieving data

    #this is a query object
    type Query{
        getEmployees: [Employee]
        getEmployeeByCity(city: String!): [Employee]
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
        ) : Employee

        updateEmployee(
            id : ID!
            firstname : String!
            lastname : String!
            gender : String!
            city : String!
            designation : String!
            salary : Float!
        ) : Employee

        deleteEmployee(id : ID!) : Employee
    }
` //gql ends