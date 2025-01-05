import userPaths from "./userRoutPaths";
import postsPaths from "./postsRoutPaths";
import commentsPaths from "./commentsRoutPaths";
import components from "./componenets";


const options = { 
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Assignment_2 - REST API",
            version: "1.0.0",
            description: "REST server including authentication using JWT",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
              },
        },
        servers: [{url: "http://localhost:3000",},],
        tags: [
          {
            name: "Users",
            description: "The user Authentication API",
          },
          {
            name: "Posts",
            description: " The Posts API",
          },
          {
            name: "Comments",
            description: "The Comments API",
          },
        ],
        components: components,
        paths: { ...userPaths, ...postsPaths, ...commentsPaths },
    },
    apis: ["./src/routes/*.ts"],
};


export default options;


