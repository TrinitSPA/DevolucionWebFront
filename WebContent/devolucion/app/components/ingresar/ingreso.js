angular.module('ingresoModule')
    .controller('ingresoCtrl',
        ['$scope', '$http', '$state', 'ingresoService', '$location', '$stateParams', function ($scope, $http, $state, ingresoService, $location, $stateParams) {
            var vm = this;
            var urlEncrip = $stateParams.idEcommerce;
            var host = $location.protocol() + '://' + $location.host() + ':8081';
            
            vm.formData = {
            };
            vm.errors = {};
            vm.config = {
                    textoTitulo1: "Devolución Web1",
                    colorTitulo1: "858196",
                    textoTitulo2: "¿Necesitas realizar una devolución? Completa el siguiente formulario1:",
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
                    textoTitulo3: "DATOS DEL PRODUCTO1",
                    colorFondo3: "f4f4f4",
                    colorBoton: "0033a0",
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
                
            vm.createTodo = function (form1, form2) {
                var dataEnviar = angular.copy(vm.formData);
                dataEnviar.codigoEmpresa = dataEnviar.codigoEmpresa.codigoEmpresa;
                dataEnviar.codigoMotivo = dataEnviar.codigoMotivo.codigoMotivo;
                $http.post(host + '/devolucionRest/rest/logistica/insertDevolutionClient/', dataEnviar)
                    .success(function (data) {
                        const usuario = vm.formData.nombre;
                        $scope.formData = {};
                        if (form1) {
                            form1.$setPristine();
                            form1.$setUntouched();
                            form2.$setPristine();
                            form2.$setUntouched();
                        }
                        $('#paso3').show();
                        vm.hoy = moment().format('DD-MM-YYYY');
                        $('#retornaDevolucion').html('<h4><strong><b>¡Hemos recibido tu solicitud!</b></strong></h4><br>' +
                            '<h4>Ya fue enviada a la Tienda con fecha <b style=color:#0033a0;>' + vm.hoy + '</b>, puedes <br>' + 
                            ' revisar la confirmación de la solicitud en tu email. </h4>'+
                            '<h4><b style=color:#0033a0;>Número de Devolución: '+data.idNumeroRequerimiento+'</b></h4>');
                        $('#paso2').hide();
                    })
                    .error(function (data) {
                        console.log('Error:' + data);
                    });
            };

            vm.cargarEcommerces = function (form) {
                $http.get(host + '/devolucionRest/rest/logistica/eCommerces')
                    .success(function (data) {
                        vm.formData.eCommerce = data;
                        vm.formData.codigoEmpresa = data[0];
                    })
                    .error(function (data) {
                        console.log('Error:' + data);
                    });
            };

            vm.cargarMotivos = function (form) {
                $http.get(host + '/devolucionRest/rest/logistica/motivo/listar')
                    .success(function (data) {
                        vm.formData.motivos = data;
                        vm.formData.codigoMotivo = data[1].codigo;
                    })
                    .error(function (data) {
                        console.log('Error:' + data);
                    });
            };

            vm.init = function () {
            	vm.cargarPerfil();
                $('#paso2').hide();
                $('#paso3').hide();
            }

            vm.goPasoDos = function () {
            	if(vm.formData.validaOS === 0){
            		$('#paso1').hide();
                    $('#paso2').show();
                    $('#paso3').hide();
            	} else {
            		$http.get(host + '/devolucionRest/rest/logistica/ordenServicio/listar?clienteCodigo=' + vm.formData.eCommerce + '&numeroDocumento=' + vm.formData.ordenCompra)
                    .success(function (data) {
                        if (true == data) {
                            $('#paso1').hide();
                            $('#paso2').show();
                            $('#paso3').hide();
                        } else {
                            $("#myModal").modal('show');
                            //window.alert('Nª Orden Servicio / Empresa no coinciden.');
                        }
                    })
                    .error(function (data) {
                        console.log('Error:' + data);
                    });
            	}
            };

            vm.goPasoUno = function () {
                window.location.reload();
            };

            vm.validarPaso2 = () => {
                return !vm.errors.rutFormato && !vm.errors.rutVacio;
            }

            vm.validarRut = function () {
                vm.formData.rut = vm.formData.rut.replace(/[^\d-k]/g, "")

                if (!vm.formData.rut) {
                    vm.errors.rutVacio = true;
                    vm.errors.rutFormato = false;
                    return;
                } else {
                    vm.errors.rutVacio = false;
                }

                if (!vm.validaRutUtil(vm.formData.rut)) {
                    vm.errors.rutFormato = true;
                } else {
                    vm.errors.rutFormato = false;
                }

            }

            vm.soloTextoNombre = () => {
                if(!vm.formData.nombre){
                    return;
                }

                if (!/^[ a-záéíóúüñ]*$/i.test(vm.formData.nombre)) {
                    vm.formData.nombre = vm.formData.nombre.replace(/[^ a-záéíóúüñ]+/ig,"");
                }
            }
            
            vm.soloNumeros = () => {
                if(!vm.formData.telefono){
                    return;
                }

                if (!/^([0-9])*$/i.test(vm.formData.telefono)) {
                    vm.formData.telefono = vm.formData.telefono.replace(/[^ 0-9]+/ig,"");
                }
            }

            vm.validaRutUtil = (rutCompleto) => {
                if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
                    return false;
                var tmp = rutCompleto.split('-');
                var digv = tmp[1];
                var rut = tmp[0];
                if (digv == 'K') digv = 'k';
                return (vm.dvUtil(rut) == digv);
            }

            vm.dvUtil = (T) => {
                var M = 0, S = 1;
                for (; T; T = Math.floor(T / 10))
                    S = (S + T % 10 * (9 - M++ % 6)) % 11;
                return S ? S - 1 : 'k';
            }
            
            vm.cargarPerfil = function () {
            		//f9bfa23461a398a8f9687b4a70267e8d
            		if("generic" !== urlEncrip){
            			vm.cargarInfoPerfil();
            		}
            }
            
            vm.cargarInfoPerfil = function () {
            	$http.get(host + '/devolucionRest/rest/logistica/configuracion/ecommerce/'+urlEncrip)
                        .success(function (data) {
                        	vm.formData.eCommerce = data[0].configuracion.clienteCodigo;
                        	vm.formData.validaOS = data[0].configuracion.validarOser;
                        	console.log("vm.formData.validaOS: " + vm.formData.validaOS);
                        	console.log("codigoCliente: " + vm.formData.eCommerce);
                            vm.config.imagen1.base64 = data[0].frontEnd.headerLogo;
                            vm.config.imagen2.base64 = data[0].frontEnd.headerIcono;
                            vm.config.colorFondo1 = data[0].frontEnd.backgroundColor;
                            vm.config.textoTitulo1 = data[0].frontEnd.title;
                            vm.config.textoTitulo2 = data[0].frontEnd.subtitle;
                            vm.config.colorFondo2 = data[0].frontEnd.headerColourBottom;
                            vm.config.colorTitulo2 = data[0].frontEnd.headerColourText;
                            vm.config.textoTitulo3 = data[0].frontEnd.entryProduct;
                            vm.config.colorFondo3 = data[0].frontEnd.entryColour;
                            vm.config.colorBoton = data[0].frontEnd.entryValidateButton;

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
                        })
                        .error(function (data) {
                            console.log('Error:' + data);
                        });
            }


        }]);