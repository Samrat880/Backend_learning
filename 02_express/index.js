import express from 'express'
import logger from './logger';
import morgan from 'morgan';



const app = express();
const PORT = 3000;
app.use(express.json())


const morganFormat = ':method :url :status :response-time]'

app.use(morgan(morganFormat,{
    stream: {
        write: (message) => {
            const logObject = {
                method: message.split(' ')[0],
                url: message.split(' ')[1],
                status: message.split(' ')[2],
                responseTime: message.split(' ')[3],
            };
            logger.info(JSON.stringify(logObject));
        }
    }
}))


let users =  []

let nextId = 1;

app.post('/users',(req,res) => {
    const {name, phoneNumber} = req.body
    const newUser = {
        id: nextId++,
        name,
        phoneNumber
    }

    users.push(newUser)
    res.status(201).json(newUser)
})


app.get('/users', (req,res) => {
    res.status(200).send(users)
})


app.get('/users/:id', (req,res) => {
    const profile = users.find( t => t.id === parseInt(req.params.id))
    
    if(!profile){
        return res.status(404).send('User not found')
    }else{
        res.status(200).json(profile)
    }
})


// update user

app.put('/users/:id', (req,res) => {
     const profile = users.find((t) => t.id === parseInt(req.params.id));

     if (!profile) {
        return res.status(404).send('user not found');
     }

     const {name,phoneNumber} = req.body     
     profile.name = name
     profile.phoneNumber = phoneNumber
     res.status(200).send(profile)

})


// delete user

app.delete('/users/:id', (req,res) => {
     const profile = users.findIndex((t) => t.id === parseInt(req.params.id));

     if (profile === -1) {
       return res.status(404).send("user not found");
     }

    users.splice(profile,1)
    res.status(200).send("user deleted successfully")
})


// app.get('/', (req,res) => {
//     res.send('Hello me')
// })

// app.get('/about', (req,res) => {
//     res.send('What you know about me')
// })

// app.get('/twitter', (req,res) => {
//     res.send('Samrat Twitter page coming soon!')
// })

// app.get('/instagram', (req,res) => {
//     res.send('Samrat Instagram page coming soon!')
// })

// app.get('/linkedin', (req,res) => {
//     res.send('Samrat linkedin page coming soon!')
// })

// app.get('/github',(req,res) => {
//     res.send('Samrat Github page coming soon!')
// })


app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}...`)
})