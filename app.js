// This loads the environment variables from the .env file
require('dotenv-extended').load();

var builder = require('botbuilder');
var restify = require('restify');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot and listen to messages
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
server.post('/api/messages', connector.listen());

var DialogLabels = {
    Motor: 'Motor',
    Home: 'Home',
    Medical: 'Medical',
	Travel: 'Travel'
};

var userStore = [];
var bot = new builder.UniversalBot(connector, [ function (session) {
		
        builder.Prompts.text(session, 'Hello... What\'s your name?');
    },
	
	function(session,results){
	session.userData.name = results.response;
            // prompt for search option
        builder.Prompts.choice(
            session, 
            'Hi ' + results.response + ', Are you looking for a Insurance?',
            [DialogLabels.Home, DialogLabels.Motor, DialogLabels.Medical, DialogLabels.Travel],
            {
                maxRetries: 5,
                retryPrompt: 'Not a valid option'
            });
    },
    function (session, result) {
        if (!result.response) {
            // exhausted attemps and no selection, start over
            session.send('Ooops! Too many attemps :( But don\'t worry, I\'m handling that exception and you can try again!');
            return session.endDialog();
        }

        // on error, start over
        session.on('error', function (err) {
            session.send('Failed with message: %s', err.message);
            session.endDialog();
        });

        // continue on proper dialog
        var selection = result.response.entity;
        switch (selection) {
            case DialogLabels.Home:
                return session.beginDialog('home');
            case DialogLabels.Motor:
                return session.beginDialog('motor');
			case DialogLabels.Medical:
                return session.beginDialog('medical');
			case DialogLabels.Travel:
                return session.beginDialog('travel');
        }
    }
]);

bot.dialog('motor', require('./motor'));
bot.dialog('medical', require('./medical'));
bot.dialog('home', require('./home'));
bot.dialog('travel', require('./travel'))
.triggerAction({
        matches: [/help/i, /support/i, /problem/i]
    });

// log any bot errors into the console
bot.on('error', function (e) {
    console.log('And error ocurred', e);
});