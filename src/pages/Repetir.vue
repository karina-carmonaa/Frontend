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
                  Repetir
                </span>
              </q-toolbar>
            </q-header>
            <q-page-container class="column col">
              <div class="bg-input text-left col-12 q-mt-lg" >
                <div v-for="(item, index) in opcFrecuencia" :key="index">
                  <q-item v-model="done" clickable v-ripple @click="cambiarCheck(index)" ><!-- :class="{ 'done bg-grey-2': item.done }" -->
                    <q-item-section>{{item.titulo}} </q-item-section>
                      <q-item-section v-if="item.done" side=""  >
                        <q-btn flat round dense color="primary"
                          icon="check" />
                      </q-item-section> 
                  </q-item>
                  <q-separator inset />
                </div>   
              </div> 
              <div class="bg-input text-left col-12 q-mt-sm">
                  <q-item v-model="donePersonalizado" @click="done = !done" clickable v-ripple to="/personalizado" >
                    <q-item-section>Personalizado</q-item-section>
                    <q-item-section v-if="done" side=""  >
                        <q-btn flat round dense color="primary"
                          icon="check" />
                      </q-item-section> 
                    <q-item-section v-else avatar>
                        <q-icon name="arrow_forward_ios" class="platform-ios-only" />
                        <q-icon name="arrow_forward" class="platform-android-only" />
                  </q-item-section>
                  </q-item>
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
    name: 'Repetir',
    data() {
        return {
            done: true,
            donePersonalizado: false,
            opcFrecuencia: [
                {id: 0, titulo: 'Nunca', done: false }, {id: 1, titulo: 'Cada día', done: false },
                {id: 2, titulo: 'Cada semana', done: false },{id: 3, titulo: 'Cada dos semanas', done: false },
                {id: 4, titulo: 'Cada mes', done: false }, {id: 5, titulo: 'Cada 3 meses', done: false },
                {id: 6, titulo: 'Cada seis meses', done: false},{id: 7, titulo: 'Cada año', done: false} ]
        }
    },
    methods:{
        atras(){
            this.$router.go(-1)
        },
        cambiarCheck(index){
          for (let i = 0; i < this.opcFrecuencia.length ; i++) {
            this.opcFrecuencia[i].done = false
            this.done = false
            if(index == this.opcFrecuencia[i].id){
              this.opcFrecuencia[i].done = true
            }  
          }
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
</style>