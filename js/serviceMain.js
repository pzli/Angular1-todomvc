/**
 * Created by Administrator on 2016/10/11.
 */

// 存储业务逻辑
(function (angular) {
	"use strict";
	angular.module("app.serviceMain",[])
		.service("TodoService",["$window",function ($window) {

			// 数据本地化存储
			var storage = $window.localStorage;
			var todothings = storage['todothings'] ? JSON.parse(storage['todothings']) : [];

			// 将这里的数组与controller里的数组联系起来
			this.getArr = function() {
				return todothings;
			};
			// 实现数据本地化存储,添加一个save函数
			this.save = function() {
				storage['todothings'] = JSON.stringify(todothings);
			};
			// 添加add方法
			this.add = function (text) {
				todothings.push({
					// 用随机数的形式来设置id,防止重复,在删除的时候会使用
					id: Math.random(),
					text: text,
					completed: false
				});

				this.save();
			};

			// 添加delete方法
			this.delete = function (id) {
				for (var i = 0; i < todothings.length; i++) {
					if (todothings[i].id === id) {
						todothings.splice(i,1);
						break;
					}
				}
				this.save();
			};

			// 全选和全不选
			var flag = true;
			this.toggleAll = function () {
				for (var i = 0; i < todothings.length; i++) {
					todothings[i].completed = flag;
				}
				flag = !flag;
				this.save();
			};


			// 清空所有的已完成的项
			this.clearAll = function () {
				var arr = [];
				for (var i = 0; i < todothings.length; i++) {
					if (!todothings[i].completed) {
						arr.push(todothings[i]);
					}
				}
				todothings = arr;
				this.save();
				return arr;
			};

		}]);

})(angular);
