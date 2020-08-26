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
              </q-toolbar>
            </q-header>
            <q-page-container class="column q-pa-xl q-gutter-sm q-mt-xl">
                <q-btn unelevated class="bg-cyan-9 text-cyan-1" rounded label="Estudios" no-caps 
                    to="/Estudios"/>
                    <q-btn unelevated class="bg-cyan-9 text-cyan-1" rounded label="Consultas" no-caps 
                   to="/Consultas"/>
                    <q-btn unelevated class="bg-cyan-9 text-cyan-1" rounded label="Ingresos" no-caps 
                    to="/Ingresos"/>
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
    name: 'menuHistorial',
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