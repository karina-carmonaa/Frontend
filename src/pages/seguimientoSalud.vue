<template>
    <div class="bg-paginas">
        <q-layout view="lHh Lpr lff" class="shadow-2 rounded-borders">
            <q-header class="bg-cyan-8 q-px-sm q-pt-md q-mb-md">
              <q-toolbar>
                <q-btn flat  dense size="sm" round @click="atras" class="platform-ios-only"
                  icon="arrow_back_ios"
                />
                <q-btn flat  dense size="sm" round @click="atras" class="platform-android-only"
                  icon="arrow_back"
                />
                <span class="q-subtitle-1 absolute-center ">
                  Seguimiento de salud
                </span>
                <!-- <q-btn flat label="Recordar" no-caps @click="Recordatorio" class="absolute-right"/> -->
              </q-toolbar>
            </q-header>
            <q-page-container class="row q-ma-lg">
              <div class="text-center column">
                <p class="text-h6 text-black">Hoy <span>
                  <label class="text-body2"> {{fecha}} </label>                  
                </span></p>
              </div>
              <br/>
              <div class="q-gutter-y-xs col-12">
                <q-input bottom-slots filled dense v-model="TensionArterial">
                  <template v-slot:before>
                    <p class="text-body2 text-black">Tensión arterial:</p>
                  </template>
                </q-input>   
                <q-input bottom-slots filled dense v-model="azucar">
                  <template v-slot:before>
                    <p class="text-body2 text-black col-12">Azúcar:</p>
                  </template>
                </q-input>
                <q-input type="number" v-on:blur="calcularIMC" bottom-slots filled dense v-model="peso">
                  <template v-slot:before>
                    <p class="text-body2 text-black" >Peso:</p>
                  </template>
                  <template v-slot:after>
                    <p class="text-body2 text-black q-mr-xl q-pr-sm"> Kg</p>
                  </template>
                </q-input>
                <q-input type="number" v-on:blur="calcularIMC" bottom-slots filled dense v-model="estatura">
                  <template v-slot:before>
                    <p class="text-body2 text-black">Estatura:</p>
                  </template>
                  <template v-slot:after>
                    <p class="text-body2 text-black q-mr-xl q-pr-xl"> m </p>                    
                  </template>
                </q-input>
                <q-input type="number" class="q-mr-xl q-pr-xl" :hint= 'feedback_imc'  bottom-slots filled dense v-model="imc">
                  <template v-slot:before>
                    <p class="text-body2 text-black" >IMC:</p>
                  </template>
                </q-input>
                <div class="q-mx-xl q-mt-md q-px-md">
                  <q-btn class="full-width" label="Guardar" @click="guardarMediciones" no-caps rounded unelevated color="secondary" />
                </div>
              </div>
              <div class="text-center q-mt-md column">
                <p class="text-h6 text-black">Medidas recientes</p>
              </div><!-- v-for="medida in ListaMedidas" :key="medida" -->
              <q-list bordered padding separator dense class="col-12" v-for="(datos, index) in DatosResultado" :key="index" >
                <q-slide-item class="bg-grey-6">
                  <q-item clickable v-ripple @click="activarDialog(datos,index)" >
                    <q-item-section class="col-2">
                      <q-icon name="accessibility_new" size="xl"/>
                    </q-item-section>
                  <q-item-section >
                    <q-item-label lines="1">{{datos.nombre}}</q-item-label>
                    <q-item-label caption> {{datos.numero}}  <span> {{datos.medida}} </span></q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label> {{datos.fecha}} <span>
                      <q-icon name="keyboard_arrow_right" size="xs" />                    
                    </span></q-item-label>
                  </q-item-section>
                </q-item>
                </q-slide-item>
              </q-list>      
              <q-dialog v-model="dialog" persistent>
                <q-card>
                  <q-card-section class="row items-center">
                    <q-avatar icon="accessibility_new" color="primary" text-color="white" />
                    <span class="q-ml-sm">{{popup.nombre}} - {{ popup.numero}} {{popup.medida}} </span> 
                  </q-card-section>

                  <!-- Notice v-close-popup -->
                  <q-card-actions align="right">
                    <q-btn flat label="Cancelar" color="primary" v-close-popup/>
                    <q-btn flat label="Eliminar" color="red" v-close-popup @click="elimanarDatos" />
                  </q-card-actions>
                </q-card>
              </q-dialog>
              <div class="row justify-center col-12 q-pt-md">
                <q-btn label="Historial y gráficas" no-caps unelevated rounded padding="8px 60px" 
                @click="graficas" color="secondary" />
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
import { date } from 'quasar'
import apiClient from '../service/api.js';
export default {
    name: 'seguimientoSalud',
    data() {
      return {
        dialog: false,
        TensionArterial: null,
        azucar: null,
        peso: null,
        estatura: null,
        ListaMedidas: null,
        imc: null,
        fecha: null,
        feedback_imc: null,
        temperatura: null,
        RespuestaApi: null,
        DatosResultado: [],
        popup: [],
        index: null
      }
    },
    methods:{
      atras(){
        this.$router.go(-1)
      },
      Recordatorio(){
      },
      //eliminar la medida
      activarDialog(datos, index){
        this.popup = datos
        //guardamos el index del arreglo  para poder eliminarlo si selecciona la opción
        this.index = index
        //me permite mostrar el dialogo para eliminar o cancelar
        this.dialog= true;
      },
      elimanarDatos(){      
        //eliminamos los datos con el id que esta en el arreglo popup, luego vemos si la respuesta que regresa
        //son todos null, si es así eliminamos el registro de la base de datos
        if (this.popup.nombre == "Peso") { 
          apiClient.patch("/api/v1/medicions/"+this.popup.id,{
          data: {
            type: "medicions",
            id: this.popup.id,
            attributes: {
              peso : null
            }
          }
        }).then((res) => {
          this.$q.notify({
            message: 'Medición eliminada',
            color: 'cyan-8'
          })
          let respuesta = res.data.data.attributes
          if (respuesta.peso == null && respuesta.altura == null && respuesta.imc == null && 
              respuesta.presion_arterial == null && respuesta.azucar == null) {
            apiClient.delete('/api/v1/medicions/'+this.popup.id)            
          }
          this.DatosResultado.splice(this.index, 1)
        })
        } else if (this.popup.nombre == "Altura") { 
          apiClient.patch("/api/v1/medicions/"+this.popup.id,{
          data: {
            type: "medicions",
            id: this.popup.id,
            attributes: {
              altura : null
            }
          }
        }).then((res) => {
          this.$q.notify('Medición eliminada')
          let respuesta = res.data.data.attributes
          if (respuesta.peso == null && respuesta.altura == null && respuesta.imc == null && 
                  respuesta.presion_arterial == null && respuesta.azucar == null) {
            apiClient.delete('/api/v1/medicions/'+this.popup.id)            
          }
          this.DatosResultado.splice(this.index, 1)
        })
        } else if (this.popup.nombre == "IMC") { 
          apiClient.patch("/api/v1/medicions/"+this.popup.id,{
          data: {
            type: "medicions",
            id: this.popup.id,
            attributes: {
              imc : null
            }
          }
        }).then((res) => {
          this.$q.notify('Medición eliminada')
          let respuesta = res.data.data.attributes
          if (respuesta.peso == null && respuesta.altura == null && respuesta.imc == null && 
                  respuesta.presion_arterial == null && respuesta.azucar == null) {
            apiClient.delete('/api/v1/medicions/'+this.popup.id)            
          }
          this.DatosResultado.splice(this.index, 1)
        })
        } else if (this.popup.nombre == "Presión arterial") { 
          apiClient.patch("/api/v1/medicions/"+this.popup.id,{
          data: {
            type: "medicions",
            id: this.popup.id,
            attributes: {
              presion_arterial : null
            }
          }
        }).then((res) => {
          this.$q.notify('Medición eliminada')
          let respuesta = res.data.data.attributes
          if (respuesta.peso == null && respuesta.altura == null && respuesta.imc == null && 
                  respuesta.presion_arterial == null && respuesta.azucar == null) {
            apiClient.delete('/api/v1/medicions/'+this.popup.id)            
          }
          this.DatosResultado.splice(this.index, 1)
        })
        }  else if (this.popup.nombre == "Azúcar") { 
          apiClient.patch("/api/v1/medicions/"+this.popup.id,{
          data: {
            type: "medicions",
            id: this.popup.id,
            attributes: {
              azucar : null
            }
          }
        }).then((res) => {
          this.$q.notify('Medición eliminada')
          let respuesta = res.data.data.attributes
          if (respuesta.peso == null && respuesta.altura == null && respuesta.imc == null && 
                  respuesta.presion_arterial == null && respuesta.azucar == null) {
            apiClient.delete('/api/v1/medicions/'+this.popup.id)            
          }
          this.DatosResultado.splice(this.index, 1)
        })
        }  

      },
      calcularIMC(){
        if(this.peso != null && this.estatura != null){
          this.imc = (this.peso / ((this.estatura)*(this.estatura))).toFixed(2)
          if(this.imc < 18.5) this.feedback_imc = "Bajo peso"
          if(this.imc >= 18.5 && this.imc <= 24.9) this.feedback_imc = "Normal"
          if(this.imc >= 25 && this.imc <= 29.9) this.feedback_imc = "Sobrepeso"
          if(this.imc >= 30) this.feedback_imc = "Obeso"
        }
      },
      graficas(){
        this.$router.push("/seguimientoGraficas");
      },
      fechaActual(){
        let [month, date, year]    = ( new Date() ).toLocaleDateString().split("/")
        if(month.length == 1){ month = "0"+month }
        if(date.length == 1){ date = "0"+date }
        this.fecha = month + "-" + date + "-" + year;         
      },
      guardarMediciones(){
        if(this.estatura != null || this.imc != null || this.peso != null || this.TensionArterial != null
            || this.azucar != null){
          apiClient.post("/api/v1/medicions", {
            data: {
              type: "medicions",
              attributes:{
                //obtenemos el id que esta guardado en el localstorage
                user_id: JSON.parse(localStorage.getItem('id_usuario')),
                altura: this.estatura,
                imc: this.imc,
                peso: this.peso,
                presion_arterial: this.TensionArterial,
                azucar: this.azucar
              }
            }
          }).then(() => {
              this.$q.notify('Mediciones guardadas'),
              this.TensionArterial = null, this.estatura = null,
              this.imc = null, this.peso = null, this.azucar = null
              this.Datos();
          })
        }
      },
      Datos(){
        this.DatosResultado = [];
        //opciones de como queremos mostrar la feche
        let options = { month: "short", day: "numeric"};
        let idUser = JSON.parse(localStorage.getItem('id_usuario'));
        //filtro para encontrar todas las mediciones segun el id del usuario
        apiClient.get("/api/v1/medicions?filter[user_id]="+idUser).then((res) => {
          //almacenamos las respuestas en el array RespuestasApi
          this.RespuestaApi = res.data.data
          for (let i = 0; i < this.RespuestaApi.length; i++) {
            let fechaCreated = new Date(this.RespuestaApi[i].attributes.created_at).toLocaleDateString("es-MX", options)
            //acomodamos las respeuestas para mostrarlas en ese orden, sino tiene valor esa columna se pasa a la siguiente de la fila
            // y todo se almacena en el array DatosResultado
            if(this.RespuestaApi[i].attributes.altura != null){
              this.DatosResultado.push({nombre: "Altura", numero: this.RespuestaApi[i].attributes.altura,
              medida: "m", fecha: fechaCreated, id: this.RespuestaApi[i].id})
            }
            if(this.RespuestaApi[i].attributes.imc != null){
              this.DatosResultado.push({nombre: "IMC", numero: this.RespuestaApi[i].attributes.imc,
              medida: " ", fecha: fechaCreated, id: this.RespuestaApi[i].id})
            }
            if(this.RespuestaApi[i].attributes.peso != null){
              this.DatosResultado.push({nombre: "Peso", numero: this.RespuestaApi[i].attributes.peso,
              medida: "kg", fecha: fechaCreated, id: this.RespuestaApi[i].id})
            }
            if(this.RespuestaApi[i].attributes.presion_arterial != null){
              this.DatosResultado.push({nombre: "Presión arterial", numero: this.RespuestaApi[i].attributes.presion_arterial,
              medida: " ", fecha: fechaCreated, id: this.RespuestaApi[i].id})
            }
            if(this.RespuestaApi[i].attributes.azucar != null){
              this.DatosResultado.push({nombre: "Azúcar", numero: this.RespuestaApi[i].attributes.azucar,
              medida: " ", fecha: fechaCreated, id: this.RespuestaApi[i].id})
            }            
          }
        })
      },
    },
    //se cargan los datos y la fecha antes de cargar con la página completa, para mostrar mejor los resultados
    mounted() {
      this.fechaActual();
      this.Datos();
    },
  components: {
    Footer
  }
}
</script>