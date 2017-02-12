  $(document).ready(function() {

    $( ".header" ).load( "navbar.html", function() {
		//events for bootstrap
	});

    //for every paragrap highlight
    $('.paragraph').on('click', function(event) {
    	console.log('click');
    	//remove previous selection
    	$('.paragraph').css({'background-color': 'white', 'text-decoration': 'none'});
    	//highlight current selection
    	$(this).css({'background-color': 'yellow', 'text-decoration': 'underline'});

    	//dialog appears with extra comments and textbox
    	$('#myModal').modal('show');

    });

    $('html').on('click', function(event) {
		//remove previous selections    	
    	if ( !$(event.target).hasClass('paragraph')) {
        	$('.paragraph').css({'background-color': 'white', 'text-decoration': 'none'});
    	}
    	
    });
  });