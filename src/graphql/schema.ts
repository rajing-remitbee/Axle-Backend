import { buildSchema } from 'graphql';

//Build Schema
export const schema = buildSchema(
  `
    type CountryCode {
      id: Int!
      name: String!
      dialcode: String!
      countrycode: String!
    }
  
    type Query {
      countryCodes: [CountryCode!]!
    }
  `
);