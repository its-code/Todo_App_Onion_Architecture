const {PORT} = require("./config/port.config")
const app = require('./http/app')

const port = PORT

app.listen(port,()=>{
    console.log("Running uo on the port: "+port)
})