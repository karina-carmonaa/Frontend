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
                <span class="q-subtitle-2 absolute-center ">
                  Estado de salud
                </span>
              </q-toolbar>
            </q-header>
            <q-page-container class="column row q-ma-xl col q-mr-sm">
                <div class="row">
                  <MyMap /> 
                  <p>Hola</p>
                </div>
                <p class="text-center text-subtitle1"> ¿En qué zona siente dolor?</p>
                 <div>
                  <map name="image-map-1" class="area">
                  
                        <area href="#" alt="HOMBRO" shape="poly" coords="122,218,129,162,148,144,176,141,199,153,167,160,163,160,163,170,161,189,122,218" class="svg-map__location" >
                        <area href="#" alt="MANO" shape="circle" coords="75,425,40" class="svg-map__location" >
                  </map>
                      <img src="~assets/body-delante.png" usemap="#image-map-1" alt="Mapa de imagen de ejemplo">
                  </div>
                <div>
                    
                  <q-img
                    :src="url"
                    spinner-color="white"
                    style="auto"
                  />                  
                  <q-page-sticky position="bottom-right" :offset="[18, 18]">
                    <q-btn fab icon="autorenew" @click="cambiarImagen(url)" class="glossy" color="primary" size="md" />
                  </q-page-sticky> 
                </div>
                <q-footer >
                    <Footer />
                </q-footer>
            </q-page-container>
        </q-layout>
    </div>
</template>



<script>
import MyMap from 'components/MyMAp.vue'
import Footer from 'components/piePagina.vue'
import urlImagen from "assets/body-delante.png"
import urlImagen2 from "assets/body-detras.png"
export default {
    name: 'EstadoSalud',
    data() {
      return {
        urlImagen: urlImagen,
        url: urlImagen,
        urlImagen2: urlImagen2,
      }
    },
    methods:{
        atras(){
            this.$router.go(-1)
        },
        cambiarImagen(url){
          if (url === 'img/body-delante.png') {
            this.url = urlImagen2
          }else{
            this.url = urlImagen
          }
        }
    },
  components: {
    Footer,
    MyMap
  }
}
</script>
