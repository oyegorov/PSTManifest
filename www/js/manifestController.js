angular.module('starter')
    .controller('ManifestController', function ($scope, $ionicLoading, manifestService) {
        $scope.getTimeDifferenceInfo = function(date) {
            if ($scope.requestedOn == null)
                return 0;

            var date1_ms = Date.parse($scope.requestedOn);
            var date2_ms = Date.parse(date);

            var difference_ms = Math.abs(date2_ms - date1_ms);
            var past = date2_ms - date1_ms < 0;

            difference_ms = difference_ms / 1000;
            difference_ms = difference_ms / 60;
            var minutes = Math.floor(difference_ms) % 60;
            difference_ms = difference_ms / 60;
            var hours = Math.floor(difference_ms) % 24;

            if (minutes == 0 && hours == 0) {
                return {
                    text: 'Now',
                    past: false
                }
            };
            if (hours > 24) {
                return {
                    text: 'Not today',
                    past: true
                }
            };

            var text = !past ? '' : '-';
            if (hours != 0)
                text += hours + ' hours ';
            if (minutes != 0)
                text += minutes + ' mins ';
            
            return {
                text: text,
                past: past
            };
        }

        $scope.refresh = function () {
            $scope.requestedOn = new Date();

            $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner></ion-spinner>'
            });

            manifestService.getManifest().then(function(manifest) {
                $scope.manifest = manifest;
                $ionicLoading.hide();
            });
        }

        $scope.refresh();
    });