(function(){
	angular
		.module("MgDirectives",[])
		.directive("todos",todos);

		function todos(){
			function linker(scope,element,attributes){
				var data = scope.data;
				var myScope = scope;
				var startIndex = -1;
				var endIndex = -1;
				$(element)
						.find("tbody")
						.sortable({
							axis:'y',
							start:function(event,ui){
								startIndex = ui.item.index();
							},
							stop: function(event,ui){
								endIndex = ui.item.index();
								// console.log(scope);
								myScope.callback({start: startIndex ,end:endIndex});
								var reorderedElement = myScope.data.splice(startIndex,1)[0];
								myScope.data.splice(endIndex,0,reorderedElement);								
								myScope.$apply();
								console.log(reorderedElement);
							}
						});
			}
			return {
				templateUrl:"todos.html",
				scope:{
					data:"=data",
					callback:"&"
				},
				link: linker
			};
		}

})();