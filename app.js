// replace this entire code block with the config found in the firebase dashboard
// for your created database... DONE!
var config = {
    apiKey: "AIzaSyBqeYBUMCP_3Jox_Bzb_ZXWuMstVqhTu6w",
    authDomain: "js58-demo.firebaseapp.com",
    databaseURL: "https://js58-demo.firebaseio.com",
    projectId: "js58-demo",
    storageBucket: "js58-demo.appspot.com",
    messagingSenderId: "1062124202424"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

$(function() {
	$('#add-button').on('click', function(){
		var value = $('#new-item').val();

		// grab a reference to the "todo-items" key in Firebase
		// and then create a new item that we set data on
		var item = database.ref('/todo-items').push();
		item.set( { value: value } )
	})

	// grab a reference to the "todo-items" key and ...
	database.ref('/todo-items').on('value', function(snapshot){
		var list = $('#list-items');
		list.empty();
		console.log(snapshot.val());

		snapshot.forEach(function(listItem){
			var item = listItem.val().value;
			list.append('<li data-id="' + listItem.key + '">' + item + ' <a href="#" class="remove">Remove</a></li>');
		})
	})

	$('#list-items').on('click', 'li a', function(){
		//retrieve thwe value of the 'data-id' attribute on the parent <li> element so we can remove it from Firebase
		var itemId = $(this).parent().data('id');
		database.ref("/todo-items/" + itemId).remove();
	})
})