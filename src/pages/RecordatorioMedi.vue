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
                <span class="q-subtitle-1 absolute-center ">
                  Recordatorio
                </span>
                <q-btn flat label="Agregar" no-caps @click="AgregarMedicamento" class="absolute-right"/>
              </q-toolbar>
            </q-header>
            <q-page-container class="column col q-ma-md">   
              <q-list bordered separator 
              v-for="(medicamento, index) in ListaMedicamentos" :key="index">
              <q-slide-item class="bg-grey-6 text-center" left-color="red" @left="onLeft" @right="onRight">
                <template v-slot:left>
                  <q-icon name="alarm_off" />
                </template>
                <template v-slot:right>
                  <q-icon name="alarm" />
                </template>
                <q-item>
                  <q-item-section>
                    <p class="text-subtitle1"> {{medicamento.nombre}} </p>
                    <div class="q-subtitle-1">
                      <span class="text-red-10 text-weight-bold">{{medicamento.vecesDia}}</span>
                      <span > | {{medicamento.aplicar}}</span>
                      <p >{{medicamento.tratamiento}} {{medicamento.hora}} {{medicamento.periodo}}</p>
                    </div>
                  </q-item-section>
                </q-item>
              </q-slide-item>
            </q-list>

              <div v-if="!ListaMedicamentos.length"
                class=" q-pa-md row items-center justify-around no-tasks absolute-center">
                <q-icon class="items-center" name="check" size="100px" color="primary" />
                <div class="text-h5 text-primary text-center">
                  No hay recordatorios
                </div>
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
    name: 'RecordatorioMedi',
    data() {
      return {
        ListaMedicamentos: [
          {nombre: 'Vitamina C', vecesDia: 'Una vez al día', aplicar: 'Todos los días',
          tratamiento: 'Tratamiento continuo', hora: '10:00', periodo: 'am'},
          {nombre: 'Vitamina B3', vecesDia: 'Una vez al día', aplicar: 'Todos los días',
          tratamiento: 'Tratamiento continuo', hora: '3:00', periodo: 'pm'},
          {nombre: 'Gotas de ojos', vecesDia: '2 veces al día', aplicar: 'Martes',
          tratamiento: '26 Junio - 28 Agosto', hora: '3:00 pm, 8:00', periodo: 'pm'}
        ]
      }
    },
    methods:{
        atras(){
          this.$router.go(-1)
        },
        AgregarMedicamento(){
          this.$router.push('/NuevoRecordatorio')
        },
        onLeft ({ reset }) {
          this.$q.notify('Alarma desactivada')
          this.finalize(reset)
        },
        onRight ({ reset }) {
          this.$q.notify('Alarma activida.')
          this.finalize(reset)
        },

        finalize (reset) {
          this.timer = setTimeout(() => {
            reset()
          }, 1000)
        }
    },
  components: {
    Footer
  }
}
</script>

<style lang="scss">
  .no-tasks{
    opacity: 0.5;
  }
</style>