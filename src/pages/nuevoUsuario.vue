<template>
  <div class="bg-paginas">
      <q-layout view="lHh Lpr lff" class="shadow-2 rounded-borders">
        <q-header class="bg-cyan-8 q-px-sm q-pt-md q-mb-md">
          <q-toolbar>
            <q-btn flat  dense size="sm" round @click="atras" class="platform-ios-only"
              icon="arrow_back_ios"/>
            <q-btn flat  dense size="sm" round @click="atras" class="platform-android-only"
              icon="arrow_back"/>
            <span class="q-subtitle-2 absolute-center">
              <span v-if="id === (0).toString()"> Nuevo usuario</span>              
              <span v-else> Editar usuario</span>
            </span>
            <q-btn flat label="Guardar" v-if="id === (0).toString()" @click="crearUsuario" size="sm" class="absolute-right"/>
            <q-btn flat label="Guardar" v-else @click="actualizarUsuario" size="sm" class="absolute-right"/>
          </q-toolbar>
        </q-header>
        <q-page-container>
          <div class="col q-pa-lg q-ml-md text-center">
            <!-- <q-avatar size="56px" class="q-mb-sm">
              <img src="~assets/nuevoUsuario.jpg">
            </q-avatar> -->
            <div class="q-gutter-y-md column">
              <q-input v-model="text" label="Nombre completo" stack-label :dense="dense" />
              <!-- <q-input v-model="correo" type="email" label="Correo electrónico" stack-label /> -->
              <q-input v-model="Fecha" type="date" transition-show="scale" transition-hide="scale"
                  mask="date" label="Fecha de nacimiento"  stack-label />
              <q-select v-model="genero" :options="OpcGenero" label="Género" stack-label :dense="dense"
                transition-show="jump-up" transition-hide="jump-up"  />
              <q-input v-model="telefono"  mask="(###) ### - ####" stack-label
                unmasked-value label="Télefono" :dense="dense" />
            </div>
          </div>
          <q-footer class="q-px-xl">
            <Footer />
          </q-footer>
        </q-page-container>
      </q-layout>
  </div>
</template>

<script>
import Footer from 'components/piePagina.vue'
import apiClient from '../service/api.js';

export default {
  data() {
    return {
      OpcGenero: [
        'Masculino','Femenino'
      ],
      id: this.$route.params.id,
      text: null,
      Fecha: null,
      genero: null,
      telefono: null,
      dense: false,
      usuario: null,
      correo: null,
      cuenta: localStorage.getItem('id_cuenta')
    }    
  },
  methods: {
    atras(){
      this.$router.go(-1)
    },  
    crearUsuario() { 
        apiClient.post("/api/v1/users", {
          data: {
            type: "users",
            attributes: {
              name: this.text,
              cuenta_id: this.cuenta,
              telefono: this.telefono,
              email: this.correo,
              sexo: this.genero,
              fecha_nacimiento: this.Fecha
            }  
          } 
        }).then((res) => {
          apiClient.post("/api/v1/historials", {
            data:{
              type: "historials",
              attributes: {
                user_id: res.data.data.id
              }
            }
          }).then(()=>{
          })
          this.$q.notify('Usuario guardado')
          this.$router.replace('/usuarios')
        });
    },
    obtenerUsuario(){
      apiClient.get("/api/v1/users/"+this.id).then((res) => {
        this.usuario = res.data.data.attributes;
        this.text = this.usuario.name
        this.correo = this.usuario.email
        this.telefono = this.usuario.telefono
        this.genero = this.usuario.sexo
        this.Fecha = this.usuario.fecha_nacimiento
      })
    },
    actualizarUsuario(){
      apiClient.patch("/api/v1/users/"+this.id, {
        data: {
          type: "users",
          id: this.id,
          attributes: {
            name: this.text,
            email: this.correo,
            cuenta_id: this.cuenta,
            telefono: this.telefono,
            sexo: this.genero,
            fecha_nacimiento: this.Fecha
          }  
        } 
      })
      .then((res) => {         
        this.$q.notify('Usuario guardado')
        this.$router.replace("/usuarios")
      })
    }
  },
  components: {
    Footer
  },
  mounted() {
    if(this.id != 0){
      this.obtenerUsuario();
    }
  },
}
</script>
