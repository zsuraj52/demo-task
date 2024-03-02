# CODEBUDDY DEMO TASK
This README provides setup instructions and basic commands for a NestJS application featuring the AppController which contains endpoints for fetching fake JSON data and performing arithmetic calculations.


# Setup
1. Check Node Version: Ensure that Node.js version 18.18.0 is installed on your system.

2. Install Dependencies: Run the following command to install project dependencies:
"npm install"

3. Start Project: Use the following command to start the project in development mode:
"npm run start:dev"

4. Run Basic Test Cases: Execute the following command to run basic test cases:
npm run test:basic

5. Run Advanced Test Cases: Run the following command to execute advanced test cases:
npm run test:advance


6. Swagger Documentation
`http://localhost:${process.env.PORT}/api/docs#/`

The API endpoints are documented using Swagger annotations (@ApiOperation, @ApiResponse, @ApiTags). Swagger UI documentation is available at the following link:

# Additional Information

# 1. Project Structure

The project follows a typical NestJS application structure, with key directories such as `src` for source code and `test` for unit tests. The `app.controller.ts` file contains the main controller logic, while the `app.service.ts` file houses the business logic.

# 2. Environment Variables

The application relies on the following environment variables for configuration:

- `PORT`: Specifies the port on which the server will listen.

Ensure these variables are set appropriately before running the application.

# 3. Dependencies

The project uses the following external dependencies:

- `@nestjs/common`: Version 8.0.0
- `@nestjs/swagger`: Version 4.7.0
- Other dependencies...

# 4. Troubleshooting

# Issue: Installation Fails with Node.js version mismatch

If installation fails with a Node.js version mismatch error, ensure that Node.js version 18.18.0 is installed on your system. You can use a version manager like nvm to manage multiple Node.js versions.


## Thank You
Thank you for providing me with this demo task opportunity. I appreciate the chance to demonstrate my skills and contribute to your project. If you have any further questions or need additional information, please feel free to reach out. I look forward to potentially working together and being part of your team.

Once again, thank you for considering my application and giving me this opportunity.
