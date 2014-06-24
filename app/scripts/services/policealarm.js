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
      var onData = function (record){
        console.log(record);
        // record.time = $filter('date')(record.time, 'yyyy-MM-dd HH:mm:ss');
        
        if(alarmList.length === 10){
          alarmList.pop();
        }
        alarmList.unshift(record);

        deferred.notify(record);

        //播发音频
        /*console.log('播发音频',document.getElementById('audio'));
        document.getElementById('audio').play();*/
      };

      this.getData = function (){
        return alarmList;
      };

      var subscribe = function (info){
        var dept = info.user.dept, deptNo = null;
        
        if(dept.deptCode !== '320300000000'){
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
        });
      };

      this.listen = function (){
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

        return deferred.promise;
      };

      //模拟数据
      /*var i = 1;
      setInterval(function(){
        onData({
          serNo: i,
          name:'警情' + i,
          time: new Date()
        });
        i++;
      }, 8000);*/

    };

    return new Klass();
  }]);
