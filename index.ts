import express from "express"
import cors from "cors"
import * as dotenv from 'dotenv';
import { createHandler } from 'graphql-http/lib/use/express';
import { schema } from "./src/graphql/schema";
import { root } from "./src/graphql/resolvers";
import graphqlPlayground from 'graphql-playground-middleware-express';
import { sequelize } from "./src/db/sequelize/sequelize";
import mongoose from 'mongoose';

dotenv.config(); //Dot Environment configuration
const app = express() //Express App
app.use(cors()) //Use Cross-Orgin Resource Sharing

const PORT = process.env.PORT || 4000; //Port

//Initialize Sequelize
sequelize.authenticate().then(() => {
    console.log('Database connection has been established successfully.');
}).catch((err) => {
    console.error('Unable to connect to the database:', err);
});

//Initialize mongoose
mongoose.connect(process.env.MONGO_CLUSTER_CONNECTION_STRING || "").then(() => {
    console.log("Connected to Mongo Atlas!")
}).catch((err) => {
    console.log("Error connecting to Mongo: " + err)
})

//Root Get Request
app.get('/', (req, res) => {
    res.status(200).json({ success: true, message: "GraphQL Backend is running" })
})

//Root Post Request
app.post('/', (req, res) => {
    res.status(200).json({ success: true, message: "GraphQL Backend is running" })
})

//GraphQL Endpoint
app.use('/graphql', createHandler({ schema: schema, rootValue: root }));

//GraphQL Playground Endpoint
app.get('/playground', graphqlPlayground({ endpoint: '/graphql' }));

//Listen to port
app.listen(PORT, () => {
    console.log(`GraphQL server running at http://localhost:${PORT}/graphql`);
    console.log(`GraphQL Playground available at http://localhost:${PORT}/playground`);
});