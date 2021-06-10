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
                vm.editarTitulo2 = false;
                vm.editarTitulo3 = false;

                vm.colorPickerOptions1 = {
                    format: 'hex',
                    id: 'colorPickerTitulo1'
                }

                vm.colorPickerOptions2 = {
                    format: 'hex',
                    id: 'colorPickerTitulo2'
                }

                vm.colorPickerOptionsColorFondo2 = {
                    format: 'hex',
                    id: 'colorPickerColorFondo2'
                }

                vm.config = {
                    textoTitulo1: "Devolución Web",
                    colorTitulo1: "858796",
                    textoTitulo2: "¿Necesitas realizar una devolución? Completa el siguiente formulario:",
                    colorTitulo2: "39c0e0",
                    colorFondo2: "e0f1f7"
                }

                vm.style = {
                    titulo1: {
                        color: "#" + vm.config.colorTitulo1
                    },
                    titulo2: {
                        color: "#" + vm.config.colorTitulo2
                    },
                    colorFondo2: {
                        background: "#" + vm.config.colorFondo2
                    }
                }

                vm.temp = {
                    textoTitulo1: "Devolución Web",
                    textoTitulo2: "¿Necesitas realizar una devolución? Completa el siguiente formulario:"
                }

                vm.guardarTitulo1 = function () {
                    vm.config.textoTitulo1 = angular.copy(vm.temp.textoTitulo1);
                    vm.editarTitulo1 = false
                }

                vm.guardarTitulo2 = function () {
                    vm.config.textoTitulo2 = angular.copy(vm.temp.textoTitulo2);
                    vm.editarTitulo2 = false
                }

                vm.eventAPIColorTitulo1 = {
                    onChange: function (api, color, $event) {
                        vm.config.colorTitulo1 = color
                        vm.style.titulo1.color = "#" + color
                    }
                }

                vm.eventAPIColorTitulo2 = {
                    onChange: function (api, color, $event) {
                        vm.config.colorTitulo2 = color
                        vm.style.titulo2.color = "#" + color
                    }
                }

                vm.eventAPIColorColorFondo2 = {
                    onChange: function (api, color, $event) {
                        vm.config.colorFondo2 = color
                        vm.style.colorFondo2.background = "#" + color
                    }
                }


            }]);