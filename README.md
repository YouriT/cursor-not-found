# Mongo Bug Cursor Id Not Found

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