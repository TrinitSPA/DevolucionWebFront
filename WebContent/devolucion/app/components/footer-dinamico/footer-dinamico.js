angular.module('footerDinamicoModule')
    .controller('footerDinamicoCtrl',
        ['$scope',
            '$http',
            '$state',
            'loginService',
            '$location',
            function ($scope, $http, $state, loginService, $location) {
                var vm = this;
                vm.loading = true;

                vm.init = function () {
                    console.log("Carga footer");
                    vm.loading = false;
                    
                }

            }]);