var builder = require('botbuilder');

module.exports = [
    // type
    function (session) {
        session.send('Hi '+session.userData.name+', Thanks for choosing Medical Insurance!');
        builder.Prompts.choice(session, 'Please choose Insurance Type?', ['Primary', 'Dependent']);
    },
    function (session, results, next) {
        session.dialogData.type = results.response.entity;
        next();
    },

    // Age
    function (session) {
        builder.Prompts.number(session, 'Enter your age?');
    },
    function (session, results, next) {
        session.dialogData.age = results.response;
        next();
    },

    // Search...
    function (session) {
        var name = session.userData.name;
        var type = session.dialogData.type;
        var age = session.dialogData.age;

        session.send(
            'Ok %s. Thanks for choosing Medical Insurance for insurance type %s...',
            name,
            type,
            age); 				
    }
];