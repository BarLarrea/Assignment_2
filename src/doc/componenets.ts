const components = {
    securitySchemes: {
        bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
        },
    },
    schemas: {
        UserInput: {
            type: "object",
            properties: {
                firstName: {
                    type: "string",
                    description: "The user's first name",
                },
                lastName: {
                    type: "string",
                    description: "The user's last name",
                },
                email: {
                    type: "string",
                    description: "The user's email address",
                    example: "cocobongo@gmail.com",
                },
                password: {
                    type: "string",
                    description: "The user's password",
                    example: "cocobongo1991!@#",
                },
            },
            required: ["firstName", "lastName", "email", "password"],
        },
    
        User: {
            allOf: [
                { $ref: "#/components/schemas/UserInput" },
                {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            description: "Unique identifier for the user (MongoDB ObjectId)",
                            example: "60d0fe4f5311236168a109ca", 
                        },
                        refreshToken: {
                            type: "array",
                            items: { type: "string" },
                            description: "A list of refresh tokens for the user",
                            example: ["eyJhbGci...", "eyJhbGci..."],
                        },
                    },
                    required: ["id", "refreshToken"],
                },
            ],
        },

    
    },
    
};

export default components;