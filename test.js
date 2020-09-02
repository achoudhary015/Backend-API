var test = require('tape');
var request = require('supertest');
var obj = require('./server');
//declare first test
test('First test Begins !', function (t) {
    t.end();
});
//run first test
test('ping method in progress ', function (t) {
    request(obj)
        .get('/api/ping')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
            var expectedUsers = { "success": true };

            t.error(err, 'No error');
            t.same(res.body, expectedUsers, 'passed the first test Case');
            t.end();
        });
});

//declare second test
test('Second test begins !', function (t) {
    t.end();
});
//run second test
test('posts method in progress', function (t) {
    request(obj)
        .get('/api/posts?tag=tech,history&sortBy=id&direction=desc')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
            t.error(err, 'passed the first test Case');
            t.end();
        });
});