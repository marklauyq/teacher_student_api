#Teacher Student Admin API 

This is a simple Teacher Student admin API that i am doing as an assignment given to me

---

To run server on local machine do the following

Pull the codes into your local repository

Install the following 
- nodeJS
- MySql

Create the mysql tables
- The tables are located in a folder `db/init/setup.sql`
- It also contains a set of inserts so that the test cases will be able to run smoothly

Set the ENVIRONMENT variables for your mysql instance
```
MYSQL_HOST = {mysql_host}
MYSQL_USER = {mysql_username}
MYSQL_PASS = {mysql_password}
```

Once all has been setup, the following commands
```
npm install
npm server.js 
```

This will start your local sever on port 3000

you can change the port number by running the following
```
npm server.js -p {port_number}
```