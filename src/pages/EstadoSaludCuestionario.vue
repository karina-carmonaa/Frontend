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
                  <div class="q-gutter-sm">
                      <q-checkbox  indeterminate-value="false" v-model="pre1" label="¿Intenso dolor?" />
                    </div>
                    <div class="q-gutter-sm">
                      <q-checkbox indeterminate-value="maybe" v-model="pre2" label="¿Inflamación del hombro?" />
                    </div>
                    <div class="q-gutter-sm">
                      <q-checkbox indeterminate-value="maybe" v-model="pre3" label="¿Sensibilidad extrema en la zona del hombro?" />
                    </div>
                    <div class="q-gutter-sm">
                      <q-checkbox indeterminate-value="maybe" v-model="pre4" label="¿Deformidad debajo de la piel?" />
                    </div>
                    <div class="q-gutter-sm">
                      <q-checkbox indeterminate-value="maybe" v-model="pre5" label="¿Coloración violácea o decoloración de la piel?" />
                    </div>
                    <div class="q-gutter-sm">
                      <q-checkbox indeterminate-value="maybe" v-model="pre6" label="¿Crujidos?" />
                    </div>
                    <div class="q-gutter-sm">
                      <q-checkbox indeterminate-value="maybe" v-model="pre7" label="¿Incapacidad de mover el brazo sin experimentar dolor?" />
                  </div>
                
                <br>
                <div class="q-px-sm">
                 
                   <br>
                  The model data: <strong>{{ JSON.stringify(pre1) }}</strong>
                </div>
                 <br>
                 <div >
                      <p> Total: {{total}}</p>
                 </div>
                <q-btn color="primary" label="Enviar" />               
              </div>

            <!--  HombroIzq =2    -->
            <div v-if="idCuestionario == '2'" class="q-pa-md">
                
                <div class="q-gutter-sm">
                  <q-checkbox  indeterminate-value="false" v-model="pre1" label="¿Intenso dolor?" @click="suma(1)" />
                </div>
                <div class="q-gutter-sm">
                  <q-checkbox indeterminate-value="maybe" v-model="pre2" label="¿Inflamación del hombro?" @checked="suma(2)" />
                </div>
                <div class="q-gutter-sm">
                  <q-checkbox indeterminate-value="maybe" v-model="pregunta" label="¿Sensibilidad extrema en la zona del hombro?"  val="1" v-on:click="suma(2)"/>
                </div>
                <div class="q-gutter-sm">
                  <q-checkbox indeterminate-value="maybe" v-model="pregunta" label="¿Deformidad debajo de la piel?"  val="2"/>
                </div>
                <div class="q-gutter-sm">
                  <q-checkbox indeterminate-value="maybe" v-model="pregunta" label="¿Coloración violácea o decoloración de la piel?" />
                </div>
                <div class="q-gutter-sm">
                  <q-checkbox indeterminate-value="maybe" v-model="pregunta" label="¿Crujidos?" />
                </div>
                <div class="q-gutter-sm">
                  <q-checkbox indeterminate-value="maybe" v-model="pregunta" label="¿Incapacidad de mover el brazo sin experimentar dolor?" />
                </div>
                <br>
                <div class="q-px-sm">
                  Total: <strong>{{pregunta}}</strong>
                </div>
                 <br>
                <q-btn  color="primary" label="Enviar" @click="Recomendacion" />               
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
        pregunta:[],
        pre1:null,
        pre2:null,
        pre3:null,
        pre4:null,
        pre5:null,
        pre6:null,
        pre7:null,        
        total: 0,
        check: 1,
        valor:0,
        preguntasHombro:[{value:null,text:"¿Intenso dolor?"},
                   {value:null,text:"¿Inflamación del hombro?"},
                   {value:null,text:"¿Sensibilidad extrema en la zona del hombro?"},
                   {value:null,text:"¿Deformidad debajo de la piel?"},
                   {value:null,text:"¿Coloración violácea o decoloración de la piel?"},
                   {value:null,text:"¿Crujidos?"},
                   {value:null,text:"¿Incapacidad de mover el brazo sin experimentar dolor?"}
                  ]
      }
    },
    methods:{
        atras(){
            this.$router.push("/EstadoSalud");
        },
         Recomendacion(){
            this.$router.push('/EstadoSaludRecomendacion')
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
       suma(valor) {
       // se debe parsear porque Vue transforma el valor vacío a string
       this.total=20
       console.log("entre a suma")
       if (this.pre1===true) {suma=Number(this.pre1.id) }
       if (this.pre2===true) {suma=Number(this.pre1.id) }
       if (this.pre3===true) {suma=Number(this.pre1.id) }
       return this.total
       }   
              
    },
     computed: {
    algo(){
      console.log("entre algo")
      this.total=this.total+ this.pregunta.values
      return this.total
    },
         
     
   },
  components: {
    Footer
     }
}

</script>
