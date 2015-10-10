
HackABomb.Games = new Mongo.Collection('games');
HackABomb.BombVectors = new Mongo.Collection('bombvectors');

HackABomb.Games.Schema = new SimpleSchema({

});

var VectorSchema = new SimpleSchema({
    x: {
        type: Number
    },
    y: {
        type: Number
    }
});

HackABomb.BombVectors.Schema = new SimpleSchema({
    game_id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    position: {
        type: VectorSchema
    },
    motion: {
        type: VectorSchema
    }
});

HackABomb.BombVectors.attachSchema(HackABomb.BombVectors.Schema);
