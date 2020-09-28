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
                  Hombro Izquierdo
                </span>
              </q-toolbar>
            </q-header>
            <q-page-container class="column row q-ma-xl col q-mr-sm">
               Usted tiene..
              <div class="q-pa-md">
                <div class="q-gutter-sm">
                  <q-checkbox indeterminate-value="false" v-model="pre1" label="¿Intenso dolor?" />
                </div>
                <div class="q-gutter-sm">
                  <q-checkbox indeterminate-value="maybe" v-model="pre2" label="¿Inflamación del hombro?" />
                </div>
                <div class="q-gutter-sm">
                  <q-checkbox indeterminate-value="maybe" v-model="pre3" label="¿Sensibilidad extrema en la zona del hombro?" />
                </div>
                <div class="q-gutter-sm">
                  <q-checkbox indeterminate-value="maybe" v-model="pre4" label="¿Deformidad debajo de la piel?" />
                </div>
                <div class="q-gutter-sm">
                  <q-checkbox indeterminate-value="maybe" v-model="pre5" label="¿Coloración violácea o decoloración de la piel?" />
                </div>
                <div class="q-gutter-sm">
                  <q-checkbox indeterminate-value="maybe" v-model="pre6" label="¿Crujidos?" />
                </div>
                <div class="q-gutter-sm">
                  <q-checkbox indeterminate-value="maybe" v-model="pre7" label="¿Incapacidad de mover el brazo sin experimentar dolor?" />
                </div>
                </br>
                <div class="q-px-sm">
                  The model data: <strong>{{ JSON.stringify(pre1) }}</strong>
                </div>
                 </br>
                <q-btn color="primary" label="Enviar" />

                
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
export default {
    name: 'EstadoSaludCuestionario',
    data() {
      return {
        pre1: false,
        pre2: false,
        pre3: false,
        pre4: false,
        pre5: false,
        pre6: false,
        pre7: false,
        
      }
    },
    methods:{
        atras(){
            this.$router.go(-1)
        },
        reset () {
      this.pre1 = null
      this.pre2 = null
      this.pre3 = null
      this.pre4 = null
      this.pre5 = null
      this.pre6 = null
      this.pre7 = null
      
    }
        
    },
  components: {
    Footer
     }
}


</script>
