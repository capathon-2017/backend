# backend
backend url Karin: <a href="http://192.168.101.223:3000/backend">Backend</a>

Get all users:
GET http://192.168.101.223:3000/users
Returns a list of all users.

Add user:
POST http://192.168.101.223:3000/users/add?name=klaasje&skill=java
Inserts the user in the list. All query params are added as data.