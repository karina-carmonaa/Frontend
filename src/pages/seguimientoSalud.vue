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
                <q-btn flat label="Agregar" no-caps @click="guardarMediciones" class="absolute-right"/>
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
              <div class="q-gutter-y-xs col-12 ">
                <div class="row">
                  <div class="col-11">                    
                    <q-input type="number" v-on:blur="calcularIMC" bottom-slots filled dense v-model="peso">
                      <template v-slot:before>
                        <p class="text-body2 text-black margen-p">Peso:</p>
                      </template>
                      <template v-slot:after>
                        <p class="text-body2 text-black  margen-p"> Kg</p>
                      </template>
                    </q-input>
                    <q-input type="number" v-on:blur="calcularIMC" :hint= 'feedback_estatura' hint-color="red" bottom-slots filled dense v-model="estatura">
                      <template v-slot:before>
                        <p class="text-body2 text-black margen-p">Estatura:</p>
                      </template>
                      <template v-slot:after>
                        <p class="text-body2 text-black margen-p"> m </p>                    
                      </template>
                    </q-input>
                    <q-input type="number" :hint= 'feedback_imc'  bottom-slots filled dense v-model="imc">
                      <template v-slot:before>
                        <p class="text-body2 text-black margen-p" >IMC:</p>
                      </template>
                    </q-input>                                 
                    <q-input bottom-slots filled dense v-model="azucar">
                      <template v-slot:before>
                        <p class="text-body2 text-black margen-p">Azúcar:</p>
                      </template>
                      <template v-slot:after>
                        <p class="text-body2 text-black margen-p">mg/dl</p>
                      </template>
                    </q-input>     
                    <q-input bottom-slots filled dense v-model="fre_cardiaca">
                      <template v-slot:before>
                        <p class="text-body2 text-black margen-p">Frecuencia cardiaca:</p>
                      </template>
                      <template v-slot:after>
                        <p class="text-body2 text-black margen-p">lpm</p>
                      </template>
                    </q-input> 
                    <q-input bottom-slots filled dense v-model="temperatura">
                      <template v-slot:before>
                        <p class="text-body2 text-black margen-p">Temperatura:</p>
                      </template>
                      <template v-slot:after>
                        <p class="text-body2 text-black margen-p">°C</p>
                      </template>
                    </q-input>      
                    <q-input bottom-slots filled dense v-model="oxigeno">
                      <template v-slot:before>
                        <p class="text-body2 text-black margen-p">Saturación de oxígeno:</p>
                      </template>
                      <template v-slot:after>
                        <p class="text-body2 text-black margen-p">SPO2</p>
                      </template>
                    </q-input>         
                  </div>
                  <div class="col-7">
                    <q-input bottom-slots filled v-on:blur="recomendacionPresion" dense v-model="TensionArterial">
                      <template v-slot:before>
                        <p class="text-body2 text-black margen-p">Presión arterial:</p>
                      </template>
                      <template v-slot:after>
                        <p class="text-black margen-p q-pr-xs ">/</p>
                      </template>
                    </q-input> 
                  </div>
                  <div class="col-4">
                     <q-input bottom-slots filled dense v-model="TensionArterial2" v-on:blur="recomendacionPresion">
                      <template v-slot:after>
                        <p class="text-body2 text-black margen-p">mmHg</p>
                      </template>
                    </q-input>
                  </div>                  
                  <p v-if="recomendacion" class=" text-center">Es recomendable que vaya a valoración con un médico</p>      
                </div>
                <!-- <div class="q-mx-xl q-mt-md q-px-md">
                  <q-btn class="full-width" label="Guardar" @click="guardarMediciones" no-caps rounded unelevated color="secondary" />
                </div> -->
              <div class="row justify-center col-12 q-pt-md">
                <q-btn label="Historial y gráficas" no-caps unelevated rounded padding="8px 60px" 
                @click="graficas" color="secondary" />
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
                  <q-item-section side >
                    <q-item-label class="q-pr-md"> {{datos.fecha}} </q-item-label>
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
        recomendacion: false, 
        TensionArterial: null,
        TensionArterial2: null,
        azucar: null,
        peso: null,
        estatura: null,
        ListaMedidas: null,
        imc: null,
        fecha: null,
        feedback_imc: null,
        feedback_estatura: null,
        temperatura: null,
        oxigeno: null,
        fre_cardiaca: null,
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
        //son todos null, si es así eliminamos el registro de la base de datos y luego eliminamos el dato del arreglo
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
          let respuesta = res.data.data.attributes
          if (respuesta.peso == null && respuesta.altura == null && respuesta.imc == null && 
              respuesta.presion_arterial == null && respuesta.azucar == null && 
                  respuesta.temperatura == null && respuesta.fre_cardiaca == null && respuesta.oxigeno == null) {
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
          let respuesta = res.data.data.attributes
          if (respuesta.peso == null && respuesta.altura == null && respuesta.imc == null && 
                  respuesta.presion_arterial == null && respuesta.azucar == null && 
                  respuesta.temperatura == null && respuesta.fre_cardiaca == null) {
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
          let respuesta = res.data.data.attributes
          if (respuesta.peso == null && respuesta.altura == null && respuesta.imc == null && 
                  respuesta.presion_arterial == null && respuesta.azucar == null && 
                  respuesta.temperatura == null && respuesta.fre_cardiaca == null && respuesta.oxigeno == null) {
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
              presion_arterial : null,
              presion_arterial2 : null
            }
          }
        }).then((res) => {
          let respuesta = res.data.data.attributes
          if (respuesta.peso == null && respuesta.altura == null && respuesta.imc == null && 
                  respuesta.presion_arterial == null && respuesta.azucar == null && 
                  respuesta.temperatura == null && respuesta.fre_cardiaca == null  && respuesta.oxigeno == null) {
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
          let respuesta = res.data.data.attributes
          if (respuesta.peso == null && respuesta.altura == null && respuesta.imc == null && 
                  respuesta.presion_arterial == null && respuesta.azucar == null && 
                  respuesta.temperatura == null && respuesta.fre_cardiaca == null && respuesta.oxigeno == null) {
            apiClient.delete('/api/v1/medicions/'+this.popup.id)            
          }
          this.DatosResultado.splice(this.index, 1)
        })
        }  else if (this.popup.nombre == "Temperatura") { 
          apiClient.patch("/api/v1/medicions/"+this.popup.id,{
          data: {
            type: "medicions",
            id: this.popup.id,
            attributes: {
              temperatura : null
            }
          }
        }).then((res) => {
          let respuesta = res.data.data.attributes
          if (respuesta.peso == null && respuesta.altura == null && respuesta.imc == null && 
                  respuesta.presion_arterial == null && respuesta.azucar == null && 
                  respuesta.temperatura == null && respuesta.fre_cardiaca == null && respuesta.oxigeno == null) {
            apiClient.delete('/api/v1/medicions/'+this.popup.id)            
          }
          this.DatosResultado.splice(this.index, 1)
        })
        } else if (this.popup.nombre == "Frecuencia cardiaca") { 
          apiClient.patch("/api/v1/medicions/"+this.popup.id,{
          data: {
            type: "medicions",
            id: this.popup.id,
            attributes: {
              fre_cardiaca : null
            }
          }
        }).then((res) => {
          let respuesta = res.data.data.attributes
          if (respuesta.peso == null && respuesta.altura == null && respuesta.imc == null && 
                  respuesta.presion_arterial == null && respuesta.azucar == null && 
                  respuesta.temperatura == null && respuesta.fre_cardiaca == null && respuesta.oxigeno == null) {
            apiClient.delete('/api/v1/medicions/'+this.popup.id)            
          }
          this.DatosResultado.splice(this.index, 1)
        })
        } else if (this.popup.nombre == "Saturación de oxígeno") { 
          apiClient.patch("/api/v1/medicions/"+this.popup.id,{
          data: {
            type: "medicions",
            id: this.popup.id,
            attributes: {
              oxigeno : null
            }
          }
        }).then((res) => {
          let respuesta = res.data.data.attributes
          if (respuesta.peso == null && respuesta.altura == null && respuesta.imc == null && 
                  respuesta.presion_arterial == null && respuesta.azucar == null && 
                  respuesta.temperatura == null && respuesta.fre_cardiaca == null && respuesta.oxigeno == null) {
            apiClient.delete('/api/v1/medicions/'+this.popup.id)            
          }
          this.DatosResultado.splice(this.index, 1)
        })
        }
      },
      recomendacionPresion(){
        if (this.TensionArterial2 != null && this.TensionArterial != null ) {
          if(this.TensionArterial < 90 || this.TensionArterial > 130 || 
              this.TensionArterial2 < 75 || this.TensionArterial2 > 95  ) this.recomendacion = true
            else this.recomendacion = false
        }

      },
      calcularIMC(){       
        if(this.peso != null && this.estatura != null){
          let pesoMetros = this.estatura.split("",this.estatura.length) 
          if (this.estatura.split(".").length == 1 ) {
            if ( pesoMetros.length == 2 ) this.feedback_estatura = "Metros (0."+pesoMetros[0]+pesoMetros[1]+")"
             else this.feedback_estatura = "Metros ("+pesoMetros[0]+"."+pesoMetros[1]+pesoMetros[2]+")"
          } else {
             this.feedback_estatura = null
          }
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
            || this.azucar != null || this.fre_cardiaca != null || this.temperatura != null || this.oxigeno != null){
          apiClient.post("/api/v1/medicions", {
            data: {
              type: "medicions",
              attributes:{
                //obtenemos el id que esta guardado en el localstorage
                user_id: localStorage.getItem('id_usuario'),
                altura: this.estatura,
                imc: this.imc,
                peso: this.peso,
                presion_arterial: this.TensionArterial,
                presion_arterial2: this.TensionArterial2,
                azucar: this.azucar,
                fre_cardiaca: this.fre_cardiaca,
                temperatura: this.temperatura,
                oxigeno: this.oxigeno
              }
            }
          }).then(() => {
              this.$q.notify('Mediciones guardadas'),
              this.TensionArterial = null, this.estatura = null, this.recomendacion = false,
              this.imc = null, this.peso = null, this.azucar = null, this.TensionArterial2 = null,
              this.fre_cardiaca = null, this.temperatura = null, this.oxigeno = null
              this.Datos();
          })
        }
      },
      Datos(){
        this.DatosResultado = [];
        //opciones de como queremos mostrar la feche
        let options = { month: "short", day: "numeric"};
        let idUser = localStorage.getItem('id_usuario');
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
              this.DatosResultado.push({nombre: "Presión arterial", numero: this.RespuestaApi[i].attributes.presion_arterial + 
              " / "+this.RespuestaApi[i].attributes.presion_arterial2, medida: "mmHg", fecha: fechaCreated, id: this.RespuestaApi[i].id})
            }
            if(this.RespuestaApi[i].attributes.azucar != null){
              this.DatosResultado.push({nombre: "Azúcar", numero: this.RespuestaApi[i].attributes.azucar,
              medida: "mg/dl", fecha: fechaCreated, id: this.RespuestaApi[i].id})
            }   
            if(this.RespuestaApi[i].attributes.fre_cardiaca != null){
              this.DatosResultado.push({nombre: "Frecuencia cardiaca", numero: this.RespuestaApi[i].attributes.fre_cardiaca,
              medida: "lpm", fecha: fechaCreated, id: this.RespuestaApi[i].id})
            }      
            if(this.RespuestaApi[i].attributes.temperatura != null){
              this.DatosResultado.push({nombre: "Temperatura", numero: this.RespuestaApi[i].attributes.temperatura,
              medida: "°C", fecha: fechaCreated, id: this.RespuestaApi[i].id})
            }        
            if(this.RespuestaApi[i].attributes.oxigeno != null){
              this.DatosResultado.push({nombre: "Saturación de oxígeno", numero: this.RespuestaApi[i].attributes.oxigeno,
              medida: "SPO2", fecha: fechaCreated, id: this.RespuestaApi[i].id})
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

<style lang="scss">
  .margen-p{
    margin: 0px;
  }
</style>