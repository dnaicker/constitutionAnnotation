$(document).ready(function() 
{
	var article = {};
	var directories = {};
	var self = this;

	$.get('php/get_directories.php', function(result) {
		directories = jQuery.parseJSON("[" + result.substring(0, result.length-1) + "]" );

		//-----------------
		//Load Navbar
		$( ".header" ).load( "navbar.html", function() {
			var navbar_links = [];

			//build navbar directory structure
			$.	each(directories, function(index, item) {
				var dir = item.directory;

				navbar_links.push('<li>');
				navbar_links.push('<a href="' + dir + '">');
				navbar_links.push(dir.substring(dir.indexOf('/')+1, dir.indexOf('.html')));
				navbar_links.push('</a>');
				navbar_links.push('</li>');
			});

			//replace navbar_categories
			$('.navbar_categories').html(navbar_links.join(''));

			//-----------------
			//Load Navbar
			//load first file in directory
			$( ".content" ).load(directories[0].directory, function() {

				//Show Dialog on Paragrap Click
				$('.akn-section').on('click', function(event) {
					user_comments = [];
					article = [];
					self.section_id = $(this).attr('id');

					//-----------------
					$.get('php/get_comments.php', function(result) {
						article = jQuery.parseJSON(result);
						user_comments = [];

						


						//display comments
						$.each(article, function(key, value) {
							if(key == 'comments')
							{
								comments_json = jQuery.parseJSON(value);
								
								$.each(comments_json, function(key, val) 
								{
									//only show if section is relevant
									if(val.section)
									{								
										if(self.section_id == val.section)
										{
											user_comments.push("<p>" + val.comment + "</p>" + "<span class='comment'><b>User</b>: " + val.user + ", <b>Date</b>: " + val.date +  "</span><br />");
										}
									}

								});
							}
						});

						
						var build_dialog_dynamically = [];
						build_dialog_dynamically.push('<div id="myModal" class="modal" role="dialog" tabindex="-1">');
						build_dialog_dynamically.push('<div class="modal-dialog modal-lg">');
						build_dialog_dynamically.push('<div class="modal-content modalheader">');
						build_dialog_dynamically.push('<div class="modal-header" style="border: none">');
						build_dialog_dynamically.push('<button type="button" class="close" data-dismiss="modal">&times;</button>');
						build_dialog_dynamically.push('<h3 class="modal-title" style="color: #3E606F">Additional Information</h3>');
						build_dialog_dynamically.push('</div>');
						build_dialog_dynamically.push('<div class="modal-body user_content_modal_body" style="max-height:250px; overflow-y: auto">');
						//comment display
						build_dialog_dynamically.push('<p>');
						build_dialog_dynamically.push(user_comments.join(''));
						build_dialog_dynamically.push('</p>');
						build_dialog_dynamically.push('</div>');
						build_dialog_dynamically.push('<div class="modal-footer" style="border: none">');
						build_dialog_dynamically.push('<h3 class="pull-left" style="color: #3E606F">Comment</h3>');
						//comment input
						build_dialog_dynamically.push('<textarea class="form-control comment_input" rows="5" id="comment" style="resize: none;   "></textarea>');
						build_dialog_dynamically.push('<br/>');
						build_dialog_dynamically.push('<button type="button" class="btn btn-default" data-dismiss="modal"><span class="fa fa-paperclip"></span> Attachment</button>');
						build_dialog_dynamically.push('<button data-dismiss="modal" class="btn btn-default"><span class="fa fa-times"></span> Cancel</button>');
						//comment insert
						build_dialog_dynamically.push('<button type="button" class="btn btn-success insert_comment" data-dismiss="modal"><span class="fa fa-check"></span> Save</button>');
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

						//save comments
						$('.insert_comment').on('click', function() {
							var _comments = JSON.parse(article["comments"]);

							_comments.push(
								{
									"user": "Denver", //session variable
									"date": "19-02-2017",
									"comment": $('.comment_input').val().replace(/(\r\n|\n|\r)/gm,""),
									"section": self.section_id
								}
							);

							article["comments"] = JSON.stringify(_comments);

							// console.log(art	icle["comments"]);

							//Send comment to db
							$.post(
								'php/save_comments.php', 
								JSON.stringify(article),
								function(result) {
									console.log(result);
								}
							);
						})
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
			});
		});
	});


 });