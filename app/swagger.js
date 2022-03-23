import swaggerAutogen from "swagger-autogen";

const outputFile = "app/swagger-output.json";
const endpointsFiles = ["app/index.js"];

swaggerAutogen()(outputFile, endpointsFiles);
