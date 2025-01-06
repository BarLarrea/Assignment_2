const commentPaths = {
    "/comments/create": {
      post: {
        summary: "Create a new comment",
        description: "Create a new comment for a post.",
        tags: ["Comments"],
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
                    description: "The content of the comment",
                    example: "Hello everyone",
                  },
                  postId: {
                    type: "string",
                    description: "The ID of the post to comment on",
                    example: "60f7b1b1b1b1b1b1b1b1b1b1",
                  },
                },
                required: ["message", "postId"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "Comment created successfully",
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
                        example: "Omer and Bar were here"
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Invalid comment data",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                        type: "string",
                        example: "Invalid comment data"
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/comments/all": {
      get: {
        summary: "Get all comments",
        description: "Retrieve all comments.",
        tags: ["Comments"],
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "List of all comments",
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
    "/comments/{id}": {
      get: {
        summary: "Get comment by ID",
        description: "Retrieve a comment by its ID.",
        tags: ["Comments"],
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
            description: "The ID of the comment to retrieve",
          },
        ],
        responses: {
          200: {
            description: "Comment details",
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
                        example: "Barbaaba"
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Comment not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                        type: "string",
                        example: "Comment not found"
                    },
                  },
                },
              },
            },
          },
        },
      },
      put: {
        summary: "Update comment",
        description: "Update a comment by its ID.",
        tags: ["Comments"],
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
            description: "The ID of the comment to update",
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
                    description: "Updated content of the comment",
                    example: "Updated comment",
                  },
                },
                required: ["message"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Comment updated successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                        type: "string",
                        example: "Comment updated successfully"
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Comment not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                        type: "string",
                        example: "Comment not found"
                    },
                  },
                },
              },
            },
          },
        },
      },
      delete: {
        summary: "Delete comment",
        description: "Delete a comment by its ID.",
        tags: ["Comments"],
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
            description: "The ID of the comment to delete",
          },
        ],
        responses: {
          200: {
            description: "Comment deleted successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                        type: "string",
                        example: "Comment deleted successfully"
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Comment not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                        type: "string",
                        example: "Comment not found"
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/comments/user/{userId}": {
      get: {
        summary: "Get comments by user ID",
        description: "Retrieve all comments made by a specific user.",
        tags: ["Comments"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            schema: {
                type: "string",
                example: "60f7b1b1b1b1b1b1b1b1b1b1"
            },
            description: "The ID of the user whose comments to retrieve",
          },
        ],
        responses: {
          200: {
            description: "List of comments by the user",
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
                        example: "User comment"
                    },
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "User not found or no comments available",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                        type: "string",
                        example: "User not found"
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
  
  export default commentPaths;