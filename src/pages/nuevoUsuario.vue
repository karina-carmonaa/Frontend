<template>
  <div class="bg-paginas">
      <q-layout view="lHh Lpr lff" class="shadow-2 rounded-borders">
        <q-header class="bg-cyan-8 q-px-sm q-pt-md q-mb-md">
          <q-toolbar>
            <q-btn flat  dense size="sm" round @click="atras" class="platform-ios-only"
              icon="arrow_back_ios"/>
            <q-btn flat  dense size="sm" round @click="atras" class="platform-android-only"
              icon="arrow_back"/>
            <span class="q-subtitle-2 absolute-center ">
                Nuevo usuario
            </span>
            <q-btn flat label="Guardar" size="sm" class="absolute-right"/>
          </q-toolbar>
        </q-header>
        <q-page-container>
          <div class="col q-pa-lg q-ml-md text-center">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="~assets/nuevoUsuario.jpg">
            </q-avatar>
            <div class="q-gutter-y-md column">
              <q-input v-model="text" label="Nombre completo" stack-label :dense="dense" />
              <q-input v-model="Fecha" label="Fecha de nacimiento" 
                  stack-label mask="date" :rules="['date']">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy :breakpoint="600">
                          <q-date v-model="Fecha" />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
              <q-select v-model="genero" :options="options" label="Género" stack-label :dense="dense"
                transition-show="jump-up" transition-hide="jump-up" />
              <q-input v-model="Altura" label="Altura" stack-label :dense="dense" type="number" />
              <q-input v-model="Talla" label="Talla" stack-label :dense="dense" type="number" />
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
  data() {
    return {
      model: null,
      options: [
        'Hombre','Mujer'
      ],
      text: '',
      Fecha: '',
      genero: '',
      Altura: '',
      Talla: '',
      dense: false,
      ListaUsuarios: []
    }    
  },
  methods: {
    atras(){
      this.$router.go(-1)
    }
  },
  components: {
    Footer
  }
}
</script>
