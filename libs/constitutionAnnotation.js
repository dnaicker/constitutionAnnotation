$(document).ready(function() 
{
	var self = this;
	self.article = {};
	self.directories = {};
	self.navigate_to_directory = "";
	self.article_title = "";

	$.get('php/get_directories.php', function(result) {
		self.directories = jQuery.parseJSON("[" + result.substring(0, result.length-1) + "]" );
		//Load Navbar
		$( ".header" ).load( "navbar.html", function() {
			self.load_navbar();
		});
	});

	self.load_navbar = function load_navbar() {
		console.log('loading navbar');

		var navbar_links = [];

		//build navbar directory structure
		$.each(self.directories, function(index, item) {
			var dir = item.directory;
			var dir_name = dir.substring(dir.indexOf('/')+1, dir.indexOf('.html'));
			dir_name = dir_name.replace(/_/g, " ");
			navbar_links.push('<li>');
			navbar_links.push('<a href="#" class="navigate_to_doc" directory="'+ dir +'">');
			navbar_links.push(dir_name);
			navbar_links.push('</a>');
			navbar_links.push('</li>');
		});

		//replace navbar_categories
		$('.navbar_categories').html(navbar_links.join(''));

		//-----------------
		//Load Navbar
		//load first file in directory
		$('.navigate_to_doc').on('click', function() {
			self.navigate_to_directory = $(this).attr('directory');
			self.article_title = self.navigate_to_directory.substring(self.navigate_to_directory.indexOf('/')+1, self.navigate_to_directory.indexOf('.html'));
			$(".content").empty();
			$( ".content" ).load(self.navigate_to_directory, function() {
				core_events();
			})
		});

		//if session username not blank
		if(sessionStorage.getItem('username'))
		{
			set_session();
		}
		else
		{
			console.log('session not set');

			$('.login_menu').empty();

			var navbar_links2 = [];

			navbar_links2.push('<li id="register">');
			navbar_links2.push('<a href="#" >');
			navbar_links2.push('<span class="fa fa-pencil"></span> ');
			navbar_links2.push('Register');
			navbar_links2.push('</a>');
			navbar_links2.push('</li>');
			navbar_links2.push('<li id="login">');
			navbar_links2.push('<a href="#">');
			navbar_links2.push('<span class="fa fa-sign-out"></span>');
			navbar_links2.push('Login');
			navbar_links2.push('</a>');
			navbar_links2.push('</li>');
				
			$('.login_menu').html(navbar_links2.join(''));

			//-----------------
			$("#login").on('click', function() {
				//show dialog
				//return result decides whether to change navbar and set cache
				$('.content').load('html/login.html', function() {

					//invoke dialog
					$('#loginModal').modal('show');

					$('.login_btn').on('click', function() {
						var _username = $('#email_login').val();
						var _password = $('#password_login').val();

						$.post('php/login.php', JSON.stringify({ username: _username, password: _password }),function(results) {
							console.log(results);
							if(results == 'Welcome you are logged in')
							{
								$('.modal-body').empty();
								var result = [];
								result.push('<div class="alert alert-success">');
								result.push('<strong>Success!</strong> Welcome you are logged in.');
								result.push('</div>');
								$('.modal-body').html(result.join(''));
								
								//set local cache user varaibles
								sessionStorage.setItem('username', _username);
								
								set_session();

								setTimeout(function() { $('#loginModal').modal('hide'); }, 1000);
							}
							else
							{
								var result = [];
								result.push('<br/><div class="alert alert-danger">');
								result.push('<strong>Error: </strong> The user details you entered are incorrect.');
								result.push('</div>');
								$('.modal-body').append(result.join(''));
								setTimeout(function() { $('.alert-danger').remove(); }, 1000);
							}
						});
					});
				});
			});

			//-----------------
			$("#register").on('click', function() {
				//display dialog
				$('.content').load('html/registration.html', function() {

					//invoke dialog
					$('#registerModal').modal('show');

					$('.register_btn').on('click', function() {
						var _username = $('#email_login').val();
						var _password = $('#password_login').val();

						$.post('php/registration.php', JSON.stringify({ username: _username, password: _password }),function(results) {
							console.log(results);
							if(results == 'You are now registered')
							{
								$('.modal-body').empty();
								var result = [];
								result.push('<div class="alert alert-success">');
								result.push('<strong>Success!</strong> Welcome you can now login.');
								result.push('</div>');
								$('.modal-body').html(result.join(''));
								setTimeout(function() { $('#registerModal').modal('hide'); }, 1000);
							}
							else
							{
								var result = [];
								result.push('<div class="alert alert-danger">');
								result.push('<strong>Error: </strong> The user could not be found.');
								result.push('</div>');
								$('.modal-body').html(result.join(''));
								setTimeout(function() { $('.alert-danger').remove(); }, 1000);
							}
						});	
					});
				});
			});
		}
	};

	function set_session() {
		//create new navbar with logout
		$('.login_menu').empty();
		var new_navbar = [];
		new_navbar.push('<li id="logout">');
		new_navbar.push('<a href="#" >');
		new_navbar.push('<span class="fa fa-sign-out"></span> ');
		new_navbar.push('Logout');
		new_navbar.push('</a>');
		new_navbar.push('</li>');

		$('.login_menu').html(new_navbar.join(''));

		$('#logout').on('click', function() {
			sessionStorage.removeItem('username');
			sessionStorage.clear();
			self.load_navbar();
		});
	};

	function core_events() {
		//Show Dialog on Paragrap Click
		$('.akn-section').on('click', function(event) {
			user_comments = [];
			self.article = [];
			self.section_id = $(this).attr('id');

			//-----------------
			//TODO: send through params
			var temp = { title : self.article_title };

			$.post('php/get_comments.php', JSON.stringify(temp), function(result) {
				self.article = jQuery.parseJSON(result);
				user_comments = [];

				//display comments
				$.each(self.article, function(key, value) {
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
									user_comments.push("<p>" + val.comment + "<br/><div class='comment'>" + val.date + "<span style='padding-right: 5px;'></span> " + val.user +  "</div></p>");
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
				build_dialog_dynamically.push('<h3 class="modal-title" style="color: #3E606F">Information</h3>');
				build_dialog_dynamically.push('</div>');
				build_dialog_dynamically.push('<div class="modal-body user_content_modal_body" style="max-height:190px; overflow-y: auto; word-wrap: break-word;">');
				//comment display
				build_dialog_dynamically.push(user_comments.join(''));
				build_dialog_dynamically.push('</div>');
				build_dialog_dynamically.push('<div class="modal-footer" style="border: none">');
				build_dialog_dynamically.push('<h3 class="pull-left" style="color: #3E606F">Comment</h3>');
				//comment input
				build_dialog_dynamically.push('<textarea class="form-control comment_input" rows="3" id="comment" style="resize: none;"></textarea>');
				build_dialog_dynamically.push('<br/>');
				build_dialog_dynamically.push('<button type="button" class="btn btn-default" data-dismiss="modal"><span class="fa fa-paperclip"></span> </button>');
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

				if(!sessionStorage.getItem('username')) 
					$('.comment_input').attr("disabled",true);		
				else
					$('.comment_input').attr("disabled",false);		


				//disable input
				if(sessionStorage.getItem('username')) 
				{
					//save comments
					$('.insert_comment').on('click', function() {				
						var _comments = JSON.parse(self.article["comments"]);

						//what happens if a comment is not saved?
						//should i have a local log?
						var date_time = new Date().toLocaleDateString("nl",{year:"2-digit", month:"2-digit", day:"2-digit", hour: "2-digit", minute: "2-digit"});
							var comment_txt = $('.comment_input').val().replace(/(\r\n|\n|\r)/gm,"");
						comment_txt = comment_txt.replace(/[^a-zA-Z0-9 ]/g, "");

						_comments.push(
							{
								"user": sessionStorage.getItem('username'), //session variable
								"date": date_time,
								"comment": comment_txt,
								"section": self.section_id
							}
						);

						self.article["comments"] = JSON.stringify(_comments);

						// console.log(art	icle["comments"]);

						//Send comment to db
						$.post(
							'php/save_comments.php', 
							JSON.stringify(self.article),
							function(result) {
								console.log(result);
							}
						);
					});
				}
			});
		});
	};
});