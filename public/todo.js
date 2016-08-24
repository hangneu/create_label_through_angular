module.exports = function (app){
	var mongoose = require("mongoose");
	mongoose.connect("mongodb://localhost/cs5610summer");
	var TodoSchema = mongoose.Schema({
		priority: Number,
		title:String,
		todo:String
	});
	var Todo = mongoose.model("Todo",TodoSchema);

	app.get("/api/todos",findAllTodos);
	app.put("/api/todos",reorderTodos);

	function reorderTodos(req,res){
		var start = parseInt(req.query.start);
		var end = parseInt(req.query.end);
		console.log(end);
		console.log(start);
		console.log([start,end]);

		Todo.find(function(err,todos){
			todos.forEach(function(todo){
				// console.log(todo);
				if(start>end){
					if(todo.priority >= end && todo.priority< start){
						todo.priority++;
						todo.save(function(){});
					}
					else if(todo.prioruty ===start ){
						todo.proority = end;
						todo.save(function(){});
					}
				}else{
					if(todo.priority === start){
						todo.priority =end;
						todo.save(function(){});
					}else if (todo.priority > start && todo.priority <= end){
						todo.priority--;
						todo.save(function(){});
					}
				}
			});
			res.send(200);

		});


	}

	function findAllTodos(req,res){
		Todo
			.find()
			.then(function(todos){
				res.json(todos);
			});
	}


	// Todo.create({"priority":1,"title":"CS5610","todo":"Teach Angular Directives"});
	// Todo.create({"priority":2,"title":"CS5200","todo":"teach database idea"});
	// Todo.create({"priority":3,"title":"CS6200","todo":"how to search information from the website"});
	// Todo.create({"priority":4,"title":"CS6220","todo":"data mining"})
	// Todo.create({"priority":5,"title":"EECE5682","todo":"Power System Analysis"});
	// Todo.create({"priority":6,"title":"EECE5644","todo":"Machine learning"});
	// Todo.create({"priority":7,"title":"EECE5698","todo":"Robotics Sensing and Navigation"});
	// Todo.create({"priority":8,"title":"EECE6000","todo":"coop word experience"});
	// Todo.create({"priority":9,"title":"EECE7205","todo":"fundamentals of computer engineering"});

};