run:
	npm start

pm2:
	pm2 start process.json

pm2-dev:
	pm2 start process.json --env development