angular.module('disenoConfigModule')
    .controller('disenoConfigCtrl',
        ['$scope', '$http', '$state', '$location', function ($scope, $http, $state, $location) {
            var vm = this;
            var host = $location.protocol() + '://' + $location.host() + ':' + $location.port();
            vm.colorPickerOptions = {
                format: 'hex'
            }
            vm.formData = {
                color: '134085'
            };
            vm.errors = {};

            vm.guardar = () => {
                console.log(vm.formData.color)
            }
            


        }]);