'use strict';

(function(window, $) {

	$(document).ready(function() {

    // your application JS goes here
	    $.getJSON( "./json/summary.json", function( data ) {
	    	$.each( data, function( key, val ) {
	    		$("." + key).text(val);
	    	});
	    });

	});
	
})(this, jQuery);