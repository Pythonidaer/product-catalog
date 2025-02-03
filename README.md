# Product Catalog

This application is being set up as a mock eCommerce website. My intention is to mirror [F.W. Webb](https://www.fwwebb.com/) and learn more about full-stack development using the tech stack Nextjs, React, Nodejs, Express, Postgres, Jest, and Supertest.

## Documentation

[React.dev](https://react.dev/)

[Next.js](https://nextjs.org/)

[Prisma](https://www.prisma.io/)

[Railway Blog](https://blog.railway.com/guides)

[Netlify](https://docs.netlify.com/)

[Jest](https://jestjs.io/docs/cli)

[Supertest](https://github.com/ladjs/supertest)

### Useful Commands
`--runInBand`: Runs tests sequentially instead of in parallel (prevents multiple Express instances).

`--setupFilesAfterEnv`: Ensures setup files run before each test suite.

`npx prisma init`: Initialize Prisma in your project

`npx prisma db pull`: Pull the latest database schema (if existing)

`npx prisma migrate dev --name <migration_name>`: Create a new migration (after modifying `prisma/schema.prisma`)

`npx prisma generate`: Generate Prisma Client (after schema changes)

`npx prisma db seed`: Seed the database with initial test data

`npx prisma migrate reset`: Reset the database (deletes & recreates)