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
            Estudios
          </span>
        </q-toolbar>
      </q-header>
      <q-page-container class="row q-ma-lg">
        <div class="q-pa-md col-12 q-gutter-sm">
          <q-card v-for="(imagen, key) in imagenes" :key="key">
            <q-img :src = "imagen.img_url"/> 
            <q-card-section vertical class="q-pt-xs text-subtitle2 text-center">
              <q-input dense v-model="imagen.img_descrip" placeholder="Nota" >
                <template v-slot:append>
                  <q-btn round dense  flat icon="delete" @click="eliminar(key, imagen)" />
                </template>
              </q-input >
            </q-card-section> 
          </q-card> 
          <q-dialog v-model="dialog" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <p> ¿Eliminar {{popup.img_descrip}} de los estudios? </p>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn flat label="Cancelar" color="primary" v-close-popup/>
                <q-btn flat label="Eliminar" color="red" v-close-popup @click="eliminarImagen"/>
              </q-card-actions>
            </q-card>
          </q-dialog>
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
import apiClient from '../service/api.js';

export default {
  name: 'Estudios',
  data() {
    return {
      imagenes: [],
      idHistorial: null,
      tipoEstudio: ['consultas','ingresos'],
      tipoDocumento: ['estudios','documentos'],
      dialog: false,
      id: null,
      popup: []
    }
  },
  methods:{
    atras(){
      this.$router.go(-1)
    },
    eliminar(idArreglo, datos){
      this.dialog = true
      //se guarda para eliminar despues  
      this.id = idArreglo
      //si se selecciona eliminar ya se guardaron los datos
      this.popup = datos
    },
    eliminarImagen(){
      //se modifica el valor de rel_estudio a 0 para que no se muestre más la imagen
      apiClient.patch('/api/v1/'+this.popup.img_datos.type+'/'+this.popup.img_datos.id, {
        data:{
          type: this.popup.img_datos.type,
          id: this.popup.img_datos.id,
          attributes: {
            rel_estudio: 0
          }
        }
      }).then(() => {
        this.imagenes.splice(this.id, 1)
      })      
    },
    obtenerDatosEstudios(){
      /*el for para no tener que escribir 2 veces el código, primero se buscan todas las consultas/ingresos 
      que tiene el historial (datos), luego se corre el arreglo de los resultados para buscar en cada consulta/ingreso
      las imagenes que tienen el valor res_estudio = 1, que significa que si se deben mostrar en los estudios
      al final se guardan en un arreglo y se muestran al usuario*/
      for (let i = 0; i < 2; i++) {        
        apiClient.get('/api/v1/historials/'+this.idHistorial+'/'+this.tipoEstudio[i]).then((res) => {
          let datos = res.data
          for (let j = 0; j < datos.data.length; j++) {
            apiClient.get('/api/v1/'+this.tipoEstudio[i]+'/'+datos.data[j].id+'/'+this.tipoDocumento[i]+'?filter[rel_estudio]=1').then((resEstudio) => {
              let datosEstudios = resEstudio.data
              for (let k = 0; k < datosEstudios.data.length; k++) {
                if (datosEstudios.data[k].length != 0) {   
                  this.imagenes.push({
                    img_datos: datosEstudios.data[k],
                    img_url: datosEstudios.data[k].attributes.url_imagen, 
                    img_descrip: datosEstudios.data[k].attributes.descripcion
                  })                    
                }
              }
            })
          }        
        })
      }
    },
  },
  components: {
    Footer
  },
  mounted() {
    this.idHistorial = localStorage.getItem('id_historial')
    this.obtenerDatosEstudios();
  }
}
</script>