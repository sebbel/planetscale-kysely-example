# planetscale + kysely example

In this repository, I am showcasing how you can connect to your planetscale
database with kysely using the excellent planetscale-kysely connector.
This one works from Serverless infrastructure that doesn't need to maintain a
database connection as Queries and Inserts are done via http request.

To start, create a planetscale database and save your credentials to a `.env`
file. Follow the naming convention in `.env.sample`

When you are done, you can run yarn start which will add a movie and read a
movie.

