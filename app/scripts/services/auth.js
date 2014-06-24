'use strict';

angular.module('v2App')
  .service('Auth', ['$rootScope', '$http', 'localStorageService', function Auth($rootScope, $http, localStorageService) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var Klass = function (){
      var self = this;
      //获取本地存储中的登录信息
      var userInfo = localStorageService.get('userInfo');

      //如果没有登录信息
      if(!userInfo){
        //监听登录框初始化完毕
        var un = $rootScope.$on('loginForm:init', function (){
          //弹出登录框
          $rootScope.toggle('myOverlay', 'on');
          //解除事件监听
          un();
        });
      }

      //监听登出命令(事件)
      $rootScope.$on('atms:logout', function (){
        self.logout();
      });

      this.login = function (name, password){
        return $http.post('http://172.16.65.181:8081/ATMS_WEB/login', {
          password: password,
          userCode: name
        }).success(function (data){
          if(data.success){
            var info = data.results;
            //保存用户登录信息
            localStorageService.set('userInfo', info);
            $rootScope.$broadcast('atms:login:success', info);
          }else{
            $rootScope.$broadcast('atms:login:error', '登录失败!');
          }
        }).error(function(){
          $rootScope.$broadcast('atms:login:error', '认证服务连接失败!');
        });
      };

      this.logout = function (){
        return $http.post('http://172.16.65.181:8081/ATMS_WEB/logout').success(function(){
         
        }).error(function(){
          
        }).finally(whenLogout);
      };

      var whenLogout = function (){
        //发送登出成功事件
        $rootScope.$broadcast('atms:logout:success');
        //清除用户登录信息
        localStorageService.remove('userInfo');
        //弹出登录框
        // $rootScope.toggle('myOverlay', 'on');
        window.location.reload();
      };

      socket.on('disconnect', whenLogout);

    };

    return new Klass();
  }]);
