const graphql = require('graphql');
const _ = require('lodash')
const {GraphQLID,GraphQLString,GraphQLObjectType,GraphQLInt, GraphQLSchema} = graphql;

const coursedata = [
    {id: "1", coursename: "Full Stack Development", type: "recorded", lectures: 56, proid: "1" },
    {id: "2", coursename: "Android Development", type: "live", lectures: 56, proid: "2" },
    {id: "3", coursename: "AI Development", type: "live", lectures: 56, proid: "3" },
    {id: "4", coursename: "Block Chain Development", type: "recorded", lectures: 56, proid: "4" },
]

const prodata = [
    {id: "1", name: "Harkirat", expertise: "Full stack remote developer"},
    {id: "2", name: "Harnoor", expertise: "Android developer"},
    {id: "3", name: "jack", expertise: "AI developer"},
    {id: "4", name: "phillip", expertise: "Blockchain developer"},
]

const coursetype = new GraphQLObjectType({
    name: "Course",
    fields: ()=>({
        id: {type: GraphQLID},
        coursename:  {type: GraphQLString},
        type:  {type: GraphQLString},
        lectures:  {type: GraphQLInt},
         professor: {
            type: professortype,
            resolve(parent,args){
               return _.find(prodata, {id: parent.proid})
            }
        }
    })
})

const professortype = new GraphQLObjectType({
    name: "Professor",
    fields: ()=>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        expertise: {type: GraphQLString}
        
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQuerytype',
    fields: {
        course: {
            type: coursetype,
            args: {id: {type: GraphQLID}},
            resolve(parent,args){
                return _.find(coursedata, {id: args.id});
            }
        },

        professor: {
            type: professortype,
            args: {id: {type: GraphQLID}},
            resolve(parent,args){
                
                return _.find(prodata,{id: args.id})
            }

        }

    }
})


const Mutation = new GraphQLObjectType({
    name: 'mutationtype',
    fields: {
        addcourse: {
            type: coursetype,
            args: {id: {type: GraphQLID},
            coursename:  {type: GraphQLString},
            type:  {type: GraphQLString},
            lectures:  {type: GraphQLInt},
            professor: {
                type: GraphQLID
            }
              },
                resolve(parent, args){
                    return _.create(coursedata, {id: args.id, coursename: args.coursename, type: args.type, lectures: args.lectures, professor: args.professor})
                }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})