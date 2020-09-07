<template>
    <div class="bg-paginas">
        <q-layout view="lHh Lpr lff" class="shadow-2 rounded-borders">
            <q-header class="bg-cyan-8 q-px-sm q-pt-md q-mb-md">
              <q-toolbar>
                <q-btn flat label="Cancelar" no-caps @click="atras" class="absolute-left"
                />
                <span class="q-subtitle-2 absolute-center ">
                  Agregar recordatorio
                </span>
                <q-btn flat label="Guardar" no-caps class="absolute-right"/>
              </q-toolbar>
            </q-header>
            <q-page-container class="row q-ma-lg">
              <div class="q-gutter-y-xs col-12">
                <q-input class="text-center" bottom-slots filled dense v-model="medicamento">
                  <template v-slot:before>
                    <p class="text-caption margen text-black">Medicamento:</p>
                  </template> 
                </q-input>
<!--                 <q-input class="text-center" bottom-slots type="number"
                    filled dense v-model="presentacion" input-class="text-center">
                    <template v-slot:before>
                      <p class="text-caption margen text-black ">Presentación:</p>
                    </template> 
                    <template v-slot:after>
                      <q-select class="margen" filled dense v-model="medida"
                        :options="Medidas" transition-show="jump-up" transition-hide="jump-up">
                      </q-select>
                    </template> 
                    </q-input>  --> 
                <div class="row">
                  <div class="col-7">
                    <q-input class="text-center" bottom-slots type="number"
                    filled dense v-model="dosis" input-class="text-center">
                    <template v-slot:before>
                      <p class="text-caption margen text-black ">Dosis:</p>
                    </template> 
                    <template v-slot:after>
                     <p class="text-caption margen text-black "  >gr/ml</p>
                    </template> 
                    </q-input>  
                  </div>
                </div>
                  <div>
                    <q-item v-ripple >
                      <q-item-section >
                        <q-select borderless filled dense v-model="frecuencia" :options="diasOp"/>
                      </q-item-section>
                      <q-item-section class=" q-pl-md">
                        <q-item-label> cada </q-item-label>
                      </q-item-section>
                      <q-item-section >
                        <q-select borderless filled dense v-model="horas" :options="diasOp"/>
                      </q-item-section>
                      <q-item-section class="q-pl-md">
                        <q-item-label v-if="horas == 1 || horas == null "> hora </q-item-label>
                        <q-item-label v-else-if="horas > 1 "> horas  </q-item-label>
                      </q-item-section>       
                    </q-item>
                    <div v-if="horas > 2  && horas < 13 " class="q-pb-sm">
                      <p class="text-center q-mt-md">
                        Horarios sugeridos: 
                      </p> <!-- "'horariosSugeridos '+ horas + 'Horas'" -->
                      <q-select v-if="horas == 3" borderless dense  filled v-model="horarios" :options="horariosSugeridos3Horas"/> 
                      <q-select v-if="horas == 4" borderless dense  filled v-model="horarios" :options="horariosSugeridos4Horas"/> 
                      <q-select v-if="horas == 5" borderless dense  filled v-model="horarios" :options="horariosSugeridos5Horas"/> 
                      <q-select v-if="horas == 6" borderless dense  filled v-model="horarios" :options="horariosSugeridos6Horas"/> 
                      <q-select v-if="horas == 7" borderless dense  filled v-model="horarios" :options="horariosSugeridos7Horas"/> 
                      <q-select v-if="horas == 8" borderless dense  filled v-model="horarios" :options="horariosSugeridos8Horas"/> 
                      <q-select v-if="horas == 9" borderless dense  filled v-model="horarios" :options="horariosSugeridos9Horas"/> 
                      <q-select v-if="horas == 10" borderless dense  filled v-model="horarios" :options="horariosSugeridos10Horas"/> 
                      <q-select v-if="horas == 11" borderless dense  filled v-model="horarios" :options="horariosSugeridos11Horas"/> 
                      <q-select v-if="horas == 12" borderless dense  filled v-model="horarios" :options="horariosSugeridos12Horas"/> 
                    </div>
                  </div>
                <q-select class="text-center" bottom-slots filled dense v-model="duracion"
                :options="cantidadDias" transition-show="jump-up" transition-hide="jump-up">
                  <template v-slot:before>
                    <p class="text-caption margen text-black ">Duración:</p>
                  </template> 
                  <template v-slot:after>
                    <p v-if="duracion == 1" class="text-caption margen text-black"> día</p>
                    <p v-else class="text-caption margen text-black"> días</p>
                  </template>
                </q-select>
                <q-input v-model="dateInicio" filled type="date" today transition-show="scale" transition-hide="scale"
                    mask="date" label="Fecha de inicio"  stack-label input-class="text-center" />
                    <br>                  
                <q-input v-model="dateFin" filled type="date" transition-show="scale" transition-hide="scale"
                  mask="date" label="Fecha final" today  stack-label input-class="text-center" />
                <!-- <div class="p-item">
                  <q-item clickable v-ripple to="/Repetir">
                    <q-item-section>Personalizar</q-item-section>
                    <q-item-section avatar>
                      <q-icon name="arrow_forward_ios" class="platform-ios-only " />
                      <q-icon name="arrow_forward" class="platform-android-only " />
                    </q-item-section>
                  </q-item>
                </div> -->
                
                
<!--                 <q-toggle v-model="repetir" label="Repetir" class="text-h6" />
                <div v-if="repetir">

                  <q-select class="text-center" bottom-slots filled dense v-model="frecuencia"
                    :options="opcFrecuencia" transition-show="jump-up" transition-hide="jump-up">
                    <template v-slot:before>
                      <p class="text-caption margen ">Repetir:</p>
                    </template> 
                  </q-select>

                  <q-btn flat label="Personalizado" dense round @click="Personalizar" class="platform-ios-only"
                  icon-right="arrow_forward_ios"
                />
                <q-btn flat label="Personalizado" dense size="sm" round @click="Personalizar" class="platform-android-only"
                  icon-right="arrow_forward"
                />
                </div> -->
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
const diasOp = []
const cantidad = []
for (let i = 1; i <= 24; i++) {
  diasOp.push(i)
}
for (let i = 1; i < 100; i++) {
  cantidad.push(i)
  
}
export default {
    name: 'nuevoRecordatorio',
    data() {
      return {
        medicamento: '',
        horas: null,
        frecuencia: null,
        diasOp: diasOp,
        cantidadDias: cantidad,
        text: null,
        duracion: null,
        horarios: null,
        medida: '',
        presentacion: '',
        Medidas: [ 'ml','mg'],
        dosis: '',
        horariosSugeridos3Horas: [
          '7:00 am, 10:00 am, 1:00 pm, 4:00 pm, 7:00 pm',
          '8:00 am, 11:00 am, 2:00 pm, 5:00 pm, 8:00 pm',
          '9:00 am, 12:00 pm, 3:00 pm, 6:00 pm, 9:00 pm'
        ],
        horariosSugeridos4Horas: [
          '8:00 am, 12:00 pm, 4:00 pm, 8:00 pm ',
          '9:00 am, 1:00 pm, 5:00 pm, 9:00 pm ',
          '10:00 am, 2:00 pm, 6:00 pm, 10:00 pm '
        ],
        horariosSugeridos5Horas: [
          '8:00 am, 1:00 pm, 6:00 pm ',
          '9:00 am, 2:00 pm, 7:00 pm ',
          '10:00 am, 3:00 pm, 8:00 pm ',
          '11:00 am, 4:00 pm, 9:00 pm ',
          '12:00 pm, 5:00 pm, 10:00 pm '
        ],
        horariosSugeridos6Horas: [
          '8:00 am, 2:00 pm, 8:00 pm',
          '9:00 am, 3:00 pm, 9:00 pm',
          '10:00 am, 4:00 pm, 10:00 pm ',
          '11:00 am, 5:00 pm, 11:00 pm '
        ],
        horariosSugeridos7Horas: [
          '8:00 am, 3:00 pm, 9:00 pm',
          '9:00 am, 4:00 pm, 10:00 pm',
          '10:00 am, 5:00 pm, 11:00 pm '
        ],
        horariosSugeridos8Horas: [
          '8:00 am, 4:00 pm ',
          '9:00 am, 5:00 pm ',
          '10:00 am, 6:00 pm ',
          '11:00 am, 7:00 pm ',
          '12:00 pm, 8:00 pm ',
          '1:00 pm, 9:00 pm ',
          '2:00 pm, 10:00 pm ',
          '3:00 pm, 11:00 pm '
        ],
        horariosSugeridos9Horas: [
          '8:00 am, 5:00 pm',
          '9:00 am, 6:00 pm',
          '10:00 am, 7:00 pm',
          '11:00 am, 8:00 pm',
          '12:00 pm, 9:00 pm',
          '1:00 pm, 10:00 pm',
          '2:00 pm, 11:00 pm'
        ],
        horariosSugeridos10Horas: [
          '8:00 am, 6:00 pm',
          '9:00 am, 7:00 pm',
          '10:00 am, 8:00 pm',
          '11:00 am, 9:00 pm',
          '12:00 pm, 10:00 pm',
          '1:00 pm, 11:00 pm'
        ],
        horariosSugeridos11Horas: [
          '8:00 am, 7:00 pm',
          '9:00 am, 8:00 pm',
          '10:00 am, 9:00 pm',
          '11:00 am, 10:00 pm',
          '12:00 pm, 11:00 pm'
        ],
        horariosSugeridos12Horas: [
          '8:00 am, 8:00 pm',
          '9:00 am, 9:00 pm',
          '10:00 am, 10:00 pm',
          '11:00 am, 11:00 pm',
          '12:00 am, 12:00 pm',
        ],
        hora: '',
        date: '2018/11/03',
        options: [
        'Continuo','Establecer periodo'
        ],
        dateInicio: '2018-11-03',
        dateFin: '',
      }
    },
    methods:{
      atras(){
        this.$router.go(-1)
      },
      Personalizar(){

      },
      generarHorario(){
        console.log("hola")
        
      }
    },
  components: {
    Footer
  }
}
</script>

<style lang="scss">
  .margen{
    margin: 0%;
  }
  .p-item{
    .q-item{
      padding: 8px 0px;
    }
  }
</style>