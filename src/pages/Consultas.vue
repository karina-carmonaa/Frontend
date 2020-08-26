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
                  Consultas
                </span>
                <q-btn flat label="Agregar" no-caps class="absolute-right"/>
              </q-toolbar>
            </q-header>
            <q-page-container class="column col q-ma-md">
                <div v-for="(consulta, index) in Historial" :key="index">
                  <q-list class="shadow-2 rounded-borders">
                    <q-item>
                      <q-item-section avatar>
                        <q-avatar>
                          <q-icon name="emoji_people" />
                        </q-avatar>
                      </q-item-section>
                      <q-item-section>
                        <p class="text-left text-purple-5 text-weight-bold" > {{consulta.diagnostico}}</p>
                        
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
export default {
    name: 'Consultas',
    data() {
      return {
        Historial: [
          {NombreMedico: 'Dr. José Duran Cámara', diagnostico: 'Dolor estomacal', fecha: '15 de mayo 2020', 
          celularMedico: '9992499865', lugar: 'Cruz Roja'},
          {NombreMedico: 'Dr. Guillermo Bobadilla', diagnostico: 'Fractura de cadera', fecha: '12 de mayo 2020', 
          celularMedico: '', lugar: 'Cruz Roja'},
          {NombreMedico: 'Dr. Cesar Alcala', diagnostico: 'Asma', fecha: '12 de febrero 2020', 
          celularMedico: '9992589422', lugar: 'Star Medica'}
        ],
      }
    },
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