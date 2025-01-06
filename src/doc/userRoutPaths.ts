import { response } from "express";
import userModel from "../models/userModel";

const userPaths = {
  "/users/register": {
    post: {
      summary: "Register a new user",
      description: "Create a new user account with the provided details",
      tags: ["Users"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UserInput"
            },
          },
        },
      },
      responses: {
        201: {
          description: "User registered successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User" 
              },
            },
          },
        },
        400: {
          description: "Invalid input or user already exists",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    description: "Error message",
                    example: "User already exists",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/users/login": {
    post: {
      summary: "Login a user",
      description: "Authenticate a user and return a JWT token",
      tags: ["Users"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
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
              required: ["email", "password"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "User logged in successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  accessToken: {
                    type: "string",
                    description: "JWT access token for authentication",
                    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                  },
                },
              },
            },
          },
        },
        401: {
          description: "Invalid email or password",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    description: "Error message",
                    example: "Invalid email or password",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/users/update": {
    put: {
      summary: "Update user details",
      description: "Update the authenticated user's details",
      tags: ["Users"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                  description: "User ID",
                  example: "60d0fe4f5311236168a109ca"
                },
                firstName: { 
                  type: "string",
                  description: "Updated first name",
                  example: "Moshe"
                },
                lastName: { 
                  type: "string",
                  description: "Updated last name",
                  example: "Brosh"
                }
              },
              required: ["id", "firstName", "lastName"]
            }
          }
        }
      },
      responses: {
        200: {
          description: "User updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { 
                    type: "string",
                    example: "User updated successfully"
                  }
                }
              }
            }
          }
        },
        400: {
          description: "All fields are required",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: { 
                    type: "string",
                    example: "All fields are required"
                  }
                }
              }
            }
          }
        },
        401: {
          description: "Access token required",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    example: "Access token required"
                  }
                }
              }
            }
          }
        },
        403: {
          description: "Invalid or expired access token",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    example: "Invalid or expired access token"
                  }
                }
              }
            }
          }
        },
        404: {
          description: "User not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    example: "User not found"
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  "/users/refresh_token": {
    post: {
      summary: "Refresh authentication tokens",
      description: "Generates new access and refresh tokens using a valid refresh token",
      tags: ["Users"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                token: {
                  type: "string",
                  description: "Refresh token",
                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                }
              },
              required: ["token"]
            }
          }
        }
      },
      responses: {
        200: {
          description: "Tokens refreshed successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  accessToken: {
                    type: "string",
                    description: "New access token",
                    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  },
                  refreshToken: {
                    type: "string",
                    description: "New refresh token",
                    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  }
                }
              }
            }
          }
        },
        400: {
          description: "Refresh token is required",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    example: "Refresh token is required"
                  }
                }
              }
            }
          }
        },
        403: {
          description: "Expired or invalid refresh token",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    example: "Expired or invalid refresh token"
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  "/users/logout": {
    post: {
      summary: "Logout a user",
      description: "Logout the authenticated user by invalidating their refresh token",
      tags: ["Users"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                token: {
                  type: "string",
                  description: "Refresh token to invalidate",
                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                }
              },
              required: ["token"]
            }
          }
        }
      },
      responses: {
        200: {
          description: "User logged out successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string",
                   example: "User logged out successfully",
                   }
                }
              }
            }
          }
        },
        400: {
          description: "Refresh token required",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: { type: "string",
                   example: "Refresh token required",
                   }
                }
              }
            }
          }
        },
        403: {
          description: "Invalid or expired refresh token",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: { type: "string",
                   example: "Refresh token is not valid for this user",
                   }
                }
              }
            }
          }
        },
        404: {
          description: "User not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: { type: "string", example: "User not found" }
                }
              }
            }
          }
        }
      }
    }
  },
  "/users/delete": {
    delete: {
      summary: "Delete a user",
      description: "Delete the authenticated user by their ID",
      tags: ["Users"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                  description: "User ID to delete",
                  example: "60d0fe4f5311236168a109ca"
                }
              },
              required: ["id"]
            }
          }
        }
      },
      responses: {
        200: {
          description: "User deleted successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "User deleted successfully"
                  }
                }
              }
            }
          }
        },
        400: {
          description: "User ID is required",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    example: "User ID is required"
                  }
                }
              }
            }
          }
        },
        401: {
          description: "Access token required",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    example: "Access token required"
                  }
                }
              }
            }
          }
        },
        404: {
          description: "User not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    example: "User not found"
                  }
                }
              }
            }
          }
        }
      }
    }
  },
};

export default userPaths;