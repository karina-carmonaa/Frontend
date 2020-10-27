<template>
    
    <q-layout>
       
        <GmapMap
            :center="{lat:10, lng:10}"
            :zoom="7"
            map-type-id="terrain"
            style="width: 500px; height: 300px"
            >
            
        </GmapMap>
    </q-layout>
</template>

<script>
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import {QLayout} from 'quasar'
 
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyA_Cx_W-NRJMQOQUqQCXk0K9bzBQ1piIMQ',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
 
    //// If you want to set the version, you can do so:
    // v: '3.26', ccccc
  }
})

export default {
    name: 'MapGoogle',
    components:{
        QLayout
    }
}
</script>

<style lang="scss">
    .bg-footer{
     background: #d7d2cc;
    }
</style>