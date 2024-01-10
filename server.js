const express  = require('express');
const morgan = require('morgan');
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema/graphqlschema')
const app = express();


app.use(morgan('tiny'))

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true
}))

app.get('/',(req,res)=>{
    res.send("this is a test endpoint")
})

app.listen(8080, ()=>{
    console.log("server started");
})