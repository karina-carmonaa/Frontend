
<template >
    <div class="bg-paginas" >
        <q-layout view="lHh Lpr lff" class="shadow-2 rounded-borders">
            <q-header class="bg-cyan-8 q-px-sm q-pt-md q-mb-md">
              <q-toolbar>
                <q-btn flat  dense size="sm" round @click="atras" class="platform-ios-only"
                  icon="arrow_back_ios"
                />
                <q-btn flat  dense size="sm" round @click="atras" class="platform-android-only"
                  icon="arrow_back"
                />
                  </q-toolbar>
            </q-header>
            <q-page-container class="column row q-ma-xl col q-mr-sm">
               
               <GmapMap
            :center="{lat:20.97, lng: -89.62}"
            :zoom="12"
            map-type-id="terrain"
            style="width: 500px; height: 300px"
            >
            <GmapMarker
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
                :clickable="true"
                :draggable="true"
                @click="center=m.position"
            />
        </GmapMap>
       
              
                <q-footer >
                    <Footer />
                </q-footer>
            </q-page-container>
        </q-layout>
    </div>
</template>


<script>

import Footer from 'components/piePagina.vue'
import * as VueGoogleMaps from 'vue2-google-maps'
 import Vue from 'vue'

 
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyA_Cx_W-NRJMQOQUqQCXk0K9bzBQ1piIMQ',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
 
    //// If you want to set the version, you can do so:
    // v: '3.26',
  }
})

//-----------------------------------------------------------fin map google -------------------------------------

import {QLayout} from 'quasar'
export default {
    name: 'EstadoSaludCuestionario',
    data() {
      return {
                              
      }
    },
    methods:{
        atras(){
            this.$router.push("/EstadoSalud");
        },
        reset () {
     
      } 
              
    },
    
    
    components: {
      QLayout,
      Footer
     }
}

</script>
