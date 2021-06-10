angular.module('personalizarSitioModule')
    .controller('personalizarSitioCtrl',
        ['$scope',
            '$http',
            '$state',
            'loginService',
            '$location',
            function ($scope, $http, $state, loginService, $location) {
                var vm = this;

                vm.editarTitulo1 = false;
                vm.editarSubtitulo1 = false;
                vm.editarTitulo2 = false;

                vm.colorPickerOptions = {
                    format: 'hex',
                    id: 'colorPickerTitulo1'
                }

                vm.config = {
                    textoTitulo1: "Devolución Web",
                    colorTitulo1: "858796"
                }

                vm.styleTitulo1 = {
                    color: "#" + vm.config.colorTitulo1
                }

                vm.temp = {
                    textoTitulo1: "Devolución Web"
                }

                vm.editarColorTitulo1 = function () {
                    vm.titulo1ColorPicker.open();
                }

                vm.guardarTitulo1 = function () {
                    vm.config.textoTitulo1 = angular.copy(vm.temp.textoTitulo1);
                    vm.editarTitulo1 = false
                }

                vm.eventAPIColorTitulo1 = {
                    onChange: function (api, color, $event) {
                        vm.config.colorTitulo1 = color
                        vm.styleTitulo1.color = "#" + color
                    }
                }


            }]);