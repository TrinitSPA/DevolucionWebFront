var app = angular.module('myAppRouter', ['ui.router', 'headerDinamicoModule', 'personalizarSitioModule']);

app.config(function ($stateProvider, $urlRouterProvider) {

	//console.log("pagina: " + $stateParams);
    $urlRouterProvider.otherwise('/login');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('productos', {
            url: '/dashboard',
            views: {
                header: {
                    templateUrl: 'app/components/header/header.html'
                },
                content: {
                    templateUrl: 'app/components/productos/lista-productos/lista-productos.html',
                    css: 'app/components/productos/lista-productos/lista-productos.css'
                }
            }
        })
        .state('detalleProducto', {
            url: '/dashboard/detalleProducto',
            views: {
                header: {
                    templateUrl: 'app/components/header/header.html'
                },
                content: {
                    templateUrl: 'app/components/productos/detalle-producto/detalle-producto.html'
                }
            }
        })
        .state('login', {
            url: '/login',
            views: {
                header: {
                    templateUrl: 'app/components/header/header.html'
                },
                content: {
                    templateUrl: 'app/components/login/login.html'
                }
            }
        })
        .state('consultar', {
            url: '/consultar',
            views: {
                header: {
                    templateUrl: 'app/components/header/header.html'
                },
                content: {
                    templateUrl: 'app/components/consultar/buscarDevolucion.html'
                }
            }
        })
        .state('ingresar', {
            url: '/ingresar/:idEcommerce',
            controller: function($stateParams){
		      $stateParams.idEcommerce  //*** Exists! ***//
		    },
		    resolve:{
		       contactId: ['$stateParams', function($stateParams){
		      	   console.log('a ' + $stateParams.idEcommerce); 	
		           return $stateParams.idEcommerce;
		       }]
		    }, 
		    views: {
                content: {
                    templateUrl: 'app/components/ingresar/ingresoDevolucion.html'
                }
            }
        })
        .state('disenoConfig', {
            url: '/diseno-config',
            views: {
                content: {
                    templateUrl: 'app/components/diseno-config/diseno-config.html'
                }
            }
        })
        .state('dashboard-edicion', {
            url: '/dashboard-edicion',
            views: {
                header: {
                    templateUrl: 'app/components/header/header.html',
                    controller: 'headerDinamicoCtrl as hdCtrl'                    
                },
                content: {
                    templateUrl: 'app/components/dashboard/dashboard.html'
                }
                
            }
        })
        .state('generar-reporte', {
            url: '/generar-reporte',
            views: {
                header: {
                    templateUrl: 'app/components/header/header.html',
                    controller: 'headerDinamicoCtrl as hdCtrl'                    
                },
                content: {
                    templateUrl: 'app/components/generar-reporte/generar-reporte.html'
                }
                
            }
        })
        .state('panel-admin', {
            url: '/panel-admin',
            views: {
                header: {
                    templateUrl: 'app/components/header/header.html',
                    controller: 'headerDinamicoCtrl as hdCtrl'                    
                },
                content: {
                    templateUrl: 'app/components/panel-admin/panel-admin.html'
                }
                
            }
        })
        .state('personalizar-sitio', {
            url: '/personalizar-sitio',
            views: {
                content: {
                    templateUrl: 'app/components/personalizar-sitio/personalizar-sitio.html',
                    controller: 'personalizarSitioCtrl as psCtrl'
                }
                
            }
        })
        .state('reportes', {
            url: '/reportes',
            views: {
                header: {
                    templateUrl: 'app/components/header/header.html'
                },
                content: {
                    templateUrl: 'app/components/reportes/MenuReportes.html'
                }
                
            }
        })
        .state('reportesEstado', {
            url: '/reportesEstado',
            views: {
                header: {
                    templateUrl: 'app/components/header/header.html'
                },
                content: {
                    templateUrl: 'app/components/reportes/reportes.html'
                }
                
            }
        })
        .state('reportesMotivo', {
            url: '/reportesMotivo',
            views: {
                header: {
                    templateUrl: 'app/components/header/header.html'
                },
                content: {
                    templateUrl: 'app/components/reportes/reportes.html'
                }
                
            }
        })
        .state('reportesMacroEstado', {
            url: '/reportesMacroEstado',
            views: {
                header: {
                    templateUrl: 'app/components/header/header.html'
                },
                content: {
                    templateUrl: 'app/components/reportes/reportes.html'
                }
                
            }
        })


})