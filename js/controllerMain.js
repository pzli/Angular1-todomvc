/**
 * Created by Administrator on 2016/10/11.
 */

(function (angular) {
	"use strict";

	angular.module("app.controllerMain",["app.serviceMain"])
		.controller("TodoController",["$scope", "$location","TodoService", function ($scope, $location,TodoService) {

		// input输入的值
		$scope.text = "";

		// 定义初始的todo
		$scope.todothings = TodoService.getArr();

		// 添加add方法
		$scope.add = function () {
			if($scope.text){
				TodoService.add($scope.text);
				// 每次添加完后删除文本框中的值
			}
			$scope.text = "";
		};

		// 单击删除键删除单个项
		$scope.delete = function (id) {
			TodoService.delete(id);
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
		$scope.toggleAll = function () {
			TodoService.toggleAll();
		};

		$scope.toggle = function () {
			TodoService.save();
		};

		// 清空所有的已完成的项
		$scope.clearAll = function () {
			var result = TodoService.clearAll();
			$scope.todothings = result;
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
