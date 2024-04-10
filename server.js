const app = require('./app');
const PORT_NUMBER = 5000;

app.listen(PORT_NUMBER, () => {
    console.log("Server Is Started At Port : " + PORT_NUMBER);
});
