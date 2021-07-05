angular.module('reportesModule')
    .controller('reportesCtrl',
        ['$scope', '$http', '$state', '$location', function ($scope, $http, $state, $location) {
            var vm = this;
            var host = $location.protocol() + '://' + $location.host() + ':' + $location.port();

            vm.loading = true;

            vm.init = function () {
                setTimeout(() => {
                    vm.cargarReportes(vm.dataTest);
                }, 2000);
            }

            vm.cargarReportes = function (data) {

                vm.seriesResumen = ['Aprobados', 'Rechazados', 'Pendientes'];

                vm.labelsResumen = data.map((item) => {
                    return vm.getMonth(item.mes - 1)
                });

                vm.optionsResumen = { legend: { display: true } };
                vm.dataResumen = [
                    data.map((item) => {
                        return item.cantidadAprobado
                    }),
                    data.map((item) => {
                        return item.cantidadRechazado
                    }),
                    data.map((item) => {
                        return item.cantidadPendiente
                    }),
                ];

                vm.loading = false;
                $scope.$apply();
            }

            vm.dataTest = [
            {
                    "cantidadPendiente": 25,
                    "cantidadAprobado": 45,
                    "cantidadRechazado": 37,
                    "mes": 1
                },
                {
                    "cantidadPendiente": 34,
                    "cantidadAprobado": 54,
                    "cantidadRechazado": 87,
                    "mes": 2
                },
                {
                    "cantidadPendiente": 12,
                    "cantidadAprobado": 32,
                    "cantidadRechazado": 43,
                    "mes": 3
                },
                {
                    "cantidadPendiente": 25,
                    "cantidadAprobado": 45,
                    "cantidadRechazado": 37,
                    "mes": 4
                },
                {
                    "cantidadPendiente": 34,
                    "cantidadAprobado": 54,
                    "cantidadRechazado": 87,
                    "mes": 5
                },
                {
                    "cantidadPendiente": 12,
                    "cantidadAprobado": 32,
                    "cantidadRechazado": 43,
                    "mes": 6
                },
            ]

            vm.getMonth = function (monthNumber) {
                return vm.monthsText[monthNumber]
            }

            vm.monthsText = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

        }]);