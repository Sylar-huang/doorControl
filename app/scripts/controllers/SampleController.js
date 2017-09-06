/**
 * Created by sylarhuang on 2017/8/12.
 */
module.exports = function(ngModule) {
    ngModule.controller('SomeController', function ($scope, MyData) {
        // $scope.MyData = MyData;
        $scope.doorStatus = MyData;
        $scope.answerCall = function () {
            // $scope.MyData.get('test!');
            // console.log($scope.doorStatus.signal)
            console.log($scope.doorStatus.collection)
            $scope.doorStatus.get('answerCall');

        }
        $scope.refuseCall = function () {
            $scope.doorStatus.get('refuseCall')
        }
        $scope.openDoor = function () {
            $scope.doorStatus.get('openDoor')

        }
    });
}