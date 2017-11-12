# short url generator
stack -- node + express + postgres + pug

# setup
- install all dependencies `npm install`
- run server/seeders/db.sql `psql -f server/seeders/db.sql` for initial setup, it will create test db and dev db with urls table

# run
- `npm start` to run app,
- `npm test` to run unit test
- go to `localhost:3000` to access the page for shorting url
