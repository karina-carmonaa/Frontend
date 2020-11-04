
const routes = [
  {
    path: '/',
    component: () => import('layouts/login.vue'),
    children: [
      {path: '/', component: () => import('pages/login.vue')},
      {path: '/registro', component: ()  => import('pages/registro.vue')}
    ]
  },
  {
    //path: '', component: () => import('pages/index.vue'),
    path: '/usuariosInico',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/usuarios', component: () => import('pages/usuarios.vue') },
      {path: '/EstadoHoyEjemplo', component: () => import('pages/EstadoHoyEjemplo.vue')}
    ]
  },
  {
    path: '/Menu',
    component: ()  => import('layouts/MenuUsuarios.vue'),
    children: [
      {path: '/menuUsuario', component: () => import('pages/menuUsuario.vue')},
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  },
  
  { path: '/EditarPerfil', component: () => import('pages/EditarPerfil.vue') },
  { path: '/nuevoUsuario/:id', component: () => import('pages/nuevoUsuario.vue') },
  { path: '/EstadoSalud', component: () => import('pages/EstadoSalud.vue') },
  { path: '/Seguimiento', component: () => import('pages/seguimientoSalud.vue') },
  { path: '/Historial', component: () => import('pages/HistorialMedico.vue') },
  { path: '/Recordatorio', component: () => import('pages/RecordatorioMedi.vue') },
  { path: '/MedicoAcudir', component: () => import('pages/MedicoAcudir.vue') },
  { path: '/NuevoRecordatorio/:id', component: () => import('pages/nuevoRecordatorio.vue') },
  {path: '/menuHistorial', component: () => import('pages/menuHistorial.vue')},
  {path: '/Estudios', component: () => import('pages/Estudios.vue')},
  {path: '/Consultas', component: () => import('pages/Consultas.vue')},
  {path: '/Ingresos', component: () => import('pages/Ingresos.vue')},
  {path: '/Repetir', component: () => import('pages/Repetir.vue')},
  {path: '/personalizado', component: () => import('pages/personalizado.vue')},
  {path: '/EstadoSaludCuestionario/:id', component: () => import('pages/EstadoSaludCuestionario.vue')},
  {path: '/EstadoSaludRecomendacion/:total:areaAfectada', component: () => import('pages/EstadoSaludRecomendacion.vue')},  
  {path: '/seguimientoGraficas', component: () => import('pages/seguimientoSaludGraficas.vue')},
  
]

export default routes
 