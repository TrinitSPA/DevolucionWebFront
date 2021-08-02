angular.module('dashboardModule')
    .controller('dashboardCtrl',
        ['$scope', '$http', '$state', 'dashboardService', 'loginService', '$location', function ($scope, $http, $state, dashboardService, loginService, $location) {
            var vm = this;
			vm.tituloPerfil = loginService.perfil;
            
        }]);