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
                  Agregar recordatorio
                </span>
                <q-btn flat label="Guardar" no-caps class="absolute-right"/>
              </q-toolbar>
            </q-header>
            <q-page-container class="row q-ma-lg">
              <div class="q-gutter-y-xs">
                <q-input class="text-center" bottom-slots filled dense v-model="medicamento">
                  <template v-slot:before>
                    <p class="text-caption margen text-black">Medicamento:</p>
                  </template> 
                </q-input>
                <q-input class="text-center" bottom-slots type="number"
                    filled dense v-model="presentacion" input-class="text-center">
                    <template v-slot:before>
                      <p class="text-caption margen text-black ">Presentación:</p>
                    </template> 
                    <template v-slot:after>
                      <q-select class="margen" filled dense v-model="medida"
                        :options="Medidas" transition-show="jump-up" transition-hide="jump-up">
                      </q-select>
                    </template> 
                    </q-input>  
                <div class="row">
                  <div class="col-7">
                    <q-input class="text-center" bottom-slots type="number"
                    filled dense v-model="dosis" input-class="text-center">
                    <template v-slot:before>
                      <p class="text-caption margen text-black ">Dosis:</p>
                    </template> 
                    <template v-slot:after v-if="medida === 'ml'">
                     <p class="text-caption margen text-black "  >ml</p>
                    </template> 
                    <template v-slot:after v-else>
                     <p class="text-caption margen text-black "  >pastillas</p>
                    </template> 
                    </q-input>  
                  </div>
                </div>
                <q-select class="text-center" bottom-slots filled dense v-model="tratamiento"
                :options="options" transition-show="jump-up" transition-hide="jump-up">
                  <template v-slot:before>
                    <p class="text-caption margen text-black ">Tratamiento:</p>
                  </template> 
                </q-select>
                <div v-if="tratamiento === 'Establecer periodo'">
                  <q-input v-model="dateInicio" filled type="date" transition-show="scale" transition-hide="scale"
                    mask="date" label="Fecha de inicio"  stack-label input-class="text-center" />
                    <br>                  
                  <q-input v-model="dateFin" filled type="date" transition-show="scale" transition-hide="scale"
                    mask="date" label="Fecha final"  stack-label input-class="text-center" />
                    <br>
                </div>      

                <div class="row">
                  <div class="col-10">
                    <q-input v-model="hora" filled type="time" hint="Hora de inicio" >
                    <template v-slot:before>
                      <p class="text-caption margen text-black ">Hora:</p>
                    </template> 
                    </q-input>  
                  </div>
                </div>
                <div class="row p-item">
                  <div class="col-12 q-mt-lg">
                    <q-item clickable v-ripple >
                      <q-item-section avatar class="">
                        <q-item-label>Repetir cada </q-item-label>
                      </q-item-section>
                      <q-item-section >
                        <q-select borderless dense v-model="dias" :options="diasOp"/>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label v-if="dias == 1 || dias == null "> hora </q-item-label>
                        <q-item-label v-else-if="dias > 1 "> horas  </q-item-label>
                      </q-item-section>       
                    </q-item>
                  </div>
                </div>
                
                <div class="p-item">
                  <q-item clickable v-ripple to="/Repetir">
                    <q-item-section>Personalizar</q-item-section>
                    <q-item-section avatar>
                      <q-icon name="arrow_forward_ios" class="platform-ios-only " />
                      <q-icon name="arrow_forward" class="platform-android-only " />
                    </q-item-section>
                  </q-item>
                </div>
                
                
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
for (let i = 1; i <= 1000; i++) {
  diasOp.push(i)
}
export default {
    name: 'nuevoRecordatorio',
    data() {
      return {
        medicamento: '',
        dias: null,
        diasOp: diasOp,
        text: null,
        tratamiento: '',
        medida: '',
        presentacion: '',
        Medidas: [ 'ml','mg'],
        dosis: '',
        hora: '',
        date: '2018/11/03',
        options: [
        'Continuo','Establecer periodo'
        ],
        dateInicio: '',
        dateFin: '',
      }
    },
    methods:{
      atras(){
        this.$router.go(-1)
      },
      Personalizar(){

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