const Strapi = require("./server");

const strapi = new Strapi({
  baseURL: "http://127.0.0.1:1337",
  baseURLgraphql: "http://127.0.0.1:1337/graphql",
  debug: true,
});

var query = `
{patients{nom}}
`;

strapi.graphql({
  query: query,
});
