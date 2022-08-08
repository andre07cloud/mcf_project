var pow = require('pow-mongodb-fixtures');
var fixtures = pow.connect('book_phone');
var id = pow.createObjectId;

fixtures.load({
    users:[
        {
            "_id" : id(),
            "name" : "andrew",
            "lastname" : "zocko",
            "job" : "IA engineer"
        },
        {
            "_id" : id(),
            "name" : "andrecito",
            "lastname" : "zockora",
            "job" : "MAchine Learning PHD"
        },
        {
            "_id" : id(),
            "name" : "andre",
            "lastname" : "zock",
            "job" : "IA PHD"
        },
        {
            "_id" : id(),
            "name" : "andrez",
            "lastname" : "zock",
            "job" : "Deep Learning PHD"
        },
    ]
});