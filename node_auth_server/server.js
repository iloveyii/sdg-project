// Import required packages
require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const _ = require('lodash')
const session = require('express-session')
const bcrypt = require('bcrypt')

const Game = require('./database/models').Game
const Login = require('./database/models').Login
const Poll = require('./database/models').Poll


const {
    PORT = 8090,
    SESS_NAME = 'sid',
    SESS_SECRET = 'thisisasecret',
    SESS_LIFETIME = 1000 * 60 * 60 * 2, // 2 hrs
} = process.env

app.use(
    express.static(__dirname + '/public'),
    bodyParser.urlencoded({extended: true}),
    bodyParser.json(),
    cors(),
    session({
        name: SESS_NAME,
        resave: false,
        saveUninitialized: false,
        secret: SESS_SECRET,
        cookie: {
            maxAge: SESS_LIFETIME,
            sameSite: 'none',
            secure: false,
        }
    })
);

const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect('/api/v1/login')
    } else {
        next()
    }
}

app.get('/api/v1', (req, res) => {
    const paths = app._router.stack
    const defined_paths = []
    // console.log(Object.keys(paths))
    paths.forEach(p => {
        if (p.route && p.route.path) {
            defined_paths.push({
                path: p.route.path,
                method: p.route.stack[0].method
            })
        }
    });
    return res.json({paths: defined_paths})
});

app.get('/api/v1/games', (req, res) => {
    console.log('GET api/v1/games')
    Game.findAll().then(games => res.status(200).json(games))
});

app.get('/api/v1/random-games', (req, res) => {
    console.log('GET api/v1/random-games')
    Game.findAll().then(games => {
        const sports = _.uniq(_.map(games, 'sport'))
        const rand_sport_id = _.random(0, sports.length - 1)
        console.log(sports, rand_sport_id)
        const sport_selected = sports[rand_sport_id]
        Game.findAll({where: {sport: sport_selected}}).then(sports => res.status(200).json(sports))
    })
});

app.get('/api/v1/games/:id', (req, res) => {
    console.log('GET api/v1/games/:id')
    const id = req.params.id ? req.params.id : null
    console.log('ID: ', id)
    Game.findOne({where: {id: id}}).then(game => res.status(200).json(game))
});

app.post('/api/v1/games', (req, res) => {
    const {awayName, group, homeName, name, sport, country, state} = req.body;
    Game.create({
        awayName: awayName, group: group, homeName: homeName, name: name, sport: sport, country: country, state: state
    }).then(r => res.status(201).json({game: r}));
});

app.post('/api/v1/login-games', redirectLogin, async (req, res) => {
    const {questions} = req.body;
    console.log(questions);
    await questions.forEach(async question => {
        await Poll.upsert({
            loginId: req.session.userId,
            gameId: question.id,
            checked: question.checked
        })
    })
    res.status(201).json({poll: 'success'});
});

app.delete('/api/v1/games/:id', (req, res) => res.json({game: 1}));
app.put('/api/v1/games/:id', (req, res) => res.json({game: 1}));

app.get('/api/v1/login', async (req, res) => {
    await res.send(`
        <html>
            <body>
                <form action="/api/v1/login" method="post">
                    <input type="email" required name="email" placeholder="Email" />
                    <input type="password" required name="password" placeholder="Password" />
                    <button type="submit"> Login </button>
                </form>
                <a href="/api/v1/register">Register</a>
            </body>
        </html>
    `)
});

app.get('/api/v1/islogin', async (req, res) => {
    console.log('GET /api/v1/islogin', req.session, req.headers.cookie)
    if (!req.session.userId) {
        return res.status(200).json({login: 'fail', user_id: 'f' + req.session.userId})
    }
    return res.status(200).json({login: 'success', user_id: 's' + req.session.userId})

})

app.post('/api/v1/login', async (req, res) => {
    const {email, password} = req.body
    if (!email || !password) return res.status(200).json({login: 'fail'})
    const user = await Login.findOne({where: {email: email}})
    if (user && await bcrypt.compare(password, user.password)) {
        req.session.userId = user.id
        if (req.headers['content-type'] === 'application/json') {
            return res.status(200).json({login: 'success'})
        } else {
            return res.redirect('/api/v1/random-games')
        }
    }
    if (req.headers['content-type'] === 'application/json') {
        return res.status(200).json({login: 'fail'})
    } else {
        return res.redirect('/api/v1/login')
    }
});


app.get('/api/v1/register', async (req, res) => {
    await res.send(`
        <html>
            <body>
                <form action="/api/v1/register" method="post">
                    <input type="text" required name="username" placeholder="Username" />
                    <input type="email" required name="email" placeholder="Email" />
                    <input type="password" required name="password" placeholder="Password" />
                    <button type="submit"> Register </button>
                </form>
                <a href="/api/v1/login">Login</a>
            </body>
        </html>
    `)
});

app.post('/api/v1/register', async (req, res) => {
    const {username, email, password} = req.body
    const user = await Login.findOne({where: {email: email}})
    if (user) {
        if (req.headers['content-type'] === 'application/json') {
            return res.status(201).json({register: 'fail', err: 'Email already exists!'})
        }
        return res.send(`
            <h1>This email is already registered</h1>
            <a href="/api/v1/login">Login</a>
        `)
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        Login.create({
            username: username, email: email, password: hashedPassword
        }).then(user => {
            if (req.headers['content-type'] === 'application/json') {
                res.status(201).json({register: 'success'})
            } else {
                return res.send(`
                    <h1>User successfully registered</h1>
                    <a href="/api/v1/login">Login</a>
                `)
            }
            req.session.userId = user.dataValues.id
            console.log('user registered : ', user.dataValues)
        });

    } catch (e) {
        res.status(500).json(e)
    }
});

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
app.listen(PORT, () => console.log('http://localhost:' + PORT));

module.exports = app
