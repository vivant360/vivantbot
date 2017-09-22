var builder = require('botbuilder');

module.exports = [
    // Residence
    function (session) {
        session.send('Hi '+session.userData.name+', Thanks for choosing Home Insurance!');
        builder.Prompts.choice(session, 'What is your Residence Type?', ['Villa', 'Apartment']);
    },
    function (session, results, next) {
        session.dialogData.residence = results.response.entity;
        next();
    },

    // Building Value
    function (session) {
        builder.Prompts.number(session, 'What is your Building Value?');
    },
    function (session, results, next) {
        session.dialogData.building = results.response;
        next();
    },

    // Search...
    function (session) {
        var name = session.userData.name;
        var residence = session.dialogData.residence;
        var building = session.dialogData.building;

        session.send(
            'Ok %s. Thanks for choosing Home Insurance for residence type %s...',
            name,
            residence,
            building); 				
    }
];