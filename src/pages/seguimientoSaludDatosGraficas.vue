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
          <q-item class="bg-grey-6" >
            <q-item-section avatar top >
              <q-icon name="accessibility_new" size="xl" :class="datos.color" />
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
              <q-btn size="15px" flat dense round color="grey-8" icon="delete" @click="eliminar(datos, index)" />
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
export default {
  name: 'Estudios',
  data() {
    return {
      nombreTabla: this.$route.params.tabla,
      RespuestaApi: null,
      DatosResultado: [],
      idUser: localStorage.getItem('id_usuario')
    }
  },
  methods:{
    atras(){
      this.$router.go(-1)
    },
    eliminar(datos, index){
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
            color: 'primary'
          })
          let respuesta = res.data.data.attributes
          if (respuesta.peso == null && respuesta.altura == null && respuesta.imc == null && 
              respuesta.presion_arterial == null && respuesta.azucar == null &&
                  respuesta.fre_cardiaca == null && respuesta.oxigeno == null && respuesta.temperatura) {
            apiClient.delete('/api/v1/medicions/'+datos.id)            
          }
          this.DatosResultado.splice(index, 1)
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
          let respuesta = res.data.data.attributes
          if (respuesta.peso == null && respuesta.altura == null && respuesta.imc == null && 
                  respuesta.presion_arterial == null && respuesta.azucar == null &&
                  respuesta.fre_cardiaca == null && respuesta.oxigeno == null && respuesta.temperatura) {
            apiClient.delete('/api/v1/medicions/'+datos.id)            
          }
          this.DatosResultado.splice(index, 1)
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
          let respuesta = res.data.data.attributes
          if (respuesta.peso == null && respuesta.altura == null && respuesta.imc == null && 
                  respuesta.presion_arterial == null && respuesta.azucar == null &&
                  respuesta.fre_cardiaca == null && respuesta.oxigeno == null && respuesta.temperatura) {
            apiClient.delete('/api/v1/medicions/'+datos.id)            
          }
          this.DatosResultado.splice(index, 1)
        })
        } else if (datos.nombre == "Presión arterial") { 
          apiClient.patch("/api/v1/medicions/"+datos.id,{
          data: {
            type: "medicions",
            id: datos.id,
            attributes: {
              presion_arterial : null,
              presion_arterial2: null
            }
          }
        }).then((res) => {
          let respuesta = res.data.data.attributes
          if (respuesta.peso == null && respuesta.altura == null && respuesta.imc == null && 
                  respuesta.presion_arterial == null && respuesta.azucar == null &&
                  respuesta.fre_cardiaca == null && respuesta.oxigeno == null && respuesta.temperatura) {
            apiClient.delete('/api/v1/medicions/'+datos.id)            
          }
          this.DatosResultado.splice(index, 1)
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
          let respuesta = res.data.data.attributes
          if (respuesta.peso == null && respuesta.altura == null && respuesta.imc == null && 
                  respuesta.presion_arterial == null && respuesta.azucar == null &&
                  respuesta.fre_cardiaca == null && respuesta.oxigeno == null && respuesta.temperatura) {
            apiClient.delete('/api/v1/medicions/'+datos.id)            
          }
          this.DatosResultado.splice(index, 1)
        })
        }  
        else if (datos.nombre == "Saturación de oxígeno") { 
          apiClient.patch("/api/v1/medicions/"+datos.id,{
          data: {
            type: "medicions",
            id: datos.id,
            attributes: {
              oxigeno : null
            }
          }
        }).then((res) => {
          let respuesta = res.data.data.attributes
          if (respuesta.peso == null && respuesta.altura == null && respuesta.imc == null && 
                  respuesta.presion_arterial == null && respuesta.azucar == null &&
                  respuesta.fre_cardiaca == null && respuesta.oxigeno == null && respuesta.temperatura) {
            apiClient.delete('/api/v1/medicions/'+datos.id)            
          }
          this.DatosResultado.splice(index, 1)
        })
        }  
        else if (datos.nombre == "Frecuencia cardiaca") { 
          apiClient.patch("/api/v1/medicions/"+datos.id,{
          data: {
            type: "medicions",
            id: datos.id,
            attributes: {
              fre_cardiaca : null
            }
          }
        }).then((res) => {
          let respuesta = res.data.data.attributes
          if (respuesta.peso == null && respuesta.altura == null && respuesta.imc == null && 
                  respuesta.presion_arterial == null && respuesta.azucar == null &&
                  respuesta.fre_cardiaca == null && respuesta.oxigeno == null && respuesta.temperatura) {
            apiClient.delete('/api/v1/medicions/'+datos.id)            
          }
          this.DatosResultado.splice(index, 1)
        })
        }  
        else if (datos.nombre == "Temperatura") { 
          apiClient.patch("/api/v1/medicions/"+datos.id,{
          data: {
            type: "medicions",
            id: datos.id,
            attributes: {
              temperatura : null
            }
          }
        }).then((res) => {
          let respuesta = res.data.data.attributes
          if (respuesta.peso == null && respuesta.altura == null && respuesta.imc == null && 
                  respuesta.presion_arterial == null && respuesta.azucar == null &&
                  respuesta.fre_cardiaca == null && respuesta.oxigeno == null && respuesta.temperatura) {
            apiClient.delete('/api/v1/medicions/'+datos.id)            
          }
          this.DatosResultado.splice(index, 1)
        })
        }  
    },
    DatosTablas(){
      if (this.nombreTabla == "presión arterial") {        
        apiClient.get("/api/v1/users/"+this.idUser+"/medicions").then((res) => {
          this.RespuestaApi = res.data.data
          for (let i = 0; i < this.RespuestaApi.length; i++) {
            let fechaCreated = new Date(this.RespuestaApi[i].attributes.created_at).toLocaleDateString("es-MX", options)
            if(this.RespuestaApi[i].attributes.presion_arterial != null){
              if (fechaCreated.length == 6) {
                let dia = fechaCreated.split(' ')
                fechaCreated = "0"+dia[0]+" "+dia[1]
              }
              this.DatosResultado.push({nombre: "Presión arterial", numero: this.RespuestaApi[i].attributes.presion_arterial +
              " / "+ this.RespuestaApi[i].attributes.presion_arterial2, medida: "mmHg", fecha: fechaCreated, id: this.RespuestaApi[i].id,
              color: "colorPreArte"})
            }       
          }
        })        
      } else if (this.nombreTabla == "peso") {    
        apiClient.get("/api/v1/users/"+this.idUser+"/medicions").then((res) => {
          this.RespuestaApi = res.data.data
          for (let i = 0; i < this.RespuestaApi.length; i++) {
            let fechaCreated = new Date(this.RespuestaApi[i].attributes.created_at).toLocaleDateString("es-MX", options)
            if(this.RespuestaApi[i].attributes.peso != null){
              if (fechaCreated.length == 6) {
                let dia = fechaCreated.split(' ')
                fechaCreated = "0"+dia[0]+" "+dia[1]
              }
              this.DatosResultado.push({nombre: "Peso", numero: this.RespuestaApi[i].attributes.peso,
              medida: "kg", fecha: fechaCreated, id: this.RespuestaApi[i].id, color: "colorPeso"})
            }    
          }
        })                
      } else  if (this.nombreTabla == "azúcar") {  
        apiClient.get("/api/v1/users/"+this.idUser+"/medicions").then((res) => {
          this.RespuestaApi = res.data.data
          for (let i = 0; i < this.RespuestaApi.length; i++) {
            let fechaCreated = new Date(this.RespuestaApi[i].attributes.created_at).toLocaleDateString("es-MX", options)
            if(this.RespuestaApi[i].attributes.azucar != null){
              if (fechaCreated.length == 6) {
                let dia = fechaCreated.split(' ')
                fechaCreated = "0"+dia[0]+" "+dia[1]
              }
              this.DatosResultado.push({nombre: "Azúcar", numero: this.RespuestaApi[i].attributes.azucar,
              medida: "mg/dl", fecha: fechaCreated, id: this.RespuestaApi[i].id, color:"colorAzucar"})
            }    
          }
        })                        
      } else if (this.nombreTabla == "IMC") {
        apiClient.get("/api/v1/users/"+this.idUser+"/medicions").then((res) => {
          this.RespuestaApi = res.data.data
          for (let i = 0; i < this.RespuestaApi.length; i++) {
            let fechaCreated = new Date(this.RespuestaApi[i].attributes.created_at).toLocaleDateString("es-MX", options)
            if(this.RespuestaApi[i].attributes.imc != null){
              if (fechaCreated.length == 6) {
                let dia = fechaCreated.split(' ')
                fechaCreated = "0"+dia[0]+" "+dia[1]
              }
              this.DatosResultado.push({nombre: "IMC", numero: this.RespuestaApi[i].attributes.imc,
              medida: " ", fecha: fechaCreated, id: this.RespuestaApi[i].id, color: "colorIMC"})
            }    
          }
        })    
      }  else if (this.nombreTabla == "frecuencia cardiaca") {
        apiClient.get("/api/v1/users/"+this.idUser+"/medicions").then((res) => {
          this.RespuestaApi = res.data.data
          for (let i = 0; i < this.RespuestaApi.length; i++) {
            let fechaCreated = new Date(this.RespuestaApi[i].attributes.created_at).toLocaleDateString("es-MX", options)
            if(this.RespuestaApi[i].attributes.fre_cardiaca != null){
              if (fechaCreated.length == 6) {
                let dia = fechaCreated.split(' ')
                fechaCreated = "0"+dia[0]+" "+dia[1]
              }
              this.DatosResultado.push({nombre: "Frecuencia cardiaca", numero: this.RespuestaApi[i].attributes.fre_cardiaca,
              medida: "lpm", fecha: fechaCreated, id: this.RespuestaApi[i].id, color: "colorFreCar"})
            }    
          }
        })    
      }  else if (this.nombreTabla == "saturación de oxígeno") {
        apiClient.get("/api/v1/users/"+this.idUser+"/medicions").then((res) => {
          this.RespuestaApi = res.data.data
          for (let i = 0; i < this.RespuestaApi.length; i++) {
            let fechaCreated = new Date(this.RespuestaApi[i].attributes.created_at).toLocaleDateString("es-MX", options)
            if(this.RespuestaApi[i].attributes.oxigeno != null){
              if (fechaCreated.length == 6) {
                let dia = fechaCreated.split(' ')
                fechaCreated = "0"+dia[0]+" "+dia[1]
              }
              this.DatosResultado.push({nombre: "Saturación de oxígeno", numero: this.RespuestaApi[i].attributes.oxigeno,
              medida: "SPO2", fecha: fechaCreated, id: this.RespuestaApi[i].id, color: "colorOxigeno"})
            }    
          }
        })    
      }  else if (this.nombreTabla == "temperatura") {
        apiClient.get("/api/v1/users/"+this.idUser+"/medicions").then((res) => {
          this.RespuestaApi = res.data.data
          for (let i = 0; i < this.RespuestaApi.length; i++) {
            let fechaCreated = new Date(this.RespuestaApi[i].attributes.created_at).toLocaleDateString("es-MX", options)
            if(this.RespuestaApi[i].attributes.temperatura != null){
              if (fechaCreated.length == 6) {
                let dia = fechaCreated.split(' ')
                fechaCreated = "0"+dia[0]+" "+dia[1]
              }
              this.DatosResultado.push({nombre: "Temperatura", numero: this.RespuestaApi[i].attributes.temperatura,
              medida: " ", fecha: fechaCreated, id: this.RespuestaApi[i].id, color:"colorTempe"})
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
    this.DatosTablas();
  }
}
</script>

<style lang="scss">
  .q-item-type{
    padding-left: 0px;
  }
</style>