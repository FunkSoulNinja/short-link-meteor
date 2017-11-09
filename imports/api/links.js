import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
    Meteor.publish('links', function() {
        return Links.find({ userId: this.userId });
    });
}

Meteor.methods({
    'links.insert'(url) {
        if (!this.userId) {
            throw new Meteor.Error('not authorized');
        }

        new SimpleSchema({
            url: {
                type: String,
                label: 'link',
                regEx: SimpleSchema.RegEx.Url
            }
        }).validate({ url });

        Links.insert({
            _id: shortid.generate(),
            url,
            userId: this.userId,
            visible: true,
            visitedCount: 0,
            lastVisitedAt: null
        });
    },
    'links.setVisibility'(_id, toValue) {
        if (!this.userId) {
            throw new Meteor.Error('not authorized');
        }

        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            },
            toValue: {
                type: Boolean
            }
        }).validate({ _id, toValue });

        Links.update(_id, { $set: { visible: toValue } });
    },
    'links.trackVisit'(_id) {
        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            }
        }).validate({ _id });

        Links.update(_id, {
            $set: { lastVisitedAt: new Date().getTime() },
            $inc: { visitedCount: 1 }
        });
    }
});
