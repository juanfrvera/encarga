Run local database in docker: https://towardsdatascience.com/run-your-local-database-in-docker-3e7ed68a50f3

Create container with postgres database: 
$ docker run --name container_name -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgres

You can start and stop the container by running:
docker start container_name or docker stop container_name