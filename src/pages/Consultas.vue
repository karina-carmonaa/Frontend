<template>
  <div class="bg-paginas">
    <q-layout view="lHh Lpr lff" class="shadow-2 rounded-borders">
      <q-header class="bg-cyan-8 q-px-sm q-pt-md q-mb-md">
        <q-toolbar>
          <q-btn flat  dense size="sm" round @click="atras" class="platform-ios-only"
            icon="arrow_back_ios" />
          <q-btn flat  dense size="sm" round @click="atras" class="platform-android-only"
            icon="arrow_back" />
          <span class="q-subtitle-2 absolute-center " v-if="id == '0'">
            Consultas
          </span>
          <span v-else class="q-subtitle-2 absolute-center "> Ingresos médicos </span>
          <q-btn flat label="Agregar" no-caps @click="Consulta(id)" class="absolute-right"/>
        </q-toolbar>
      </q-header>
      <q-page-container class="column col q-my-md q-mx-xs">
        <div class="text-left q-pl-md">
          <p class="text-subtitle2 text-black">Historial </p>
        </div>
        <div v-for="(consulta, index) in Historial" :key="index">
          <q-list bordered padding separator >
            <q-item clickable v-ripple @click="Consulta(consulta.id)">
              <q-item-section avatar top class="col-2">
                <q-icon name="accessibility_new" size="xl"/>
              </q-item-section>
              <q-item-section top>
                <q-item-label lines="1">
                  <span class="text-weight-medium"> {{consulta.attributes.motivo}} </span>
                  <span class="text-grey-8">  </span>
                </q-item-label>
                <q-item-label class="text-grey-8" caption lines="1">
                  <span>{{consulta.attributes.medico}} </span>
                </q-item-label>
                <q-item-label class="q-mt-xs text-body2 text-primary text-uppercase">
                  <span class="cursor-pointer"> {{consulta.attributes.hospital}}  </span>
                </q-item-label>
              </q-item-section>
              <q-item-section top class="col-3">
                <q-item-label lines="1">
                  {{ new Date(consulta.attributes.fecha).toLocaleDateString("es-MX", { month: "short", day: "numeric"}) }}
                </q-item-label>
                <q-item-label caption lines="1">                  
                  <span>{{consulta.attributes.telefono}} </span>
                </q-item-label>
              </q-item-section>
              <q-item-section top side class="icon">
                <q-icon name="keyboard_arrow_right" class="icon" />
              </q-item-section>
            </q-item>
          </q-list>
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

let idHistotial = JSON.parse(localStorage.getItem('id_historial'));

export default {
  name: 'Consultas',
  data() {
    return {
      Historial: null,
      id: this.$route.params.id
    }
  },
  methods:{
    atras(){
      this.$router.go(-1)
    },
    Consulta(id){
      if (id == 0 ) this.$router.push('/ConsultasNuevas/'+id)
        else this.$router.push('/IngresosNuevos/'+id)
    },
    MostrarDatosConsultas(){
      console.log("consultas")
      apiClient.get('/api/v1/historials/'+ idHistotial+'/consultas').then((res) => {
        this.Historial = res.data.data
      })
    },
    MostrarDatosIngresos(){
      console.log("ingresos")
      apiClient.get('/api/v1/historials/'+ idHistotial+'/ingresos').then((res) => {
        this.Historial = res.data.data
      })
    }
  },
  components: {
    Footer
  },
  mounted() {
    if(this.id == 0) this.MostrarDatosConsultas();
      else this.MostrarDatosIngresos();
  },
}
</script>

<style lang="scss">
  .q-list{
    .q-item{
      padding: 8px 0px;    
      .icon{
        padding:0%;
      }
    }
  }
</style>