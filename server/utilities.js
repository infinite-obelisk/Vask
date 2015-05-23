var session = require('express-session');

exports.createSession = function(request, response, user) {
    console.log('createSession');
    return request.session.regenerate(function(err) {
        if (err) {
            console.log('error in creating a session', err);
            throw err;
        }
        request.session.user = user;
        console.log('created that session, redirect to home');
        response.status(201).send(user);
    });
};
