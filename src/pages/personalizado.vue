<template>
    <div class="bg-paginas padding-items">
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
                  Personalizado
                </span>
              </q-toolbar>
            </q-header>
            <q-page-container class="column col">
              <div class="bg-input col-12 q-mt-lg   ">
                  <q-item clickable @click="doneEl = false" v-ripple dense>
                    <q-item-section>Frecuencia</q-item-section>
                    <q-item-section side>
                      <q-select borderless v-model="model" :options="options"/>
                    </q-item-section>
                  </q-item>
                  <q-separator inset />
                  <q-item clickable v-ripple >
                    <q-item-section avatar>
                      <q-item-label>Cada</q-item-label>
                    </q-item-section>
                    <q-item-section >
                      <q-select borderless dense v-model="dias" :options="diasOp"/>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label v-if="dias === 1 "> {{model.unitario}} </q-item-label>
                      <q-item-label v-else-if="dias != null && dias != 0 "> {{model.multiple}}  </q-item-label>
                    </q-item-section>       
                  </q-item>
              </div>
              <div class="text-grey-7 q-pt-md q-ml-sm q-mr-lg" v-if="dias != null || model != null">
                <p v-if="doneEl == false && (model.label == 'Diariamente' || model.label == 'Semanalmente' || model.value == 4)">
                  El recordatorio se repetira

                  <span v-if="model.value === 2 && diaSemana.length != 0 "> el 
                    <span v-for="diaSemana in opSemanas" :key="diaSemana.value">
                      <span v-if=" diaSemana.done">  
                        <span> {{diaSemana.label}}, </span> 
                      </span>
                    </span> 
                  </span>

                  <span v-if="model.value === 4 && MesAnio.length != 0">  en                  
                    <span v-for="MesAnio in MesesSelec" :key="MesAnio.mes">
                      <span v-if=" MesAnio.done">  
                        <span> {{MesAnio.value}}, </span> 
                      </span>
                    </span> 
                  </span>
                  
                   cada                  
                  <span v-if="dias == 1 || dias == null " > {{model.unitario}} </span>
                  <span v-else >{{dias}} {{model.multiple}}</span>
                </p>
                <p v-else-if="doneEl == true && model.label == 'Mensualmente'"> El recordatorio se repetirá
                   el {{NumOrdinal.label}} {{diaMesEl.label}} de cada 
                  <span v-if="dias == 1 || dias == null" > {{model.unitario}} </span>
                  <span v-else >{{dias}} {{model.multiple}}</span>
                </p>
                <p v-if="doneCada == true && model.label == 'Mensualmente'">
                  El recordatorio se repetirá
                  <span v-if="diaMesSelec.length != 0">
                    los días               
                    <span v-for="diaMes in diaMes" :key="diaMes.dia"> 
                      <span v-if="diaMes.done">{{diaMes.dia}}  </span>
                    </span> de
                  </span>
                   cada 
                  <span v-if="dias == 1 || dias == null " > {{model.unitario}} </span>
                  <span v-else >{{dias}} {{model.multiple}}</span>
                </p>
              </div>  
              <div v-if="model != null">
                <div class="bg-input q-mt-xs" v-if="model.label === 'Semanalmente'">
                  <div v-for="(item, index) in opSemanas" :key="index">
                    <q-item v-model="diaSemana" clickable v-ripple 
                    @click.stop="item.done = algo(item,index)" >
                      <q-item-section>{{item.label}} </q-item-section>
                        <q-item-section v-if="item.done" side=""  >
                          <q-btn flat round dense color="primary"
                            icon="check" />
                        </q-item-section> 
                    </q-item>
                    <q-separator inset />
                  </div>  
                </div> 
                <div class="bg-input q-mt-xs" v-if="model.label === 'Mensualmente'">
                  <q-item clickable v-ripple dense v-model="doneCada" @click="cambiarCheck(1)">
                    <q-item-section >Cada</q-item-section>
                    <q-item-section v-if="doneCada" side  >
                        <q-btn flat round dense color="primary"
                          icon="check" />
                      </q-item-section>
                  </q-item>
                  <q-separator inset />
                  <q-item  clickable v-ripple dense v-model="doneEl" @click="cambiarCheck(2)">
                    <q-item-section >El</q-item-section>
                    <q-item-section>
                      <q-select borderless dense v-model="NumOrdinal" :options="NumOrdinalOp"/>
                    </q-item-section>
                    <q-item-section side>
                      <q-select borderless dense v-model="diaMesEl" :options="opSemanas"/>
                    </q-item-section>
                    <q-item-section  v-if="doneEl" side  >
                        <q-btn flat round dense color="primary"
                          icon="check" />
                      </q-item-section>
                  </q-item>                   
                  <q-separator inset />             
                  <div v-if="doneCada" class="bg-input q-pa-md" > 
                    <span v-for="(dia, index) in diaMes" :key="dia.dia">
                      <q-btn size="md"   @click="dia.done = anadirDiaMes(dia,index)" unelevated 
                        padding="sm" :color="dia.color" text-color="black" :label="dia.dia" />
                    </span>
                  </div>
                </div>  

                <div class="bg-input q-mt-xs" v-if="model.value == 4">
                  <div class="bg-input q-pa-md text-center" > 
                    <span v-for="(mes, index) in MesesSelec" :key="mes.mes">
                      <q-btn size="md"   @click="mes.done = anadirMesAnio(mes,index)" unelevated 
                        padding="md" :color="mes.color" text-color="black" :label="mes.mes" />
                    </span>
                  </div>
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

const diasOp = []
for (let i = 1; i <= 1000; i++) {
  diasOp.push(i)
}
const diaMes = []
const dias1_9 = [
  {dia: '01', done: true, color: 'indigo-5'},
  {dia: '02', done: false, color: 'transparent'}, {dia: '03', done: false, color: 'transparent'},
  {dia: '04', done: false, color: 'transparent'},
  {dia: '05', done: false, color: 'transparent'}, {dia:'06', done: false, color: 'transparent'}, 
  {dia: '07',done: false, color: 'transparent'}, {dia: '08',done: false, color: 'transparent'}, {dia: '09', done: false, color: 'transparent'}]
for(let i = 0; i< dias1_9.length; i++){
  diaMes.push(
     dias1_9[i]
  )    
}
for(let i = 10; i<= 31; i++){
  diaMes.push({
    dia: i,
    done: false,
    color: 'transparent'
    })
}

export default {
    name: 'Personalizado',
    data() {
      return {
        dias: null,
        model: null,
        diaMesEl: null,
        diaSemana: ["domingo"],
        doneCada:true,
        MesesSelec: [
          {mes: 'Ene', done: true, color: 'indigo-5', value: 'enero' }, {mes: 'Feb', done: false, color: 'transparent', value: 'febrero' },
          {mes: 'Mar', done: false, color: 'transparent', value: 'marzo' }, {mes: 'Abr', done: false, color: 'transparent', value: 'abril' },
          {mes: 'May', done: false, color: 'transparent', value: 'mayo' }, {mes: 'Jun', done: false, color: 'transparent', value: 'mayo' },
          {mes: 'Jul', done: false, color: 'transparent' , value: 'julio'}, {mes: 'Ago', done: false, color: 'transparent' , value: 'agosto'},
          {mes: 'Sep', done: false, color: 'transparent' , value: 'septiembre' }, {mes: 'Oct', done: false, color: 'transparent', value: 'octubre' },
          {mes: 'Nov', done: false, color: 'transparent' , value: 'noviembre'}, {mes: 'Dic', done: false, color: 'transparent' , value: 'diciembre'},
        ],
        MesAnio: ['Ene'],
        doneEl: false,
        NumOrdinal: null,
        diaMesSelec: ["01"],
        diasOp: diasOp,
        diaMes: diaMes,
        options: [
          {label: 'Diariamente', value: 1, unitario: 'día', multiple: 'días' },
          {label: 'Semanalmente', value: 2, unitario: 'semana', multiple: 'semanas'},
          {label: 'Mensualmente', value: 3, unitario: 'mes', multiple: 'meses'},
          {label: 'Anualmente', value: 4, unitario: 'año', multiple: 'años'} 
        ],
        opSemanas: [
          {label: 'domingo', done: true},   
          {label: 'lunes',  done: false},  
          {label: 'martes',  done: false},
          {label: 'miércoles',  done: false},  
          {label: 'jueves',  done: false}, 
          {label: 'viernes', done:false },
          {label: 'sábado',  done: false}
        ],
        NumOrdinalOp: [
          {label: 'primer', done: true},
          {label: 'segundo', done: false},
          {label: 'tercer', done: false},
          {label: 'cuarto', done: false},
          {label: 'quinto', done: false},
        ]
      }
    },
    methods:{
        atras(){
            this.$router.go(-1)
        },
        cambiarCheck(index){
          if(index==1){
            this.doneCada = true
            this.doneEl = false
          }
          if(index == 2){
            this.doneEl = true
            this.doneCada =false
          }
          console.log(this.diasMes)
        },
        anadirDiaMes(dia, index){
          var conta = 0
          if(this.diaMesSelec.length != 0){
            for(var index = this.diaMesSelec.length - 1; index >= 0; --index){
              if (this.diaMesSelec[index].indexOf(dia.dia) != -1) {
                this.diaMesSelec.splice(index, 1);
                conta = 1
              }
              dia.color = 'transparent'
            }
          }
          if(conta == 0){
            this.diaMesSelec.push(
              (dia.dia).toString()
            )
            dia.color= 'indigo-5'
          }   
          return dia.done = !dia.done
          
        },
        algo(item,index){
          var cont = 0
          if(this.diaSemana.length != 0){
            for(var index = this.diaSemana.length - 1; index >= 0; --index){
              if (this.diaSemana[index].indexOf(item.label) !== -1) {
                this.diaSemana.splice(index, 1);
                cont = 1
              }
            }
          }         
          if(cont == 0){
            this.diaSemana.push(
              item.label
            )
          }        
          return item.done = !item.done
        },
        anadirMesAnio(item,index){
          var cont = 0
          if(this.MesAnio.length != 0){
            for(var index = this.MesAnio.length - 1; index >= 0; --index){
              if (this.MesAnio[index].indexOf(item.mes) !== -1) {
                this.MesAnio.splice(index, 1);
                cont = 1
              }
              item.color = 'transparent'
            }
          }         
          if(cont == 0){
            this.MesAnio.push(
              item.mes
            )
            item.color= 'indigo-5'
          }        
          return item.done = !item.done
        }
    },
  components: {
    Footer
  }
}
</script>

<style lang="scss">
    .bg-input{
        background: #F2F2F2;
    }
    .q-select__dropdown-icon{
      display: none;
    }
    .padding-items{
      .q-field__native{
      padding: 0px 0px 0px 50px;
      }
    }
    
    .color{
      color: #616161;
      background-color: cadetblue;
    }
</style>