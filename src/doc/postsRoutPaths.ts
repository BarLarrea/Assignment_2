
const postPaths = {
    "/posts/create": {
      post: {
        summary: "Create a new post",
        description: "Create a new post for the authenticated user.",
        tags: ["Posts"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    description: "The content of the post",
                    example: "Hello Colman 2025",
                  },
                },
                required: ["message"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "Post created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    _id: {
                        type: "string",
                        example: "60f7b1b1b1b1b1b1b1b1b1b1"
                    },
                    message: {
                        type: "string",
                        example: "Hello Colman 2025"
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Invalid post data",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                        type: "string",
                        example: "Invalid post data"
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/posts/all": {
      get: {
        summary: "Get all posts",
        description: "Retrieve all posts for the authenticated user.",
        tags: ["Posts"],
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Array of posts",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      _id: {
                        type: "string",
                        example: "60f7b1b1b1b1b1b1b1b1b1b1"
                    },
                      message: {
                        type: "string",
                        example: "Hello World"
                        },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/posts/{id}": {
      get: {
        summary: "Get post by ID",
        description: "Retrieve a post by its ID.",
        tags: ["Posts"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
                type: "string",
                example: "60f7b1b1b1b1b1b1b1b1b1b1"
            },
            description: "The ID of the post to retrieve",
          },
        ],
        responses: {
          200: {
            description: "Post details",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    _id: {
                        type: "string",
                        example: "60f7b1b1b1b1b1b1b1b1b1b1"
                    },
                    message: {
                        type: "string",
                        example: "Hello World"
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Post not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                        type: "string",
                        example: "Post not found"
                    },
                  },
                },
              },
            },
          },
        },
      },
      put: {
        summary: "Update post",
        description: "Update a post by its ID.",
        tags: ["Posts"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
                type: "string",
                example: "60f7b1b1b1b1b1b1b1b1b1b1"
            },
            description: "The ID of the post to update",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    description: "Updated content of the post",
                    example: "Hello Colman 2025 Updated",
                  },
                },
                required: ["message"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Post updated successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                        type: "string",
                        example: "Post updated successfully"
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Invalid post data",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                        type: "string",
                        example: "Invalid post data"
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Post not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                        type: "string",
                        example: "Post not found"
                    },
                  },
                },
              },
            },
          },
        },
      },
      delete: {
        summary: "Delete post",
        description: "Delete a post by its ID.",
        tags: ["Posts"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
                type: "string",
                example: "60f7b1b1b1b1b1b1b1b1b1b1"
            },
            description: "The ID of the post to delete",
          },
        ],
        responses: {
          200: {
            description: "Post deleted successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                        type: "string",
                        example: "Post deleted successfully"
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Post not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                        type: "string",
                        example: "Post not found"
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };
  
  export default postPaths;
  