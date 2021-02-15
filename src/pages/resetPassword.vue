<template>
  <div class="bg-paginas">
    <q-layout view="lHh Lpr lff" style="height: 300px" class="shadow-2 rounded-borders">
      <q-header class="bg-cyan-8 q-px-sm q-pt-md q-mb-md">
        <q-toolbar>
          <q-btn flat  dense size="sm" round @click="atras" class="platform-ios-only" icon="arrow_back_ios"/>
          <q-btn flat  dense size="sm" round @click="atras" class="platform-android-only" icon="arrow_back"/>
          <span class="q-subtitle-2 absolute-center ">
            Recuperar contraseña
          </span>
        </q-toolbar>
      </q-header>
      <q-page-container class="column col q-ma-xl q-mr-sm">
        <div class="col text-center bg-transparent">
          <div class="q-pt-xs">
            <q-label> Correo electrónico</q-label>
          </div>
          <q-input v-model="email" input-class="text-center" dense />
          <div class=" q-pt-md text-weight-bold">
            <q-btn label="Aceptar" class="full-width" @click="resetPassword" rounded color="blue"/>
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
  name: 'resetPassword',
  data() {
    return {
      email: null,
    }
  },
  methods:{
    atras(){
      this.$router.go(-1)
    },
    resetPassword(){

    }
  },
  components: {
    Footer
  }
}
</script>