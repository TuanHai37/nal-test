# nal-interview
## Installation

- Install packages

```bash
$ npm install
```

## Initialize data

``` 
$ npm run db:seed
```
## Running the app

```bash
# development
$ npm run start

```
## Running eslint

```bash
$ npm run eslint

```

## Test

```bash
$ npm run test
```
## Demo

- Login as a user default

```
curl --location 'http://localhost:4000/sign-in' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"admin@gmail.com",
    "password":"password123"
}
'
```

- Add Event API
```
curl --location 'http://localhost:4000/add-event' \
--header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwiaWQiOiI2NDBjZDgxY2Y0ZGY3MWZhMTdhOTA0ZjciLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY3ODYwNzI4OSwiZXhwIjoxNjc4NjEwODg5fQ.Y1xE82eTwJAFRG66WroL8z0xRKzvob6T3fcjiJpQ_34ossITud50BhPi7e4yEQIivQ8TzjEojCEYMtyVHBQ3LNbMVtiGSrqmBTAKCRNAjwLOs0Wk8NNF4DKk0GLUzqs9zKLYq6wuwb9RJjwDeHjjyX0vMmz6tOoyUnjJ6jurvQ8' \
--header 'Content-Type: application/json' \
--data '{
    "eventName": "hai",
    "dueDate": "2018/03/22",
    "startDate": "2017/03/22",
    "description": "HI"
}'
```

- Update Event API
```
curl --location --request PUT 'http://localhost:4000/update-event?eventId=640d89ba43ba394f899dc221' \
--header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwiaWQiOiI2NDBkOTBmMWY1ZTNhYTVjZjhmZmM0MzciLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY3ODYxMjQ5MSwiZXhwIjoxNjc4NjE2MDkxfQ.xGQof8UiF3Lon7YSk9wSvi-q8jbmryx9mSiIN9Fkw5jNkMJHyAl1LWhxRiQAsDk8ynEw45Nej1Ve9Q4R0sb-8bcLcp8quOb31PbJUzOUTPc7tyO6Pn31jdTLEcYXxlwAAbXVoaQubP8BTEk3cYNbcZHv655anWVpClKJLpOSMNA' \
--header 'Content-Type: application/json' \
--data '{
    "eventName": "hai",
    "dueDate": "2018/03/22",
    "startDate": "2017/03/22",
    "description": "HI"
}'
```

- Edit Event API
```
curl --location --request PUT 'http://localhost:4000/edit-event?eventId=640d89ba43ba394f899dc221' \
--header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwiaWQiOiI2NDBkOTBmMWY1ZTNhYTVjZjhmZmM0MzciLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY3ODYxMjQ5MSwiZXhwIjoxNjc4NjE2MDkxfQ.xGQof8UiF3Lon7YSk9wSvi-q8jbmryx9mSiIN9Fkw5jNkMJHyAl1LWhxRiQAsDk8ynEw45Nej1Ve9Q4R0sb-8bcLcp8quOb31PbJUzOUTPc7tyO6Pn31jdTLEcYXxlwAAbXVoaQubP8BTEk3cYNbcZHv655anWVpClKJLpOSMNA' \
--header 'Content-Type: application/json' \
--data '{
    "eventName": "hai",
    "dueDate": "2018/03/22",
    "startDate": "2017/03/22",
    "description": "HI"
}'
```

- Delete Event API
```
curl --location 'http://localhost:4000/delete-event?eventId=640d89ba43ba394f899dc221' \
--header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwiaWQiOiI2NDBkOTBmMWY1ZTNhYTVjZjhmZmM0MzciLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY3ODYxMjQ5MSwiZXhwIjoxNjc4NjE2MDkxfQ.xGQof8UiF3Lon7YSk9wSvi-q8jbmryx9mSiIN9Fkw5jNkMJHyAl1LWhxRiQAsDk8ynEw45Nej1Ve9Q4R0sb-8bcLcp8quOb31PbJUzOUTPc7tyO6Pn31jdTLEcYXxlwAAbXVoaQubP8BTEk3cYNbcZHv655anWVpClKJLpOSMNA' \
--header 'Content-Type: application/json' \
--data '{
    "eventName": "hai",
    "dueDate": "2019/03/22",
    "startDate": "2017/03/22",
    "description": "HI"
}'
```