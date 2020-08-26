
const routes = [
  {
    //path: '', component: () => import('pages/index.vue'),
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/usuarios.vue') },
      {path: '/menuUsuario', component: () => import('pages/menuUsuario.vue')},
      {path: '/EstadoHoyEjemplo', component: () => import('pages/EstadoHoyEjemplo.vue')}
    ]
  },
  {
    path: '/Menu',
    component: ()  => import('layouts/MenuUsuarios.vue'),
    children: [
      
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  },
  
  { path: '/EditarPerfil', component: () => import('pages/EditarPerfil.vue') },
  { path: '/nuevoUsuario', component: () => import('pages/nuevoUsuario.vue') },
  { path: '/EstadoSalud', component: () => import('pages/EstadoSalud.vue') },
  { path: '/Seguimiento', component: () => import('pages/seguimientoSalud.vue') },
  { path: '/Historial', component: () => import('pages/HistorialMedico.vue') },
  { path: '/Recordatorio', component: () => import('pages/RecordatorioMedi.vue') },
  { path: '/MedicoAcudir', component: () => import('pages/MedicoAcudir.vue') },
  { path: '/NuevoRecordatorio', component: () => import('pages/nuevoRecordatorio.vue') },
  {path: '/menuHistorial', component: () => import('pages/menuHistorial.vue')},
  {path: '/Estudios', component: () => import('pages/Estudios.vue')},
  {path: '/Consultas', component: () => import('pages/Consultas.vue')},
  {path: '/Ingresos', component: () => import('pages/Ingresos.vue')},
  {path: '/Repetir', component: () => import('pages/Repetir.vue')},
  {path: '/personalizado', component: () => import('pages/personalizado.vue')},
]

export default routes
 