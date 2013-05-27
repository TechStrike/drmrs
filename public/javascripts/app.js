(function($) {

  //get daca State data on load
  $.getJSON("/data/states.json")
   .done( function( data ) {
    useStateData(data);
  
  });

  //function that does something with the daca state data
  function useStateData(data) {
    //console.log(data);

    $.each( data.states, function( s, state ) {
      var prettyState = s.replace(/_/g," ");

      $( "<li>" )
      .html('For: <b>' + prettyState + '</b>, Accepted: ' + state.accepted + ' Approved: ' + state.approved)
      .attr( "data-state", s)
      .appendTo( "#states" );
    });

  }

  //get daca State data on load
  $.getJSON("/data/daca.json")
   .done( function( data ) {
    //console.log(data);
    //useDacaData(data);
  
  });
 

})(jQuery);