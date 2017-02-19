$(document).ready(function() 
{
	var article = {};

	//-----------------
	//Load Navbar
	$( ".header" ).load( "navbar.html", function() {
		//events for bootstrap
	});

	//-----------------
	//Load Navbar
	$( ".content" ).load( "docs/City_of_Cape_Town_Water_By_law_2010.html", function() {

		//Show Dialog on Paragrap Click
		$('.akn-section').on('click', function(event) {
			user_comments = [];

			//-----------------
			$.get('php/get_comments.php', function(result) {
				json_arr = jQuery.parseJSON(result);

				$.each(json_arr, function(key, value) {
					//DIALOG: Add comments to html
					$('.comments_display').html(value.comment);
					user_comments.push(value.comment);
				})

				var build_dialog_dynamically = [];
				build_dialog_dynamically.push('<div id="myModal" class="modal" role="dialog" tabindex="-1">');
				build_dialog_dynamically.push('<div class="modal-dialog modal-lg">');
				build_dialog_dynamically.push('<div class="modal-content modalheader">');
				build_dialog_dynamically.push('<div class="modal-header" style="border: none">');
				build_dialog_dynamically.push('<button type="button" class="close" data-dismiss="modal">&times;</button>');
				build_dialog_dynamically.push('<h3 class="modal-title" style="color: #3E606F">Additional Information</h3>');
				build_dialog_dynamically.push('</div>');
				build_dialog_dynamically.push('<div class="modal-body user_content_modal_body" style="max-height:250px; overflow-y: auto">');
				build_dialog_dynamically.push('<p>');
				build_dialog_dynamically.push(user_comments.join(''));
				build_dialog_dynamically.push('</p>');
				build_dialog_dynamically.push('</div>');
				build_dialog_dynamically.push('<div class="modal-footer" style="border: none">');
				build_dialog_dynamically.push('<h3 class="pull-left" style="color: #3E606F">Comment</h3>');
				build_dialog_dynamically.push('<textarea class="form-control" rows="5" id="comment" style="resize: none;   "></textarea>');
				build_dialog_dynamically.push('<br/>');
				build_dialog_dynamically.push('<button type="button" class="btn btn-default" data-dismiss="modal"><span class="fa fa-paperclip"></span> Attachment</button>');
				build_dialog_dynamically.push('<button data-dismiss="modal" class="btn btn-default"><span class="fa fa-times"></span> Cancel</button>');
				build_dialog_dynamically.push('<button type="button" class="btn btn-success" data-dismiss="modal"><span class="fa fa-check"></span> Save</button>');
				build_dialog_dynamically.push('</div>');
				build_dialog_dynamically.push('</div>');
				build_dialog_dynamically.push('</div>');
				build_dialog_dynamically.push('</div>');

				//DIALOG: Append Dialog to HTML
				$('.div_for_dialog').html(build_dialog_dynamically.join(''));

				//DIALOG: Invoke show event trigger
				$('#myModal').modal('show');

				//COMMENT: Remove previous
				$('comment').val('');

				//COMMENT: Retrieve New
				$('comment').val('');

				//USER STORIES: Remove previous
				$('user_content_modal_body').val('');

				//USER STORIES: Add new Content
				$('user_content_modal_body').append();
			});
		});

		//-----------------
		//Remove Style of Paragraph
		$('html').on('click', function(event) {
			if ( !$(event.target).hasClass('paragraph')) 
			{
				$('.akn-section').css({'background-color': 'white', 'text-decoration': 'none'});
			}
		});

		//-----------------
		//Send comment to database
		$('.btn_comment_save').on('click', function() {
			//LOGIC: Get user comments
			$.ajax('php/save_article.php', { comments: $('.comment_box').val(), article: article.name }, function(result) {
				//DIALOG: Close
				//DIALOG: Indicate Comment Saved
				console.log(result);
			});
		});

	});


 });