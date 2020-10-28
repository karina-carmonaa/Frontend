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
                <q-btn flat label="Agregar datos" no-caps @click="agregar" class="absolute-right q-subtitle-1"/>
              </q-toolbar>
            </q-header>
            <q-page-container class="row q-ma-lg">
              <div class="text-center column">
                <line-chart v-if="cargado" :chartdata="chartData" :options="options" />
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
export default {
    name: 'seguimientoSaludGraficas',
    mounted(){
      this.cargado = false;
      try {
        
        this.loaded = true
      } catch (e){
        console.log(e)
      }
    },
    data() {
      return {
        cargado: false,
        chartData: null,
        options: {responsive: true}
      }
    },
    methods:{
      atras(){
        this.$router.go(-1)
      },
      agregar(){

      }
    },
  components: {
    Footer, LineChart
  }
}
</script>