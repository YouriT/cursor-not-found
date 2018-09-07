# Mongo Bug Cursor Id Not Found

This repo is inteded to reproduce in a stable way this [MongoDB bug](https://jira.mongodb.org/browse/SERVER-36808)

## How to reproduce

```bash
docker-compose up -d
mongo localhost:27018/some-db --eval 'db.setLogLevel(1)'
docker exec -ti cursornotfound_app_1 yarn start
```
After the first documents prints in the console do:
```bash
mongo localhost:27018/some-db --eval 'db.adminCommand({refreshLogicalSessionCacheNow: 1})'
```
The cursor id not found error raises on the screen.
