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
                  Gráficas
                </span>
                <!-- <q-btn flat label="Agregar datos" no-caps @click="agregar" class="absolute-right q-subtitle-1"/> -->
              </q-toolbar>
            </q-header>
            <q-page-container class="q-ma-lg flex column">
              <div class="text-center col"> 
                <div class="text-center col" v-if="CargaPeso">
                  <line-chart :chartData="chartdataPeso"
                  :options="options" class="graficas"/>
                  <q-item v-ripple clickable @click="MostrarDatos('peso')" class="bg-yellow-7">
                    <q-item-section>
                      <q-item-label> Mostrar todos los datos </q-item-label>
                    </q-item-section>
                    <q-item-section class="col-2">
                      <q-icon name="keyboard_arrow_right" size="sm" />
                    </q-item-section>
                  </q-item>  
                </div>  
                <br /><br />
                <div class="text-center col" v-if="CargaIMC">
                  <line-chart :chartData="chartdataIMC"
                  :options="options" class="graficas"/>
                  <q-item v-ripple clickable @click="MostrarDatos('IMC')" class="bg-orange-6">
                    <q-item-section>
                      <q-item-label> Mostrar todos los datos </q-item-label>
                    </q-item-section>
                    <q-item-section class="col-2">
                      <q-icon name="keyboard_arrow_right" size="sm" />
                    </q-item-section>
                  </q-item>  
                </div>    
                <br /><br />
                <div class="text-center col" v-if="CargaAzucar">
                  <line-chart :chartData="chartdataAzucar"
                  :options="options" class="graficas"/>
                  <q-item v-ripple clickable @click="MostrarDatos('azúcar')" class="bg-deep-orange-6">
                    <q-item-section>
                      <q-item-label> Mostrar todos los datos </q-item-label>
                    </q-item-section>
                    <q-item-section class="col-2">
                      <q-icon name="keyboard_arrow_right" size="sm" />
                    </q-item-section>
                  </q-item>  
                </div>  
                <br /><br />
                <div class="text-center col" v-if="CargaFreCar">
                  <line-chart :chartData="chartdataFreCar" :options="options" class="graficas"/>
                  <q-item class="bg-pink-5" clickable @click="MostrarDatos('frecuencia cardiaca')">
                    <q-item-section>
                      <q-item-label>Mostrar todos los datos</q-item-label>
                    </q-item-section>
                    <q-item-section class="col-2">
                      <q-icon name="keyboard_arrow_right" size="sm" />
                    </q-item-section>
                  </q-item>
                </div>   
                <br /><br />
                <div class="text-center col" v-if="CargaTemp">
                  <line-chart :chartData="chartdataTemp" :options="options" class="graficas"/>
                  <q-item class="bg-purple-7" clickable @click="MostrarDatos('temperatura')">
                    <q-item-section>
                      <q-item-label>Mostrar todos los datos</q-item-label>
                    </q-item-section>
                    <q-item-section class="col-2">
                      <q-icon name="keyboard_arrow_right" size="sm" />
                    </q-item-section>
                  </q-item>
                </div>  
                <br /><br />
                <div class="text-center col" v-if="CargaOxigeno">
                  <line-chart :chartData="chartdataOxigeno" :options="options" class="graficas"/>
                  <q-item class="bg-deep-purple-8" clickable @click="MostrarDatos('saturación de oxígeno')">
                    <q-item-section>
                      <q-item-label>Mostrar todos los datos</q-item-label>
                    </q-item-section>
                    <q-item-section class="col-2">
                      <q-icon name="keyboard_arrow_right" size="sm" />
                    </q-item-section>
                  </q-item>
                </div>   
                <br /><br />
                <div class="text-center col" v-if="CargaTension">
                  <line-chart :chartData="chartdataTension"
                  :options="options" class="graficas"/>
                  <q-item v-ripple clickable @click="MostrarDatos('presión arterial')" class="bg-indigo-8">
                    <q-item-section>
                      <q-item-label> Mostrar todos los datos </q-item-label>
                    </q-item-section>
                      <q-item-section class="col-2">
                      <q-icon name="keyboard_arrow_right" size="sm" />
                    </q-item-section>
                  </q-item>  
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
import LineChart from 'components/LineChart.vue'
import apiClient from '../service/api.js';

let dataRespuestaPeso = new Array();
let dataRespuestaTension = new Array();
let dataRespuestaIMC = new Array();
let dataRespuestaAzucar = new Array();
let dataRespuestaOxigeno= new Array();
let dataRespuestaTemp = new Array();
let dataRespuestaFreCar = new Array();
let options = { month: "short", day: "numeric"};
export default {
    name: 'seguimientoSaludGraficas',
    mounted () {
      this.idUser = localStorage.getItem('id_usuario')
      this.cargarDatosGrafica();      
    },
    data() {
      return {
        idUser: null,
        CargaPeso: false,
        CargaTension: false,
        CargaIMC: false,
        CargaAzucar: false,
        CargaOxigeno: false,
        CargaTemp: false,
        CargaFreCar: false,
        respuesta: null,
        chartdataPeso: {
          labels: [],
          datasets: [{
            label: 'Peso',
            backgroundColor: '#FC2525',
            borderColor: '#ebe706',
            data: dataRespuestaPeso,           
				    fill: false
          }]
        },
        chartdataTension: {
          labels: [],
          datasets: [{
            label: 'Presión arterial',
            backgroundColor: '#FC2525',
            borderColor: ' #1b1b5c',
            data: dataRespuestaTension,           
				    fill: false
          }]
        },
        chartdataAzucar: {
          labels: [],
          datasets: [{
            label: 'Azucar',
            backgroundColor: '#FC2525',
            borderColor: ' #f86356',
            data: dataRespuestaAzucar,           
				    fill: false
          }]
        },
        chartdataIMC: {
          labels: [],
          datasets: [{
            label: 'IMC',
            backgroundColor: '#FC2525',
            borderColor: '#ff9342',
            data: dataRespuestaIMC,           
				    fill: false
          }]
        },
        chartdataOxigeno:{
          labels:[],
          datasets: [{
            label: 'Saturación de oxígeno',
            backgroundColor: '#FC2525',
            borderColor: ' #63206c',
            data: dataRespuestaOxigeno,
            fill: false
          }]
        },
        chartdataFreCar: {
          labels: [],
          datasets: [{
            label: 'Frecuencia cardiaca',
            backgroundColor: '#FC2525',
            borderColor: '#d33d66',
            data: dataRespuestaFreCar,           
				    fill: false
          }]
        },
        chartdataTemp: {
          labels: [],
          datasets: [{
            label: 'Temperatura',
            backgroundColor: '#FC2525',
            borderColor: '#9f276f',
            data: dataRespuestaTemp,           
				    fill: false
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    methods:{
      atras(){
        this.$router.go(-1)
      },
      MostrarDatos(tabla){
        this.$router.push("/seguimientoDatos/"+tabla);
      },
      cargarDatosGrafica(){     
        this.CargaPeso = false   
        this.CargaTension = false
        this.CargaAzucar = false
        this.CargaIMC = false
        this.CargaOxigeno = false
        this.CargaTemp = false
        this.CargaFreCar = false
        try {
          dataRespuestaPeso.length = 0   
          dataRespuestaIMC.length = 0
          dataRespuestaAzucar.length = 0
          dataRespuestaTension.length = 0
          dataRespuestaFreCar.length = 0
          dataRespuestaOxigeno.length = 0
          dataRespuestaTemp.length = 0
          apiClient.get('api/v1/users/'+this.idUser+'/medicions').then((res) => {
            this.respuesta = res.data.data
            for (let i = 0; i < this.respuesta.length; i++) {
              let fechaCreated = new Date(this.respuesta[i].attributes.created_at).toLocaleDateString("es-MX", options)
              if (this.respuesta[i].attributes.peso != null) {
                this.chartdataPeso.labels.push(fechaCreated);
                dataRespuestaPeso.push(this.respuesta[i].attributes.peso);
                this.CargaPeso = true
              }
              if (this.respuesta[i].attributes.presion_arterial != null) {
                this.chartdataTension.labels.push(this.respuesta[i].attributes.presion_arterial2);
                dataRespuestaTension.push(this.respuesta[i].attributes.presion_arterial);
                this.CargaTension = true
              }    
              if (this.respuesta[i].attributes.azucar != null) {
                this.chartdataAzucar.labels.push(fechaCreated);
                dataRespuestaAzucar.push(this.respuesta[i].attributes.azucar);
                this.CargaAzucar = true
              }  
              if (this.respuesta[i].attributes.imc != null) {
                this.chartdataIMC.labels.push(fechaCreated);
                dataRespuestaIMC.push(this.respuesta[i].attributes.imc);
                this.CargaIMC = true
              }          
              if(this.respuesta[i].attributes.fre_cardiaca != null){
                this.chartdataFreCar.labels.push(fechaCreated)
                dataRespuestaFreCar.push(this.respuesta[i].attributes.fre_cardiaca)
                this.CargaFreCar = true
              }
              if (this.respuesta[i].attributes.oxigeno != null) {
                this.chartdataOxigeno.labels.push(fechaCreated);
                dataRespuestaOxigeno.push(this.respuesta[i].attributes.oxigeno);
                this.CargaOxigeno = true
              }          
              if (this.respuesta[i].attributes.temperatura != null) {
                this.chartdataTemp.labels.push(fechaCreated);
                dataRespuestaTemp.push(this.respuesta[i].attributes.temperatura);
                this.CargaTemp = true
              }                         
            }
          })
        } catch (e) {
          console.error(e)
        }
      },
    },
    components: {
      Footer, LineChart
    }
}
</script>

<style lang="scss">
  .graficas {
    height: 250px;
  }
</style>