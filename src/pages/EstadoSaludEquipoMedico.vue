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
      <q-page-container class="column col q-ma-xl q-mr-sm">
        <div class="row">
            <p class="text-center">¿Cuenta con algún equipo de medición?</p>
            <div class="q-gutter-sm col-12">
                <q-checkbox v-model="Oximetro" label="Oximetro" color="teal" /> <br />
                <q-checkbox v-model="Baumanometro" label="Baumanometro" color="teal" /> <br />
                <q-checkbox v-model="Termometro" label="Termometro" color="teal" /> <br />
                <q-checkbox v-model="Ninguno" label="Ninguno" color="teal" />
            </div>
            <div v-if="Oximetro">
                <q-input class="text-center" bottom-slots filled dense v-model="ModelOxi">
                    <template v-slot:before>
                        <p class="text-caption text-black">Frecuencia cardiaca</p>
                    </template>
                </q-input>
            </div>
            <div v-if="Baumanometro">
                <q-input class="text-center" bottom-slots filled dense v-model="ModelBauma">
                    <template v-slot:before>
                        <p class="text-caption text-black">SP2</p>
                    </template>
                </q-input>
            </div>
        </div>
        <q-footer class="q-px-xl">
          <Footer />
        </q-footer>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import Footer from 'components/piePagina.vue'
export default {
    name: 'EstadoSaludEquipoMedico',
    data() {
        return {
            Oximetro: true,
            Baumanometro: false,
            Termometro: false,
            Ninguno: false,
            ModelBauma: null, 
            ModelOxi: null
        }
    },
    methods:{
        atras(){
            this.$router.go(-1)
        },  
    },
  components: {
    Footer
  }
}
</script>