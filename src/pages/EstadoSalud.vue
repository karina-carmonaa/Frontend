<template>
    <div class="bg-paginas">
        <q-layout view="lHh Lpr lff" class="shadow-2 rounded-borders" style="min-height:720px">
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
            <q-page-container class="column row q-ma-xl col q-mr-sm" style="padding-top:20px">
                <p class="text-center text-subtitle1"> ¿En qué zona siente dolor?</p>
                <q-page-container  v-show="delanteImg"  style="padding-top:2px">
                    <div>
                      <map name="image-map-1">                      
                               <area target="_parent" alt="HombroDer" title="HombroDer" href="#" coords="76,132,75,108,83,94,94,88,107,86,117,90,125,94,109,95,101,99,97,106,97,114" shape="poly">
                                <area target="_parent" alt="HombroIzq" title="HombroIzq" @click="EstadoSaludCuestionario" coords="209,135,188,113,187,101,181,97,172,95,160,93,176,87,183,87,191,87,198,91,204,97,209,107,210,115" shape="poly">
                                <area target="_parent" alt="ManoDer" title="ManoDer" href="#" coords="47,235,60,239,54,286,42,292,31,290,23,284,21,262" shape="poly">
                                <area target="_parent" alt="ManoIzq" title="ManoIzq" href="#" coords="223,237,238,233,245,243,265,263,262,284,253,291,243,292,230,285" shape="poly">
                                <area target="_parent" alt="RodillaDer" title="RodillaDer" href="#" coords="101,338,107,338,114,340,122,347,125,358,123,368,120,380,110,383,103,384,98,378" shape="poly">
                                <area target="_parent" alt="RodillaIzq" title="RodillaIzq" href="#" coords="160,378,161,370,158,356,157,348,172,344,184,351,184,366,185,376,185,382" shape="poly">
                                <area target="_parent" alt="PieIzq" title="PieIzq" href="#" coords="105,458,120,457,124,470,122,478,122,486,123,494,119,500,116,504,106,505,97,501,96,493,106,480" shape="poly">
                                <area target="_parent" alt="PieDer" title="PieDer" href="#" coords="164,457,180,458,180,464,181,472,179,480,183,487,188,494,187,501,177,504,169,506,162,499,162,481,161,471" shape="poly">
                                <area target="_parent" alt="CaderaDer" title="CaderaDer" href="#" coords="102,215,105,187,119,198,123,235" shape="poly">
                                <area target="_parent" alt="CaderaIzq" title="CaderaIzq" href="#" coords="165,199,179,189,182,200,181,216,162,235" shape="poly">
                                <area target="_parent" alt="Cuello" title="Cuello" href="#" coords="128,59,135,64,142,65,151,64,156,60,157,72,143,91,129,72" shape="poly">
                                <area target="_parent" alt="Cabeza" title="Cabeza" href="#" coords="123,35,123,24,127,17,135,11,141,8,149,8,154,12,158,18,161,27,161,33,164,40,159,47,158,54,154,59,145,61,138,61,129,57,125,49,120,41" shape="poly">
                                <area target="_parent" alt="CodoDer" title="CodoDer" href="#" coords="71,160,79,154,88,163,87,176,74,178,67,170" shape="poly">
                                <area target="_parent" alt="CodoIzq" title="CodoIzq" href="#" coords="198,175,202,164,211,163,216,161,222,168,225,179,208,184,197,183" shape="poly">
                                
                      </map>
                          <img src="~assets/body-delante.png" usemap="#image-map-1" alt="Mapa de imagen de ejemplo">
                      </div>
                </q-page-container>
                <q-page-container v-show="!delanteImg" style="padding-top:2px" >
                  <div>
                      <map name="image-map-2">
                                 <area target="_parent" alt="Columna" title="Columna" href="#" coords="145,54,126,80,128,133,133,175,133,205,129,218,143,235,160,215,153,204,150,171,159,134,160,80" shape="poly">
                         
                      </map>
                          <img src="~assets/body-detras.png" usemap="#image-map-2" alt="Mapa de imagen de ejemplo">
                  </div>
                </q-page-container>


                <div>
                  
                    
                  <q-page-sticky position="bottom-right" :offset="[18, 18]">
                    <q-btn fab icon="autorenew" v-on:click="delanteImg = !delanteImg" class="glossy" color="primary" size="md" />
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

import Footer from 'components/piePagina.vue'
import urlImagen from "assets/body-delante.png"
import urlImagen2 from "assets/body-detras.png"
export default {
    name: 'EstadoSalud',
    data() {
        return {
          delanteImg:true,
          urlImagen: urlImagen,
          url: urlImagen,
          urlImagen2: urlImagen2,
      }
    },
    methods:{
        atras(){
            this.$router.go(-1)
        },
        EstadoSaludCuestionario(){
          this.$router.push('/EstadoSaludCuestionario')

        },
        
        
    },
  

  components: {
    Footer
    
  }
}
</script>
