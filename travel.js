var builder = require('botbuilder');

module.exports = [
    // Trip
    function (session) {
        session.send('Hi '+session.userData.name+', Thanks for choosing Travel Insurance!');
        builder.Prompts.choice(session, 'Choose your Trip?', ['Single', 'Multiple']);
    },
    function (session, results, next) {
        session.dialogData.trip = results.response.entity;
        next();
    },
	
	// Travel Plan
    function (session) {
        builder.Prompts.choice(session, 'Choose your Travel Plan?', ['Individual', 'Family']);
    },
    function (session, results, next) {
        session.dialogData.plan = results.response.entity;
        next();
    },

    // Age
    function (session) {
        builder.Prompts.number(session, 'Please enter your age?');
    },
    function (session, results, next) {
        session.dialogData.age = results.response;
        next();
    },

    // Search...
    function (session) {
        var name = session.userData.name;
        var trip = session.dialogData.trip;
        var plan = session.dialogData.plan;
		var age=session.dialogData.age;

        session.send(
            'Ok %s. Thanks for choosing Travel Insurance for trip %s, plan %s and age %s...',
            name,
            trip,
            plan,
			age); 				
    }
];