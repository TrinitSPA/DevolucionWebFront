angular.module('reportesModule')
    .controller('reportesCtrl',
        ['$scope', '$http', '$state', '$location', function ($scope, $http, $state, $location) {
            var vm = this;
            var host = $location.protocol() + '://' + $location.host() + ':8081';
            vm.checkFechas = "6meses"

            vm.currentDate = new Date();
            vm.fechaInicio = new Date();
            vm.fechaInicio.setMonth(vm.currentDate.getMonth() - 6);
            vm.fechaFin = new Date();

            vm.loading = true;
            vm.fecInicio = "";
            vm.fecFin = "";

            vm.init = function () {
                setTimeout(() => {
                    vm.procesarReportes(vm.dataTest);
                }, 2000);
            }

            vm.check6Meses = function () {
                vm.fechaInicio = new Date();
                vm.fechaInicio.setMonth(vm.currentDate.getMonth() - 6);
                vm.fechaFin = new Date()
            }

            vm.buscarReportes = function () {

                const fechaInicio = moment(vm.fechaInicio).format('DD-MM-YYYY');
                const fechaFin = moment(vm.fechaFin).format('DD-MM-YYYY');

                $http.get(host + '/devolucionRest/rest/logistica/reporte/listarEstado', {
                    params: { clienteCodigo: 2, fechaInicio: fechaInicio, fechaTermino: fechaFin }
                })
                    .success(function (data) {
                        console.log(data)
                        vm.loadingGuardar = false;
                        //vm.cargarPerfil();
                    })
                    .error(function (data) {
                        console.log('Error:' + data);
                        vm.loadingGuardar = false;
                    });

            }

            vm.procesarReportes = function (data) {

                vm.seriesResumen = vm.getSeries(data);

                vm.labelsResumen = data.map((item) => {
                    return vm.getMonth(item.mes - 1)
                });

                console.log(vm.seriesResumen)

                vm.optionsResumen = { legend: { display: true } };
                vm.dataResumen = [];
                vm.seriesResumen.forEach(serie => {
                    vm.dataResumen.push(
                        data.map((item) => {
                            for (let index = 0; index < item.reporteEstadosTOs.length; index++) {
                                if (item.reporteEstadosTOs[index].estado === serie) {
                                    return item.reporteEstadosTOs[index].cantidad
                                }
                            }
                            return 0;
                        }));
                });
                console.log(vm.seriesResumen)
                console.log(vm.dataResumen)
                vm.loading = false;
                $scope.$apply();
            }

            vm.getSeries = function (data) {
                const arraysEstados = data.map((item) => {
                    return item.reporteEstadosTOs.map((reporteEstado) => {
                        return reporteEstado.estado
                    })
                });
                let arrayConcatenados = []
                for (var i = 0; i < arraysEstados.length; ++i) {
                    arrayConcatenados = arrayConcatenados.concat(arraysEstados[i])
                }
                return arrayConcatenados.filter((item, pos) => arrayConcatenados.indexOf(item) === pos)
            }

            vm.dataTest = [
                {
                    "annio": 2020,
                    "mes": 11,
                    "reporteEstadosTOs": [
                        {
                            "estado": "Pendiente",
                            "cantidad": 10
                        }
                    ]
                },
                {
                    "annio": 2020,
                    "mes": 10,
                    "reporteEstadosTOs": [
                        {
                            "estado": "Pendiente",
                            "cantidad": 25
                        },
                        {
                            "estado": "Rechazado",
                            "cantidad": 16
                        },
                        {
                            "estado": "Aprobada",
                            "cantidad": 7
                        }
                    ]
                }
            ]

            vm.getMonth = function (monthNumber) {
                return vm.monthsText[monthNumber]
            }

            vm.monthsText = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

        }]);