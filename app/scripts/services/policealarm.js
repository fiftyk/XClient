'use strict';

angular.module('v2App')
  .service('Policealarm', ['localStorageService', '$q', '$filter', '$rootScope', function Policealarm(localStorageService, $q, $filter, $rootScope) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var Klass = function(){
      console.log('init service:Policealarm');

      var deferred = $q.defer();

      //警情数据
      var alarmList = [];

      //接受警情推送数据
      var i = 0;
      var onData = function (record){
        i++;
        record.seq = i;
        console.log(i, record);
        
        if(alarmList.length === 10){
          alarmList.pop();
        }
        alarmList.unshift(record);

        deferred.notify(record);

        //播发音频
        console.log('播发音频',document.getElementById('audio'));
        document.getElementById('audio').play();

      };

      this.getData = function (){
        return alarmList;
      };

      var subscribe = function (info){
        var dept = info.user.dept, deptNo = null;
        
        if(dept.parentAreaDept.deptCode !== '320300000000'){
          deptNo = dept.parentAreaDept.deptCodeNew;
        }
        
        socket.emit('subscribe', {
          clientType:'policeAlarm',
          id: deptNo
        });

        if(!deptNo){
          socket.on('policeAlarmRealtime', onData);
        }else{
          socket.on('policeAlarmRealtime:' + deptNo.slice(0,10), onData);
        }

        $rootScope.$on('atms:logout:success', function (){
          socket.emit('unsubscribe', {
            clientType:'policeAlarm',
            id: deptNo
          });
          //退订后 重置状态
          listened = false;
        });
      };

      //记录是否已经调用 this.listen 方法
      var listened = false;

      this.listen = function (){

        //如果已经调用
        if(listened){
          return;
        }

        var userInfo = localStorageService.get('userInfo');
        //如果有登录信息
        if(userInfo){
          subscribe(userInfo);
        //如果没有有登录信息
        }else{
          //监听登录成功事件
          $rootScope.$on('atms:login:success', function (){
            subscribe(localStorageService.get('userInfo'));
          });
        }
        //标记已经调用了 this.listen 方法
        listened = true;
        return deferred.promise;
      };

    };

    return new Klass();
  }]);
