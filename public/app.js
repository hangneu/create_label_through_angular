(function(){
	angular
		.module("TodoApp",["MgDirectives"])
		.controller("TodosController",con);
		function con($http){
			var vm =this;
			vm.reorderTodos = reorderTodos;

			function reorderTodos(start,end){
				console.log("TodosController");
				console.log(start);
				console.log(end);
				$http.put("/api/todos?start="+start+"&&end="+end)
					.then(init());
			}
			function init(){
				$http.get("/api/todos")
				.then(function(response){
					vm.data = response.data;
				});
			}
			init();
			
		}
})();