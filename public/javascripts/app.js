// Embers App code - KISS
(function () {

	DACA = Ember.Application.create();

	DACA.State = Ember.Object.extend({
		loaded: false,

		names: null,
	  accepted: null,
	  approved: null,

	  fullStateName: function() {
	    return this.get('names').replace(/_/g," ");
	  }.property('names'),

	});

	DACA.IndexRoute = Ember.Route.extend({
		//get main

		//get States DACA (TODO: handle errors)
	  model: function() {
	  	
	    return $.getJSON("/data/states.json").then(function ( response ) {
	    	var rows = [];

				$.each(response.states, function(i, item) {
          rows.push(DACA.State.create({
          	names: i,
          	accepted: item.accepted,
         		approved: item.approved 
          }));
        });

        return rows;
      });
	  }

	});


})();