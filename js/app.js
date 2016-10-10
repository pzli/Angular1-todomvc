(function (angular) {
	'use strict';

	angular.module('myApp',[])
		.controller("TodoController",["$scope", "$location", function ($scope, $location) {

			// input输入的值
			$scope.text = "";

			// 定义初始的todo
			$scope.todothings = [
				{
					id: 0.11,
					text: "数据结构",
					completed: false
				},{
					id: 0.22,
					text: "算法",
					completed: false
				},{
					id: 0.33,
					text: "计算机网络",
					completed: true
				}
			];

			// 添加add方法
			$scope.add = function () {
				if($scope.text){
					$scope.todothings.push({
						// 用随机数的形式来设置id,防止重复,在删除的时候会使用
						id: Math.random(),
						text: $scope.text,
						completed: false
					});

					// 每次添加完后删除文本框中的值
					$scope.text = "";
				}
			};

			// 单击删除键删除单个项
			$scope.delete = function (id) {
				for (var i = 0; i < $scope.todothings.length; i++) {
					if ($scope.todothings[i].id === id) {
						$scope.todothings.splice(i,1);
						break;
					}
				}

			};

			// 双击编辑某项
			// 记录当前正在编辑的id
			$scope.currentEditingId = -1;
			$scope.edit = function (id) {

				for (var i = 0; i < $scope.todothings.length; i++) {
					if ($scope.todothings[i].id == id && !$scope.todothings[i].completed ) {
						$scope.currentEditingId = id;
					}
				}
			};
			$scope.save = function () {
				$scope.currentEditingId = -1;
			};

			// 全选和全不选
			var flag = true;
			$scope.toggleAll = function () {
				for (var i = 0; i < $scope.todothings.length; i++) {
						$scope.todothings[i].completed = flag;
				}
				flag = !flag;
			};

			// 清空所有的已完成的项
			$scope.clearAll = function () {
				var arr = [];

				for (var i = 0; i < $scope.todothings.length; i++) {
					if (!$scope.todothings[i].completed) {
						arr.push($scope.todothings[i]);
					}
				}

				$scope.todothings = arr;
			};


			// 判断是否存在完成项,有的话显示Clear completed选项
			$scope.exist = function () {
				for(var i=0; i<$scope.todothings.length; i++) {
					if($scope.todothings[i].completed) {
						return true;
					}
				}
				return false;
			};

			// 要实现all active completed栏的切换,可以通过锚点的切换实现,实现一个SPA程序,要用到$watch监听$location的变化
			// 而$watch只能监听$scope的属性的变化,所以要重新赋值给$scope
			$scope.$location = $location;
			$scope.selector = {};
			$scope.$watch("$location.path()",function (now, old) {

				// 此时的now有三种情况对应all active completed
				// /
				// /active
				// /completed

				switch (now) {
					case "/active":
						$scope.selector = {completed:false};
						break;
					case "/completed":
						$scope.selector = {completed:true};
						break;
					default:
						$scope.selector = {};
				}
			});
		}]);

})(angular);
