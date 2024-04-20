const express = require('express');
const cors = require('cors');
const { db, getUsers, postUser, updateUser, userLoginValidate,getUserNameById } = require('./connect')

const app = express();
app.use(cors())
app.use(express.json())

const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
    cors: { origin: '*' }
});

const port = process.env.PORT || 3000;
io.on('connection', (socket) => {
    let initSql = `select m.id,u.userName user,m.message,m.timestamp from messages m Join users u on u.UserId=m.user`;

    db.all(initSql, (err, rows) => {
        if (err) {
            console.error('Error fetching messages:', err);
            return;
        }
        socket.emit('allMessages', rows);
    });

    socket.on('message',  (data) => {
        db.run("INSERT INTO messages (user, message) VALUES (?, ?)", [data.user, data.message], async (err) => {
            if (err) {
                console.error('Error inserting message:', err);
                return;
            }

            let userName =await getUserNameById(data.user);
            // Broadcast the message to all connected clients
            io.emit('message', { id: this.lastID, user: userName, message: data.message, timestamp: new Date().toISOString() });
        });
    });

    socket.on('disconnect', () => {
        console.log('a user disconnected!');
    });
});

app.get('/', (req, res) => {
    return res.send("hi this is working..")
})

app.get('/users', async (req, res) => {
    getUsers().then(data => {
        res.json(data)
    })
})

app.post('/users', (req, res) => {
    let data = req.body;
    postUser(data).then(data => {
        res.json(data);
    })
})

app.put('/users', (req, res) => {
    let data = req.body;
    updateUser(data).then(data => {
        res.json(data);
    })
})

app.post('/userLogin', (req, res) => {
    let data = req.body;
    userLoginValidate(data).then(data => {
        res.json(data);
    })

})
httpServer.listen(port, () => console.log(`listening on port ${port}`));