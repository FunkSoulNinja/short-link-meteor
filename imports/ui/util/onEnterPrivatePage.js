export default function(history) {
    if (!Meteor.userId()) {
        history.replace('/');
    }
}
