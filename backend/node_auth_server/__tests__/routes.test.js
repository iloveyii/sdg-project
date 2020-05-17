const request = require('supertest')
const app = require('../server')
describe('POST api/v1/games', () => {
    it('should create a new game', async () => {
        const res = await request(app)
            .post('/api/v1/games')
            .send({
                "awayName": "Football away team",
                "createdAt": "2015-12-18T12:30:39.228Z",
                "group": "Greek Cup",
                "homeName": "Football home team",
                "id": 1002916450,
                "name": "Football away team - Football home team",
                "objectId": "1UaQjc7lIb",
                "sport": "FOOTBALL",
                "country": "ENGLAND",
                "state": "STARTED"
            });
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('game')
    })


});


describe('GET /api/v1/games', function () {
    it('responds with json', function (done) {
        request(app)
            .get('/api/v1/games')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
    });
});

