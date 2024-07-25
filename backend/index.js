// index.js

const App = require("./App");

const PORT = process.env.PORT || 3000;
const app = new App();

app.startServer(PORT);
