<template>
    <div class="bg-paginas">
        <q-layout view="lHh Lpr lff" style="height: 300px" class="shadow-2 rounded-borders">
            <q-header class="bg-cyan-8 q-px-sm q-pt-md q-mb-md">
              <q-toolbar>
                <q-btn flat  dense size="sm" round @click="atras" class="platform-ios-only"
                  icon="arrow_back_ios"
                />
                <q-btn flat  dense size="sm" round @click="atras" class="platform-android-only"
                  icon="arrow_back"
                />
                <span class="q-subtitle-2 absolute-center ">
                  Seguimiento de salud
                </span>
              </q-toolbar>
            </q-header>
            <q-page-container class="column col q-ma-xl q-mr-sm">
                
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
    name: 'seguimientoSalud',
    methods:{
        atras(){
            this.$router.go(-1)
        }
    },
  components: {
    Footer
  }
}
</script>