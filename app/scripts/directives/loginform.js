'use strict';

angular.module('v2App')
  .directive('loginForm', ['Auth', '$rootScope', function (Auth, $rootScope) {
    return {
      template: '<div overlay="myOverlay"'+
        '<form class="form-signin" role="form">'+
          '<h2 class="form-signin-heading">交管平台客户端</h2>'+
          '<input type="text" class="form-control" placeholder="用户名" ng-model="username" ng-disabled="logining" required autofocus>'+
          '<input type="password" class="form-control" placeholder="密码" ng-model="password" ng-disabled="logining" required>'+
          '<div type="alert alert-danger" style="color:red;", ng-show="errorMsg">{{errorMsg}}</div>'+
          '<label class="checkbox">'+
            '<input type="checkbox" value="remember-me"> 记住我'+
          '</label>'+
          '<button class="btn btn-lg btn-primary btn-block" type="submit" ng-click="login()" ng-disabled="logining">{{buttonText}}</button>'+
          // '<button class="btn btn-xs btn-link"><i class="fa fa-cogs"></i></button>'+
        '</form>'+
      '</div>',
      restrict: 'EA',
      link: function postLink(scope) {
        scope.buttonText = '登录';

        //系统登录成功时,关闭登录框
        $rootScope.$on('atms:login:success', function (){
          scope.errorMsg = '';
          $rootScope.toggle('myOverlay', 'off');
          scope.logining = false;
          scope.buttonText = '登录';
        });

        //系统登录失败时,登录框增加提示
        $rootScope.$on('atms:login:error', function (evt, data){
          scope.errorMsg = data;
          scope.logining = false;
          scope.buttonText = '登录';
        });

        //登录系统
        scope.login = function (){
          Auth.login(scope.username, scope.password);
          scope.logining = true;
          scope.buttonText = '登录中...';
        };

        $rootScope.$broadcast('loginForm:init');
      }
    };
  }]);
