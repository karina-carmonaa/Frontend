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
                      <!--  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                         HombroDer =1
                         HombroIzq =2
                         Mano Der y Izq =3
                         Rodilla Der y Izq=4
                         Pie Der y Izq =5
                         Cadera Der y Izq=6
                         Cuello =7
                         Codo Der y Izq =8
                         cabeza =9
                         columna=10

                        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  -->

                <!-- HombroDer =1   -->
                <span v-if="idCuestionario == '1'" class="q-subtitle-2 absolute-center ">
                  Hombro Derecho
                </span>
                 <!--  HombroIzq =2  -->
                <span v-if="idCuestionario == '2'" class="q-subtitle-2 absolute-center ">
                  Hombro Izquierdo
                </span>
                <!--  Mano Der y Izq =3  -->
                <span v-if="idCuestionario == '3'" class="q-subtitle-2 absolute-center ">
                  Mano
                </span>
                <!--  Rodilla Der y Izq=4 -->
                <span v-if="idCuestionario == '4'" class="q-subtitle-2 absolute-center ">
                 Rodilla
                </span>
                <!--  Pie Der y Izq =5 -->
                <span v-if="idCuestionario == '5'" class="q-subtitle-2 absolute-center ">
                 Pie
                </span>
                <!--   Cadera Der y Izq=6 -->
                <span v-if="idCuestionario == '6'" class="q-subtitle-2 absolute-center ">
                 Cadera
                </span>
                 <!--   Cuello =7 -->
                <span v-if="idCuestionario == '7'" class="q-subtitle-2 absolute-center ">
                 Cuello
                </span>
                 <!--  Codo Der y Izq =8 -->
                <span v-if="idCuestionario == '8'" class="q-subtitle-2 absolute-center ">
                 Codo
                </span>
                <!--  cabeza =9-->
                <span v-if="idCuestionario == '9'" class="q-subtitle-2 absolute-center ">
                 Cabeza
                </span>
                 <!--  columna =10-->
                <span v-if="idCuestionario == '10'" class="q-subtitle-2 absolute-center ">
                 Columna
                </span>
              </q-toolbar>
            </q-header>

            <q-page-container class="column row q-ma-xl col q-mr-sm">
               Usted tiene..
               <!-- HombroDer =1   -->
              <div v-if="idCuestionario == '1'" class="q-pa-md" id="EstadoSaludCuestionario">
                  <div class="q-gutter-xs">
                      <q-checkbox indeterminate-value="maybe" v-model="pregunta1" val="1" label="¿Intenso dolor?" />
                      <q-checkbox indeterminate-value="maybe" v-model="pregunta1" val="2" label="¿Inflamación del hombro? " />
                      <q-checkbox indeterminate-value="maybe" v-model="pregunta1" val="3" label="¿Sensibilidad extrema en la zona del hombro? " />
                      <q-checkbox indeterminate-value="maybe" v-model="pregunta1" val="4" label="¿Deformidad debajo de la piel? " />
                      <q-checkbox indeterminate-value="maybe" v-model="pregunta1" val="5" label="¿Coloración violácea o decoloración de la piel?" />
                      <q-checkbox indeterminate-value="maybe" v-model="pregunta1" val="6" label="¿Crujidos?" />
                      <q-checkbox indeterminate-value="maybe" v-model="pregunta1" val="7" label="¿Incapacidad de mover el brazo sin experimentar dolor?" />
                  </div>
                
                <br>
                <div class="q-px-sm">                 
                   <br>
                  preguntas seleccionadas {{pregunta1}}
                </div>
                 <br>
                 <div >
                      <p> Total: {{total}}</p>
                 </div>
                <q-btn color="primary" label="Enviar" @click="enviar"/>               
              </div>

            <!--  HombroIzq =2    -->
            <div v-if="idCuestionario == '2'" class="q-pa-md">
                
                <div class="q-gutter-sm">
              <q-checkbox indeterminate-value="maybe" v-model="pregunta1" val="1" label="¿Intenso dolor?" />
                      <q-checkbox indeterminate-value="maybe" v-model="pregunta1" val="2" label="¿Inflamación del hombro? " />
                      <q-checkbox indeterminate-value="maybe" v-model="pregunta1" val="3" label="¿Sensibilidad extrema en la zona del hombro? " />
                      <q-checkbox indeterminate-value="maybe" v-model="pregunta1" val="4" label="¿Deformidad debajo de la piel? " />
                      <q-checkbox indeterminate-value="maybe" v-model="pregunta1" val="5" label="¿Coloración violácea o decoloración de la piel?" />
                      <q-checkbox indeterminate-value="maybe" v-model="pregunta1" val="6" label="¿Crujidos?" />
                      <q-checkbox indeterminate-value="maybe" v-model="pregunta1" val="7" label="¿Incapacidad de mover el brazo sin experimentar dolor?" />
                </div>
                <br>
               <div class="q-px-sm">                 
                   <br>
                  preguntas seleccionadas {{pregunta1}}
                </div>
                 <br>
                 <div >
                      <p> Total: {{total}}</p>
                 </div>
                <q-btn color="primary" label="Enviar" @click="Recomendacion(total,idCuestionario)" @mouseenter="enviar"/>                  
              </div>

              
                <q-footer >
                    <Footer />
                </q-footer>
            </q-page-container>
        </q-layout>
    </div>
</template>

<script>

import Footer from 'components/piePagina.vue'
export default {
    name: 'EstadoSaludCuestionario',
    data() {
      return {
        idCuestionario: this.$route.params.id,
        pregunta1: [],           
        total: 0     
        }
    },
    methods:{
      enviar(){
        this.total = 0
        for (let i = 0; i < this.pregunta1.length; i++) {
          this.total +=  parseInt(this.pregunta1[i])         
        }
      },
        atras(){
            this.$router.go(-1)
        },
         Recomendacion(score,areaAfectada){
           console.log(score+'  '+areaAfectada)
            this.$router.push('/EstadoSaludRecomendacion'+score+'/'+areaAfectada)
        },
        reset () {
      this.pre1 = null
      this.pre2 = null
      this.pre3 = null
      this.pre4 = null
      this.pre5 = null
      this.pre6 = null
      this.pre7 = null      
      } ,
       
       
   },
  components: {
    Footer
     }
}

</script>
