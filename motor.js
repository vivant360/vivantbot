var builder = require('botbuilder');

module.exports = [
    // Make
    function (session) {
        session.send('Hi '+session.userData.name+', Thanks for choosing Motor Insurance!');
        builder.Prompts.text(session, 'What is your Vehicle Make?');
    },
    function (session, results, next) {
        session.dialogData.make = results.response;
        next();
    },

    // Model
    function (session) {
        builder.Prompts.text(session, 'What is your Vehicle Model?');
    },
    function (session, results, next) {
        session.dialogData.model = results.response;
        next();
    },
	
	// year
    function (session) {
        builder.Prompts.number(session, 'What is your Vehicle Year?');
    },
    function (session, results, next) {
        session.dialogData.year = results.response;
        next();
    },
	
	// spec
    function (session) {
        builder.Prompts.text(session, 'What is your Vehicle Spec?');
    },
    function (session, results, next) {
        session.dialogData.spec = results.response;
        next();
    },
	
	// vehicle value
    function (session) {
        builder.Prompts.number(session, 'What is your Vehicle Value?');
    },
    function (session, results, next) {
        session.dialogData.value = results.response;
        next();
    },
	
	// Registration Place
    function (session) {
        builder.Prompts.text(session, 'What is your Place of Registration?');
    },
    function (session, results, next) {
        session.dialogData.place = results.response;
        next();
    },
	
	// DOB
    function (session) {
        builder.Prompts.number(session, 'What is your Age?');
    },
    function (session, results, next) {
        session.dialogData.age = results.response;
        next();
    },

	
	// Experience
    function (session) {
        builder.Prompts.number(session, 'What is your Driving Experience?');
    },
    function (session, results, next) {
        session.dialogData.exp = results.response;
        next();
    },


    // Search...
    function (session) {
        var name = session.userData.name;
        var make = session.dialogData.make;
        var model = session.dialogData.model;
		var spec = session.dialogData.spec;
        var year = session.dialogData.year;
		var value = session.dialogData.value;
		var place = session.dialogData.place;
        var age = session.dialogData.age;

        session.send(
            'Ok %s. Thanks for choosing Motor Insurance your vehicle details %s-%s-%s-%s, your vehicle value %s, your place of Registration %s, your age is %s...',
			name,
            make,
            model,
            spec,
			year,
			value,
			place,
			age); 
				builder.Prompts.choice(session, 'Do you need another insurance?', ['Yes', 'No']);
    }
];