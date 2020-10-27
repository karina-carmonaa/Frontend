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
                  Seguimiento de salud
                </span>
                <q-btn flat label="Recordar" no-caps @click="Recordatorio" class="absolute-right"/>
              </q-toolbar>
            </q-header>
            <q-page-container class="row q-ma-lg">
              <div class="text-center column">
                <p class="text-h6 text-black">Hoy <span>
                  <label class="text-body2"> {{fecha}} </label>                  
                </span></p>
              </div>
              <br/>
              <div class="q-gutter-y-xs col-12">
                <q-input bottom-slots filled dense v-model="TensionArterial">
                  <template v-slot:before>
                    <p class="text-body2 text-black">Tensión arterial:</p>
                  </template>
                </q-input>   
                <q-input bottom-slots filled dense v-model="azucar">
                  <template v-slot:before>
                    <p class="text-body2 text-black col-12">Azúcar:</p>
                  </template>
                </q-input>
                <q-input type="number" v-on:blur="calcularIMC" bottom-slots filled dense v-model="peso">
                  <template v-slot:before>
                    <p class="text-body2 text-black" >Peso:</p>
                  </template>
                  <template v-slot:after>
                    <p class="text-body2 text-black q-mr-xl q-pr-xl"> Kg</p>
                  </template>
                </q-input>
                <q-input type="number" v-on:blur="calcularIMC" bottom-slots filled dense v-model="estatura">
                  <template v-slot:before>
                    <p class="text-body2 text-black">Estatura:</p>
                  </template>
                  <template v-slot:after>
                    <p class="text-body2 text-black q-mr-xl q-pr-xl"> m </p>                    
                  </template>
                </q-input>
                <q-input type="number" class="q-mr-xl q-pr-xl" bottom-slots filled dense v-model="imc">
                  <template v-slot:before>
                    <p class="text-body2 text-black" >IMC:</p>
                  </template>
                </q-input>
                <div class="q-ml-xl q-mr-xl q-pl-md q-pr-md">
                  <q-btn class="full-width" label="Guardar" no-caps rounded unelevated color="secondary" />
                </div>
              </div>
              <div class="text-center q-mt-md column">
                <p class="text-h6 text-black">Medidas recientes</p>
              </div><!-- v-for="medida in ListaMedidas" :key="medida" -->
              <q-list bordered separator dense class="col-12" >
                <q-slide-item class="bg-grey-5" left-color="red" >
                  <q-item clickable v-ripple >
                    <q-item-section class="col-2">
                      <q-icon name="accessibility_new" size="xl"/>
                    </q-item-section>
                  <q-item-section >
                    <q-item-label lines="1">Peso</q-item-label>
                    <q-item-label caption> 89.56  <span> kg </span></q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label> 12 feb <span>
                      <q-icon name="keyboard_arrow_right" size="xs" />                    
                    </span></q-item-label>
                  </q-item-section>
                </q-item>
                </q-slide-item>
              </q-list>      
              <div class="row justify-center col-12 q-pt-md">
                <q-btn label="Historial y gráficas" no-caps unelevated rounded padding="8px 60px" 
                @click="graficas" color="secondary" />
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
import { date } from 'quasar'
export default {
    name: 'seguimientoSalud',
    data() {
      return {
        TensionArterial: null,
        azucar: null,
        peso: null,
        estatura: null,
        ListaMedidas: null,
        imc: null,
        fecha: null
      }
    },
    methods:{
      atras(){
        this.$router.go(-1)
      },
      Recordatorio(){
      },
      calcularIMC(){
        this.imc = (this.peso / ((this.estatura)*(this.estatura))).toFixed(2)
      },
      graficas(){
        this.$router.push("/seguimientoGraficas");
      },
      fechaActual(){
        var d = new Date();
        var dia = d.getUTCDate();
        if (dia < 10){
          dia = "0"+dia
        }
        var mes =  ("0" + (d.getMonth() + 1)).slice(-2);
        var año = d.getUTCFullYear();
        console.log(dia + "/" + mes + "/" + año);
        this.fecha = año + "-" + mes + "-" + dia; 
        
      },
    },
    mounted() {
      this.fechaActual()
    },
  components: {
    Footer
  }
}
</script>