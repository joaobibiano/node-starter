# Backend starter

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository with some ready-to-use examples.

This includes authentication, authorization, Prisma configuration, enviroment variables, Swagger Automatic generation, and more.

## Installation

```bash
yarn install
```

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## Prisma

This project uses the default prisma configuration and make the service available through `PrismaService` globally.

## Authorization

You can use decorators to allow a route to be public.

```ts
@Post()
@Public()
create(@Body() createUserDto: CreateUserDto) {
  return this.usersService.create(createUserDto);
}
```

By default all routes require a valid JWT token.

## Serving HTML

It also serves HTML from public folder. It can be usefull to add some dashboard or other UI.
