// import app.js from the folder backend
const app = require("./backend/app");

// backend server is listening on http://localhost:3001
app.listen(3001, ()=> {
    console.log("Express Application is listening on PORT 3001 ...");
});