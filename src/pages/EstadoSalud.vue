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
