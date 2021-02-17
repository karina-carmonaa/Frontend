import store from 'src/store/auth'
const routes = [
  {
    path: '/',
    component: () => import('layouts/login.vue'),
    children: [
      {path: '/', name:"login", component: () => import('pages/login.vue')},
      {path: '/registro', component: ()  => import('pages/registro.vue')},
      { path: '/resetPassword', component: () => import('pages/resetPassword.vue') },
    ]
  },
  {
    path: '/usuariosInico',
    component: () => import('layouts/MainLayout.vue'),
    children: [
    ]
  },
  {
    path: '/Menu',
    component: ()  => import('layouts/MenuUsuarios.vue'),
    children: [
      { path: '/usuarios', component: () => import('pages/usuarios.vue'),
      beforeEnter: (to, from, next) => {
        if (store.state.authenticated) next() 
        else next({ name: 'login' })
      }},
      {path: '/EstadoHoyEjemplo', component: () => import('pages/EstadoHoyEjemplo.vue'),
      beforeEnter: (to, from, next) => {
        if (store.state.authenticated) next() 
        else next({ name: 'login' })
      }},
      {path: '/menuUsuario', component: () => import('pages/menuUsuario.vue'),
      beforeEnter: (to, from, next) => {
        if (store.state.authenticated) next() 
        else next({ name: 'login' })
      }},
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  },

  //EL beforeEnter nos sirve para poder saber si el usuario esta autentificado, silo esta muestra
  //la ruta que quiere, pero sino, se regresa a login
  { path: '/nuevoUsuario/:id', component: () => import('pages/nuevoUsuario.vue'), 
    beforeEnter: (to, from, next) => {
      if (store.state.authenticated) next() 
      else next({ name: 'login' })
    }},
  { path: '/EstadoSalud', component: () => import('pages/EstadoSalud.vue'), 
  beforeEnter: (to, from, next) => {
    if (store.state.authenticated) next() 
    else next({ name: 'login' })
  }},
  { path: '/Seguimiento', component: () => import('pages/seguimientoSalud.vue'), 
  beforeEnter: (to, from, next) => {
    if (store.state.authenticated) next() 
    else next({ name: 'login' })
  }},
  { path: '/Historial', component: () => import('pages/HistorialMedico.vue'), 
  beforeEnter: (to, from, next) => {
    if (store.state.authenticated) next() 
    else next({ name: 'login' })
  }},
  { path: '/Recordatorio', component: () => import('pages/RecordatorioMedi.vue'), 
  beforeEnter: (to, from, next) => {
    if (store.state.authenticated) next() 
    else next({ name: 'login' })
  }},
  { path: '/MedicoAcudir', component: () => import('pages/MedicoAcudir.vue'), 
  beforeEnter: (to, from, next) => {
    if (store.state.authenticated) next() 
    else next({ name: 'login' })
  }},
  { path: '/NuevoRecordatorio/:id', component: () => import('pages/nuevoRecordatorio.vue'), 
  beforeEnter: (to, from, next) => {
    if (store.state.authenticated) next() 
    else next({ name: 'login' })
  }},
  {path: '/menuHistorial', component: () => import('pages/menuHistorial.vue'), 
  beforeEnter: (to, from, next) => {
    if (store.state.authenticated) next() 
    else next({ name: 'login' })
  }},
  {path: '/Estudios', component: () => import('pages/Estudios.vue'), 
  beforeEnter: (to, from, next) => {
    if (store.state.authenticated) next() 
    else next({ name: 'login' })
  }},
  {path: '/Consultas-Ingresos/:id', component: () => import('pages/Consultas-Ingresos.vue'), 
  beforeEnter: (to, from, next) => {
    if (store.state.authenticated) next() 
    else next({ name: 'login' })
  }},
  {path: '/ConsultasNuevas/:id', component: () => import('pages/ConsultasNuevas.vue'), 
  beforeEnter: (to, from, next) => {
    if (store.state.authenticated) next() 
    else next({ name: 'login' })
  }},
  {path: '/IngresosNuevos/:id', component: () => import('pages/IngresosNuevos.vue'), 
  beforeEnter: (to, from, next) => {
    if (store.state.authenticated) next() 
    else next({ name: 'login' })
  }},
  {path: '/Repetir', component: () => import('pages/Repetir.vue'), 
  beforeEnter: (to, from, next) => {
    if (store.state.authenticated) next() 
    else next({ name: 'login' })
  }},
  {path: '/personalizado', component: () => import('pages/personalizado.vue'), 
  beforeEnter: (to, from, next) => {
    if (store.state.authenticated) next() 
    else next({ name: 'login' })
  }},
  {path: '/EstadoSaludCuestionario/:id', component: () => import('pages/EstadoSaludCuestionario.vue'), 
  beforeEnter: (to, from, next) => {
    if (store.state.authenticated) next() 
    else next({ name: 'login' })
  }},
  {path: '/EstadoSaludEquipoMedico', component: () => import('pages/EstadoSaludEquipoMedico.vue'), 
  beforeEnter: (to, from, next) => {
    if (store.state.authenticated) next() 
    else next({ name: 'login' })
  }},
  {path: '/EstadoSaludRecomendacion/:datos', component: () => import('pages/EstadoSaludRecomendacion.vue'),
  beforeEnter: (to, from, next) => {
    if (store.state.authenticated) next() 
    else next({ name: 'login' })
  }},
  {path: '/seguimientoGraficas', component: () => import('pages/seguimientoSaludGraficas.vue'),
  beforeEnter: (to, from, next) => {
    if (store.state.authenticated) next() 
    else next({ name: 'login' })
  }},
  {path: '/seguimientoDatos/:tabla', component: () => import('pages/seguimientoSaludDatosGraficas.vue'), 
  beforeEnter: (to, from, next) => {
    if (store.state.authenticated) next() 
    else next({ name: 'login' })
  }},
  
]

export default routes
 