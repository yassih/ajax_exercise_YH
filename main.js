$(document).ready(function(){

	//a function to clear results (clear ul list)
	function clearList(){
		var list = $('ul#mainList');
		list.text("");
	};
	//Getting All the Posts
	$('#button01').on('click',function(){
		var list = $('ul#mainList');
		clearList();
		$.ajax({
			url: 'http://jsonplaceholder.typicode.com/posts',
			method: 'GET'
		}).then(function(posts){
			posts.forEach(function(post){
				var li = $('<li></li>');
				li.text(post.title);
				list.append(li);
			});
			
		});
	});
	//Getting Posts with ID of 10
	$('#button02').on('click',function(){
		var list = $('ul#mainList');
		clearList();
		$.ajax({
			url: 'http://jsonplaceholder.typicode.com/posts/10',
			method: 'GET'
		}).then(function(post){
				var li = $('<li></li>');
				li.text(post.title);
				list.append(li);
		});
	});

	//A function to get comments of a specific post 
	function getPostComments(postId){
		var list = $('ul#mainList');
		clearList();
		$.ajax({
			//url: 'http://jsonplaceholder.typicode.com/posts/12/comments', OR
			url: 'http://jsonplaceholder.typicode.com/comments?postId=' +postId,
			method: 'GET'
		}).then(function(comments){
				var liButton = $('<li></li>');
				var backButton = $('<input type="button" value="Back to all posts">');
				list.append(backButton);
				backButton.on('click',function(){
					getPosts();
				});
				comments.forEach(function(comment){
					var li = $('<li></li>');
					li.text(comment.body);
					list.append(li);	
				});

		});
	}
	//Getting Comments of post with id of 12
	$('#button03').on('click',function(){
		var list = $('ul#mainList');
		clearList();
		$.ajax({
			//url: 'http://jsonplaceholder.typicode.com/posts/12/comments', OR
			url: 'http://jsonplaceholder.typicode.com/comments?postId=12',
			method: 'GET'
		}).then(function(comments){
				comments.forEach(function(comment){
					var li = $('<li></li>');
					li.text(comment.body);
					list.append(li);	
				})
		});
	});
	//Getting all the posts from user with id of 2
	$('#button04').on('click',function(){
		var list = $('ul#mainList');
		clearList();
		$.ajax({
			url: 'http://jsonplaceholder.typicode.com/posts?userId=2',
			method: 'GET'
		}).then(function(posts){
				posts.forEach(function(post){
					var li = $('<li></li>');
					li.text(post.title);
					list.append(li);	
				})
		});
	});
	//Create a new post and log the id generated for it by the server
	$('#button05').on('click',function(){
		var newPost = $('#text01').val();
		if(newPost === ""){
			alert('your post is empty');
		}
		else{
			console.log(newPost);
			var list = $('ul#mainList');
			clearList();
			$.ajax({
				url: 'http://jsonplaceholder.typicode.com/posts',
				method: 'POST',
				data : {d:newPost}
			}).then(function(post){
			console.log(post.id);	
			});
			$('#text01').val("");
		}
	});
	//Replace the post with id of 12 and render the responseJSON
	// $('#button06').on('click',function(){

	// });
	//Function to get all posts
	function getPosts(){

		var list = $('ul#mainList');
		clearList();
		$.ajax({
			url: 'http://jsonplaceholder.typicode.com/posts',
			method: 'GET'
		}).then(function(posts){
			posts.forEach(function(post){
				var li = $('<li></li>');
				
				var a = $('<a href="#"></a>');
				a.text(post.title);
				a.on('click',function(){
					getPostComments(post.id);
				})

				li.append(a);				
				list.append(li);
			});			
		});
	}
	//Display list of posts
	$('#button09').on('click',function(){
		getPosts();
		// var list = $('ul#mainList');
		// clearList();
		// $.ajax({
		// 	url: 'http://jsonplaceholder.typicode.com/posts',
		// 	method: 'GET'
		// }).then(function(posts){
		// 	posts.forEach(function(post){
		// 		var li = $('<li></li>');
				
		// 		var a = $('<a href="#"></a>');
		// 		a.text(post.title);
		// 		a.on('click',function(){
		// 			getPostComments(post.id);
		// 		})

		// 		li.append(a);				
		// 		list.append(li);
		// 	});			
		// });
	});
});
