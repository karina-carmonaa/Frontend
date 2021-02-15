<template>
  <div class="column flex" :class="bgClass">
    <template v-if="carga">  
        <div class=" text-center q-pt-xl q-mt-xl">
          <div>
            <img fluid src="~assets/salud.png" class="fixed-center">
          </div>
        </div>
        <div class="text-center absolute-bottom">
          <img src="~assets/agemed.png">
        </div>  
    </template>
    <template v-else>
      <q-layout view="lHh Lpr lff" class="shadow-2 rounded-borders">
        <q-page-container>
          <router-view />
        </q-page-container>
      </q-layout>
    </template>
  </div>
</template>

<script>
export default {
  name: 'MainLayout',
  data(){
    return{
      leftDrawerOpen:false,
      carga: false
    }
  },
  beforeMount() {
    this.timer = setTimeout(() => {
      this.carga=false
      this.timer = void 0
    }, 2000)
    //this.$router.push('/login')
  },
  computed:{
    bgClass(){
      return 'bg-inicio'
    }
  }
}
</script>
 <style lang="scss">
 .bg-footer{
   background: #d7d2cc;
 }
   .header-image{
     height: 100%;
     z-index: -1;
     //opacity: 0.2; //para quedar un poco opaco
     //filter: grayscale(100%); //y en escala de grices
   }
  .bg-inicio{
    background: linear-gradient(to bottom, #50c9c3, #96deda, #b2ebf2); 
  }
 </style>