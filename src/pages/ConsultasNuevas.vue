<template>
  <div class="bg-paginas">
    <q-layout view="lHh Lpr lff" class="shadow-2 rounded-borders">
      <q-header class="bg-cyan-8 q-px-sm q-pt-md q-mb-md">
        <q-toolbar>
          <q-btn flat  dense size="sm" round @click="atras" class="platform-ios-only"
            icon="arrow_back_ios" />
          <q-btn flat  dense size="sm" round @click="atras" class="platform-android-only"
            icon="arrow_back" />
          <span class="q-subtitle-2 absolute-center ">
            Consultas
          </span>
          <q-btn flat label="Guardar" no-caps @click="guardarConsulta()" class="absolute-right"/>
        </q-toolbar>
      </q-header>
      <q-page-container class="row q-ma-lg">
        <div class="q-gutter-y-sm col-12">
          <q-input filled dense v-model="motivo" >
            <template v-slot:before>
              <p class="text-body2 text-black">Motivo: </p>
            </template>
          </q-input>
          <q-input  v-model="fecha" dense filled type="date" today transition-show="scale" transition-hide="scale"
            mask="date" stack-label >
            <template v-slot:before>
              <p class="text-body2 text-black">Fecha:</p>
            </template>
          </q-input>
          <q-input filled dense v-model="medico">
            <template v-slot:before>
              <p class="text-body2 text-black">Médico:</p>
            </template>
          </q-input>
          <q-input v-model="telefono" filled  mask="(###) ### - ####" stack-label unmasked-value dense>
            <template v-slot:before>
              <p class="text-body2 text-black">Teléfono:</p>
            </template>
          </q-input>
          <q-input filled dense v-model="hospital">
            <template v-slot:before>
              <p class="text-body2 text-black">Hospital:</p>
            </template>
          </q-input>
        </div>
        <div class="text-center q-mt-md column">
          <p class="text-h6 text-black">Receta médica</p>
        </div>
        <q-card v-for="(imagen, key) in imagenes" :key="key">
          <img :src = "imagen.img_url"> 
          <q-card-section vertical class="q-pt-xs text-subtitle2 text-center">
            <q-input dense v-model="imagen.img_descrip" placeholder="Nombre de la imagen" >
              <template v-slot:append>
                <q-btn round dense flat icon="delete" @click="eliminar(key)" />
            </template>
          </q-input >
          </q-card-section> 
        </q-card> 
        <!-- prueba del boton multi file 
      <q-uploader
        style="max-width: 300px"
        label="Restricted to images"
        accept=".jpg, image/*"
        @change="imprimir"
      />
-->
        <input type="file" v-on:change="imprimir" />
        <div class="q-pt-md col-12">
          <q-btn class="full-width text-center" label="Agregar imagen" @click="agregarImg"  no-caps rounded unelevated color="secondary">  
          </q-btn>
        </div>
        <div class="q-pt-md col-12" v-if="this.id != '0'">
          <div class="q-pa-md q-gutter-lg text-center">            
            <q-btn color="negative" label="Eliminar" @click="eliminarConsulta" no-caps rounded unelevated />
            <q-btn color="green-7" label="Compartir" no-caps rounded  unelevated />
          </div>
        </div>
        <q-footer>
          <Footer />
        </q-footer>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import Footer from 'components/piePagina.vue'
let idHistorial = JSON.parse(localStorage.getItem('id_historial'));
import apiClient from '../service/api.js';

export default {
  name: 'ConsultasNuevas',
  data() {
    return {
      motivo: null,
      fecha: null,
      medico: null,
      telefono: null, 
      hospital: null,
      receta: false,      
      id: this.$route.params.id, 
      imagenes: [],
    }
  },
  methods:{
    atras(){
      this.$router.go(-1)
    },
    eliminarConsulta(){
      apiClient.delete('api/v1/consultas/'+this.id).then(() => {
        this.$router.go(-1)
      })
    },
    guardarConsulta(){
      if (this.id == 0) {
        //guarda una nueva consulta
        apiClient.post('api/v1/consultas', {
          data: {
            type: "consultas",
            attributes: {
              historial_id: idHistorial,
              motivo: this.motivo,
              medico: this.medico,
              telefono: this.telefono,
              hospital: this.hospital,
              fecha: this.fecha
            }
          }
        }).then((res) => {
          this.$q.notify('consulta guardado')
          this.$router.go(-1)
        });
      } else {
          //edita la consulta existente segun el id
          apiClient.patch('api/v1/consultas/'+this.id,{
          data: {
            type: "consultas",
            id: this.id,
            attributes: {
              historial_id: idHistorial,
              motivo: this.motivo,
              medico: this.medico,
              telefono: this.telefono,
              hospital: this.hospital,
              fecha: this.fecha
            }
          }
        }).then((res) => {
          this.$q.notify('consulta guardado')
          this.$router.go(-1)
        });
      }
    },
    agregarImg(){
      console.log(this.imagenes)
    },
    ObtenerDatos(){
      if(this.id != 0){
        apiClient.get('api/v1/consultas/'+this.id).then((res) => {
          let respuestaApi = res.data.data.attributes
          this.motivo = respuestaApi.motivo,
          this.medico = respuestaApi.medico,
          this.telefono = respuestaApi.telefono
          this.hospital = respuestaApi.hospital
          this.fecha = respuestaApi.fecha
        })
      }
    },
    imprimir: function (event) {
      try {
        let url = URL.createObjectURL(event.target.files[0]) 
        this.imagenes.push({img_url: url, img_descrip: "" })
        this.receta = true
      } catch (error) {
        console.log(error)
      }      
    },
    eliminar(id){
      this.imagenes.splice(id, 1)
    }
  },
  components: {
    Footer
  },
  mounted() {
    this.ObtenerDatos();
  },
}
</script>

<style lang="scss">
  .inputfile {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
</style>