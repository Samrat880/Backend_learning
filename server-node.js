const http = require('http')

const hostname = '127.0.0.1';

const port = 3000;

const server = http.createServer((req,res) => {

    if (req.url === '/') {   
        res.statusCode = 200;
        res.setHeader('Content-Type','text/plain')
        res.end("Hello me")
    }else if (req.url === '/about'){
        res.statusCode = 200;
        res.setHeader('content-Type','text/plain')
        res.end("This is the about page")
    }else{
        res.statusCode = 404;
        res.setHeader('content-type','text/plain')
        res.end("page not found")
    }
})


server.listen(port,hostname,() => {
    console.log(`Server is listening at http://${hostname}:${port}`)
})