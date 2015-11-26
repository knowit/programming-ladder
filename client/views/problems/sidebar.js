var tickingDate = new Date();

minuteTick = new Tracker.Dependency;

Meteor.setInterval(function () {
    setTickingDate(new Date());
}, 60000);

var getTickingDate = function() {
    minuteTick.depend();
    return tickingDate;
};

var setTickingDate = function() {
    tickingDate = new Date();
    minuteTick.changed();
}

Template.sidebar.helpers({
    selected: function() {
        if (Session.equals('selectedProblemId', this._id)) {
            return 'active';
        } else {
            return '';
        }
    },
    problems: function() {
        return Problems.find({}, {sort: {activeFrom : 1}});
    },
    active: function() {
        return this.activeFrom < getTickingDate();
    }
});