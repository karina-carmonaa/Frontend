<template>
  <div class="bg-paginas">
    <q-layout view="lHh Lpr lff" class="shadow-2 rounded-borders">
      <q-header class="bg-cyan-8 q-px-sm q-pt-md q-mb-md">
        <q-toolbar>
          <q-btn flat  dense size="sm" round @click="atras" class="platform-ios-only"
            icon="arrow_back_ios"/>
          <q-btn flat  dense size="sm" round @click="atras" class="platform-android-only"
            icon="arrow_back" />
          <span class="q-subtitle-2 absolute-center ">
            Datos {{nombreTabla}}
          </span>
        </q-toolbar>
      </q-header>
      <q-page-container class="row q-ma-lg">         
        <q-list class="col-12" bordered padding separator v-for="(datos, index) in DatosResultado" :key="index" >
          <q-item >
            <q-item-section avatar top >
              <q-icon name="accessibility_new" size="xl"/>
            </q-item-section>
            <q-item-section top>
              <q-item-label lines="1">
                <span class="text-weight-medium">{{datos.nombre}}</span>
                <span class="text-grey-8 q-pl-sm">{{datos.fecha}}</span> 
              </q-item-label>             
              <q-item-label caption lines="1">
                {{datos.numero}}  <span> {{datos.medida}} </span>
              </q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-btn size="15px" flat dense round color="grey-8" icon="delete" @click="eliminar(datos)" />
            </q-item-section>
          </q-item>
        </q-list>      
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

let options = { month: "short", day: "numeric"};
let idUser = JSON.parse(localStorage.getItem('id_usuario'));
export default {
  name: 'Estudios',
  data() {
    return {
      nombreTabla: this.$route.params.tabla,
      RespuestaApi: null,
      DatosResultado: [],
    }
  },
  methods:{
    atras(){
      this.$router.go(-1)
    },
    eliminar(datos){
      if (datos.nombre == "Peso") { 
          apiClient.patch("/api/v1/medicions/"+datos.id,{
          data: {
            type: "medicions",
            id: datos.id,
            attributes: {
              peso : null
            }
          }
        }).then((res) => {
          this.$q.notify({
            message: 'Medición eliminada',
            color: primary
          })
          let respuesta = res.data.data.attributes
          if (respuesta.peso == null && respuesta.altura == null && respuesta.imc == null && 
              respuesta.presion_arterial == null && respuesta.azucar == null) {
            apiClient.delete('/api/v1/medicions/'+datos.id)            
          }
          this.DatosTablas();
        })
        } else if (datos.nombre == "Altura") { 
          apiClient.patch("/api/v1/medicions/"+datos.id,{
          data: {
            type: "medicions",
            id: datos.id,
            attributes: {
              altura : null
            }
          }
        }).then((res) => {
          this.$q.notify('Medición eliminada')
          let respuesta = res.data.data.attributes
          if (respuesta.peso == null && respuesta.altura == null && respuesta.imc == null && 
                  respuesta.presion_arterial == null && respuesta.azucar == null) {
            apiClient.delete('/api/v1/medicions/'+datos.id)            
          }
          this.DatosTablas();
        })
        } else if (datos.nombre == "IMC") { 
          apiClient.patch("/api/v1/medicions/"+datos.id,{
          data: {
            type: "medicions",
            id: datos.id,
            attributes: {
              imc : null
            }
          }
        }).then((res) => {
          this.$q.notify('Medición eliminada')
          let respuesta = res.data.data.attributes
          if (respuesta.peso == null && respuesta.altura == null && respuesta.imc == null && 
                  respuesta.presion_arterial == null && respuesta.azucar == null) {
            apiClient.delete('/api/v1/medicions/'+datos.id)            
          }
          this.DatosTablas();
        })
        } else if (datos.nombre == "Presión arterial") { 
          apiClient.patch("/api/v1/medicions/"+datos.id,{
          data: {
            type: "medicions",
            id: datos.id,
            attributes: {
              presion_arterial : null
            }
          }
        }).then((res) => {
          this.$q.notify('Medición eliminada')
          let respuesta = res.data.data.attributes
          if (respuesta.peso == null && respuesta.altura == null && respuesta.imc == null && 
                  respuesta.presion_arterial == null && respuesta.azucar == null) {
            apiClient.delete('/api/v1/medicions/'+datos.id)            
          }
          this.DatosTablas();
        })
        }  else if (datos.nombre == "Azúcar") { 
          apiClient.patch("/api/v1/medicions/"+datos.id,{
          data: {
            type: "medicions",
            id: datos.id,
            attributes: {
              azucar : null
            }
          }
        }).then((res) => {
          this.$q.notify('Medición eliminada')
          let respuesta = res.data.data.attributes
          if (respuesta.peso == null && respuesta.altura == null && respuesta.imc == null && 
                  respuesta.presion_arterial == null && respuesta.azucar == null) {
            apiClient.delete('/api/v1/medicions/'+datos.id)            
          }
          this.DatosTablas();
        })
        }  
    },
    DatosTablas(){
      this.DatosResultado = []
      if (this.nombreTabla == "presión arterial") {        
        apiClient.get("/api/v1/medicions?filter[user_id]="+idUser).then((res) => {
          this.RespuestaApi = res.data.data
          for (let i = 0; i < this.RespuestaApi.length; i++) {
            let fechaCreated = new Date(this.RespuestaApi[i].attributes.created_at).toLocaleDateString("es-MX", options)
            if(this.RespuestaApi[i].attributes.presion_arterial != null){
              if (fechaCreated.length == 6) {
                let dia = fechaCreated.split(' ')
                fechaCreated = "0"+dia[0]+" "+dia[1]
              }
              this.DatosResultado.push({nombre: "Presión arterial", numero: this.RespuestaApi[i].attributes.presion_arterial,
              medida: " ", fecha: fechaCreated, id: this.RespuestaApi[i].id})
            }       
          }
        })        
      } else if (this.nombreTabla == "peso") {    
        apiClient.get("/api/v1/medicions?filter[user_id]="+idUser).then((res) => {
          this.RespuestaApi = res.data.data
          for (let i = 0; i < this.RespuestaApi.length; i++) {
            let fechaCreated = new Date(this.RespuestaApi[i].attributes.created_at).toLocaleDateString("es-MX", options)
            if(this.RespuestaApi[i].attributes.peso != null){
              if (fechaCreated.length == 6) {
                let dia = fechaCreated.split(' ')
                fechaCreated = "0"+dia[0]+" "+dia[1]
              }
              this.DatosResultado.push({nombre: "Peso", numero: this.RespuestaApi[i].attributes.peso,
              medida: "kg", fecha: fechaCreated, id: this.RespuestaApi[i].id})
            }    
          }
        })                
      } else  if (this.nombreTabla == "azúcar") {  
        apiClient.get("/api/v1/medicions?filter[user_id]="+idUser).then((res) => {
          this.RespuestaApi = res.data.data
          for (let i = 0; i < this.RespuestaApi.length; i++) {
            let fechaCreated = new Date(this.RespuestaApi[i].attributes.created_at).toLocaleDateString("es-MX", options)
            if(this.RespuestaApi[i].attributes.azucar != null){
              if (fechaCreated.length == 6) {
                let dia = fechaCreated.split(' ')
                fechaCreated = "0"+dia[0]+" "+dia[1]
              }
              this.DatosResultado.push({nombre: "Azúcar", numero: this.RespuestaApi[i].attributes.azucar,
              medida: " ", fecha: fechaCreated, id: this.RespuestaApi[i].id})
            }    
          }
        })                        
      } else if (this.nombreTabla == "IMC") {
        apiClient.get("/api/v1/medicions?filter[user_id]="+idUser).then((res) => {
          this.RespuestaApi = res.data.data
          for (let i = 0; i < this.RespuestaApi.length; i++) {
            let fechaCreated = new Date(this.RespuestaApi[i].attributes.created_at).toLocaleDateString("es-MX", options)
            if(this.RespuestaApi[i].attributes.imc != null){
              if (fechaCreated.length == 6) {
                let dia = fechaCreated.split(' ')
                fechaCreated = "0"+dia[0]+" "+dia[1]
              }
              this.DatosResultado.push({nombre: "IMC", numero: this.RespuestaApi[i].attributes.imc,
              medida: " ", fecha: fechaCreated, id: this.RespuestaApi[i].id})
            }    
          }
        })    
      }       
    }
  },
  components: {
    Footer
  },
  mounted(){
    this.DatosTablas()
  }
}
</script>

<style lang="scss">
  .q-item-type{
    padding-left: 0px;
  }
</style>