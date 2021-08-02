angular.module('personalizarSitioModule')
    .controller('personalizarSitioCtrl',
        ['$scope',
            '$http',
            '$state',
            'loginService',
            '$location',
            function ($scope, $http, $state, loginService, $location) {
                var vm = this;
                vm.formData = {
                };
                const host = $location.protocol() + '://' + $location.host() + ':8081';

                vm.editarTitulo1, vm.editarTitulo2, vm.editarTitulo3 = false;
                vm.colorEnEdicion = false;
                vm.loadingGuardar = false;

                vm.colorPickerOptions1 = generateColorOption('colorPickerTitulo1');
                vm.colorPickerOptions2 = generateColorOption('colorPickerTitulo2');
                vm.colorPickerOptionsColorFondo1 = generateColorOption('colorPickerColorFondo1');
                vm.colorPickerOptionsColorFondo2 = generateColorOption('colorPickerColorFondo2');
                vm.colorPickerOptionsColorFondo3 = generateColorOption('colorPickerColorFondo3');
                vm.colorPickerOptionsColorPaso = generateColorOption('colorPickerColorPaso');
                vm.colorPickerOptionsColorBoton = generateColorOption('colorPickerColorBoton');

                vm.config = {
                    ocultarEdicion: false,
                    integraloEnTuSitio: false,
                    textoTitulo1: "Devolución Web",
                    colorTitulo1: "858196",
                    textoTitulo2: "¿Necesitas realizar una devolución? Completa el siguiente formulario:",
                    colorTitulo2: "39c0e0",
                    colorFondo1: "134085",
                    colorFondo2: "e0f1f7",
                    imagen1: {
                        base64: imagen1
                    },
                    imagen2: {
                        base64: imagen2
                    },
                    colorPaso: "39c0e0",
                    textoTitulo3: "DATOS DEL PRODUCTO",
                    colorFondo3: "f4f4f4",
                    colorBoton: "0033a0",
                    ordenCompra: "",
                    tipoProducto: "",
                    codigoMotivo: "",
                }

                vm.style = {
                    titulo1: {
                        color: "#" + vm.config.colorTitulo1
                    },
                    titulo2: {
                        color: "#" + vm.config.colorTitulo2
                    },
                    colorFondo1: {
                        "background-color": "#" + vm.config.colorFondo1
                    },
                    colorFondo2: {
                        background: "#" + vm.config.colorFondo2
                    },
                    colorFondo3: {
                        background: "#" + vm.config.colorFondo3
                    },
                    colorPasoTexto: {
                        color: "#" + vm.config.colorPaso
                    },
                    colorPasoCirculo: {
                        background: "#" + vm.config.colorPaso,
                        "border-color": "#" + vm.config.colorPaso
                    },
                    colorBoton: {
                        "background-color": "#" + vm.config.colorBoton,
                        "border-color": "#" + vm.config.colorBoton
                    }
                }

                vm.temp = {
                    textoTitulo1: vm.config.textoTitulo1,
                    textoTitulo2: vm.config.textoTitulo2,
                    textoTitulo3: vm.config.textoTitulo3,
                    ordenCompra: vm.config.ordenCompra,
                    tipoProducto: vm.config.tipoProducto,
                    codigoMotivo: vm.config.codigoMotivo
                }

                vm.init = function () {
                    vm.cargarPerfil();
                    vm.urlEncrypt = loginService.codigoCliente;//f9bfa23461a398a8f9687b4a70267e8d
                    vm.codigo = loginService.codigo;//28
                    vm.codigoCliente = loginService.codigoCliente;//2
                    console.log("codigo: ", vm.codigo);
                    console.log("codigoCliente: ", vm.codigoCliente);
                }

                vm.cargarPerfil = function () {
                    $http.get(host + '/devolucionRest/rest/logistica/personalizarSitio/listarAll?clienteCodigo='+loginService.codigoCliente)
                        .success(function (data) {
                            // temporal
                            vm.config.imagen1.base64 = data[0].headerLogo;
                            vm.config.imagen2.base64 = data[0].headerIcono;
                            vm.config.colorFondo1 = data[0].backgroundColor;
                            vm.config.textoTitulo1 = data[0].title;
                            vm.config.textoTitulo2 = data[0].subtitle;
                            vm.config.colorFondo2 = data[0].headerColourBottom;
                            vm.config.colorTitulo2 = data[0].headerColourText;
                            vm.config.textoTitulo3 = data[0].entryProduct;
                            vm.config.colorFondo3 = data[0].entryColour;
                            vm.config.colorBoton = data[0].entryValidateButton;

                            vm.style = {
                                titulo1: {
                                    color: "#" + vm.config.colorTitulo1
                                },
                                titulo2: {
                                    color: "#" + vm.config.colorTitulo2
                                },
                                colorFondo1: {
                                    "background-color": "#" + vm.config.colorFondo1
                                },
                                colorFondo2: {
                                    background: "#" + vm.config.colorFondo2
                                },
                                colorFondo3: {
                                    background: "#" + vm.config.colorFondo3
                                },
                                colorPasoTexto: {
                                    color: "#" + vm.config.colorPaso
                                },
                                colorPasoCirculo: {
                                    background: "#" + vm.config.colorPaso,
                                    "border-color": "#" + vm.config.colorPaso
                                },
                                colorBoton: {
                                    "background-color": "#" + vm.config.colorBoton,
                                    "border-color": "#" + vm.config.colorBoton
                                }
                            }
            
                            vm.temp = {
                                textoTitulo1: vm.config.textoTitulo1,
                                textoTitulo2: vm.config.textoTitulo2,
                                textoTitulo3: vm.config.textoTitulo3,
                                ordenCompra: vm.config.ordenCompra,
                                tipoProducto: vm.config.tipoProducto,
                                codigoMotivo: vm.config.codigoMotivo
                            }
                            console.log(vm.config)
                            // fin temporal
                        })
                        .error(function (data) {
                            console.log('Error:' + data);
                        });
                }

                vm.guardarTitulo1 = function () {
                    vm.config.textoTitulo1 = angular.copy(vm.temp.textoTitulo1);
                    vm.editarTitulo1 = false
                }

                vm.guardarTitulo2 = function () {
                    vm.config.textoTitulo2 = angular.copy(vm.temp.textoTitulo2);
                    vm.editarTitulo2 = false
                }

                vm.guardarTitulo3 = function () {
                    vm.config.textoTitulo3 = angular.copy(vm.temp.textoTitulo3);
                    vm.editarTitulo3 = false
                }

                vm.eventAPIColorTitulo1 = {
                    onClose: function (api, color, $event) {
                        vm.config.colorTitulo1 = color
                        vm.style.titulo1.color = "#" + color
                        vm.titulo1ColorPicker.getElement()[0].style.display = "none"
                        vm.colorEnEdicion = false;
                    }
                }

                vm.eventAPIColorTitulo2 = {
                    onClose: function (api, color, $event) {
                        vm.config.colorTitulo2 = color
                        vm.style.titulo2.color = "#" + color
                        vm.titulo2ColorPicker.getElement()[0].style.display = "none"
                        vm.colorEnEdicion = false;
                    }
                }

                vm.eventAPIColorColorFondo1 = {
                    onClose: function (api, color, $event) {
                        vm.config.colorFondo1 = color
                        vm.style.colorFondo1["background-color"] = "#" + color
                        vm.colorFondo1ColorPicker.getElement()[0].style.display = "none"
                        vm.colorEnEdicion = false;
                    }
                }

                vm.eventAPIColorColorFondo2 = {
                    onClose: function (api, color, $event) {
                        vm.config.colorFondo2 = color
                        vm.style.colorFondo2.background = "#" + color
                        vm.colorFondo2ColorPicker.getElement()[0].style.display = "none"
                        vm.colorEnEdicion = false;
                    }
                }

                vm.eventAPIColorColorFondo3 = {
                    onClose: function (api, color, $event) {
                        vm.config.colorFondo3 = color
                        vm.style.colorFondo3.background = "#" + color
                        vm.colorFondo3ColorPicker.getElement()[0].style.display = "none"
                        vm.colorEnEdicion = false;
                    }
                }

                vm.eventAPIColorPaso = {
                    onClose: function (api, color, $event) {
                        vm.config.colorPaso = color
                        vm.style.colorPasoTexto.color = "#" + color
                        vm.style.colorPasoCirculo.background = "#" + color
                        vm.style.colorPasoCirculo["border-color"] = "#" + color
                        vm.colorPasoColorPicker.getElement()[0].style.display = "none"
                        vm.colorEnEdicion = false;
                    }
                }

                vm.eventAPIColorBoton = {
                    onClose: function (api, color, $event) {
                        vm.config.colorBoton = color
                        vm.style.colorBoton["background-color"] = "#" + color
                        vm.style.colorBoton["border-color"] = "#" + color
                        vm.colorBotonColorPicker.getElement()[0].style.display = "none"
                        vm.colorEnEdicion = false;
                    }
                }

                vm.showTitulo1ColorPicker = function () {
                    vm.titulo1ColorPicker.getElement()[0].style.display = 'inline';
                    vm.titulo1ColorPicker.open()
                    vm.colorEnEdicion = true;
                }

                vm.showTitulo2ColorPicker = function () {
                    vm.titulo2ColorPicker.getElement()[0].style.display = 'inline';
                    vm.titulo2ColorPicker.open()
                    vm.colorEnEdicion = true;
                }

                vm.showColorFondo1ColorPicker = function () {
                    vm.colorFondo1ColorPicker.getElement()[0].style.display = 'inline';
                    vm.colorFondo1ColorPicker.open()
                    vm.colorEnEdicion = true;
                }

                vm.showColorFondo2ColorPicker = function () {
                    vm.colorFondo2ColorPicker.getElement()[0].style.display = 'inline';
                    vm.colorFondo2ColorPicker.open()
                    vm.colorEnEdicion = true;
                }

                vm.showColorFondo3ColorPicker = function () {
                    vm.colorFondo3ColorPicker.getElement()[0].style.display = 'inline';
                    vm.colorFondo3ColorPicker.open()
                    vm.colorEnEdicion = true;
                }

                vm.showColorPasoColorPicker = function () {
                    vm.colorPasoColorPicker.getElement()[0].style.display = 'inline';
                    vm.colorPasoColorPicker.open()
                    vm.colorEnEdicion = true;
                }

                vm.showColorBotonColorPicker = function () {
                    vm.colorBotonColorPicker.getElement()[0].style.display = 'inline';
                    vm.colorBotonColorPicker.open()
                    vm.colorEnEdicion = true;
                }

                vm.guardar = function () {
                    vm.loadingGuardar = true;
                    
                    const data = angular.copy(vm.config);
                    data.codigo = vm.codigo;//28;
                    data.clienteCodigo = vm.codigoCliente;//2;
                    data.estado = 1;
                    data.headerLogo = data.imagen1.base64;
                    data.headerIcono = data.imagen2.base64;
                    data.backgroundColor = data.colorFondo1;
                    data.title = data.textoTitulo1;
                    data.subtitle = data.textoTitulo2;
                    data.headerColourBottom = data.colorFondo2;
                    data.headerColourText = data.colorTitulo2;
                    data.entryProduct = data.textoTitulo3;
                    data.entryColour = data.colorFondo3;
                    data.entryValidateButton = data.colorBoton;

                    $http.put(host + '/devolucionRest/rest/logistica/personalizarSitio/actualizar/', data)
                        .success(function (data) {
                            console.log(data)
                            vm.loadingGuardar = false;
                            vm.cargarPerfil();
                        })
                        .error(function (data) {
                            console.log('Error:' + data);
                            vm.loadingGuardar = false;
                        });
                }

                vm.bloquearChecks = function () {
                    return vm.editarTitulo1 || vm.editarTitulo2 || vm.editarTitulo3 || vm.colorEnEdicion;
                }
                $(document).ready(function () {
                    $('[data-toggle=tooltip]').tooltip();
                });
            }]);

const generateColorOption = function (id) {
    return {
        format: 'hex',
        id
    }
}

const imagen1 = "iVBORw0KGgoAAAANSUhEUgAAAS8AAAEpCAYAAADCh6TFAAABN2lDQ1BBZG9iZSBSR0IgKDE5OTgpAAAokZWPv0rDUBSHvxtFxaFWCOLgcCdRUGzVwYxJW4ogWKtDkq1JQ5ViEm6uf/oQjm4dXNx9AidHwUHxCXwDxamDQ4QMBYvf9J3fORzOAaNi152GUYbzWKt205Gu58vZF2aYAoBOmKV2q3UAECdxxBjf7wiA10277jTG+38yH6ZKAyNguxtlIYgK0L/SqQYxBMygn2oQD4CpTto1EE9AqZf7G1AKcv8ASsr1fBBfgNlzPR+MOcAMcl8BTB1da4Bakg7UWe9Uy6plWdLuJkEkjweZjs4zuR+HiUoT1dFRF8jvA2AxH2w3HblWtay99X/+PRHX82Vun0cIQCw9F1lBeKEuf1UYO5PrYsdwGQ7vYXpUZLs3cLcBC7dFtlqF8hY8Dn8AwMZP/fNTP8gAAAAJcEhZcwAAFxIAABcSAWef0lIAAAXIaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA2LjAtYzAwMiA3OS4xNjQ0NjAsIDIwMjAvMDUvMTItMTY6MDQ6MTcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMS4yIChXaW5kb3dzKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjAtMDktMjdUMTM6MTk6MDYtMDM6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjAtMDktMjdUMTM6MTk6MDYtMDM6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIwLTA5LTI3VDEzOjE5OjA2LTAzOjAwIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjU3MWJmMzNmLTVhODItNjg0Yy04YjllLTFhYzdlOWUzZDkxZiIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjg4MWZmMGRkLWExYmMtZmE0OS05MGU0LWI0MTVkZDNlNjg1OSIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjM5MWU2OTc2LTBkY2UtOTU0Mi1hMmIyLThjNmEwMTk5NGY4OSIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjM5MWU2OTc2LTBkY2UtOTU0Mi1hMmIyLThjNmEwMTk5NGY4OSIgc3RFdnQ6d2hlbj0iMjAyMC0wOS0yN1QxMzoxOTowNi0wMzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIxLjIgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo1NzFiZjMzZi01YTgyLTY4NGMtOGI5ZS0xYWM3ZTllM2Q5MWYiIHN0RXZ0OndoZW49IjIwMjAtMDktMjdUMTM6MTk6MDYtMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4yIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9y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"

const imagen2 = "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"