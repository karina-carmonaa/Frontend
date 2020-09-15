<template>
  <div class="column flex" :class="bgClass">
    <template v-if="carga">  
        <div class="col text-center q-pt-xl q-mt-xl">
          <div>
            <img fluid src="~assets/salud.png" class="fixed-center">
          </div>
        </div>
        <div class="text-center absolute-bottom">
          <img src="~assets/agemed.png">
        </div>  
      </template>
      <template v-else>
    <q-layout view="lHh Lpr lff" style="height: 300px" class="shadow-2 rounded-borders">
            <q-header class="bg-cyan-8 q-px-sm q-pt-md q-mb-md">
              <q-toolbar>
                <q-btn
                @click="leftDrawerOpen = !leftDrawerOpen"
                  flat
                  dense
                  round
                  icon="menu"
                  aria-label="Menu"
                />
              </q-toolbar>
              <q-btn flat label="Agregar" no-caps @click="agregarUsuario" class="absolute-right q-pt-md"/>
            </q-header>

            <q-drawer elevated
                v-model="leftDrawerOpen"
                show-if-above
                :width="250"
                :breakpoint="600"
              >
              <q-scroll-area style="height: calc(100% - 100px); margin-top: 100px; border-right: 1px solid #ddd">
                <q-list padding>
                  <q-item to="/" transition-show="jump-up" exact clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon name="person" />
                    </q-item-section>
                  <q-item-section>
                    Usuarios
                  </q-item-section>
                  </q-item>
                  <q-item to="/seguimiento" exact clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon name="list" />
                    </q-item-section>
                    <q-item-section>
                      Configuraciones
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-scroll-area>

              <q-img class="absolute-top bg-cyan-8"  style="height: 100px">
              <div class="absolute-bottom bg-transparent">
                  <!-- <q-avatar size="56px" class="q-mb-sm">
                    <img src="~assets/perfil.png">
                  </q-avatar> -->
                  <div class="text-weight-bold">Nombre de grupo</div>
                  <div></div>
                </div>
              </q-img>
            </q-drawer>

            <q-page-container>
              <router-view />
            </q-page-container>

            <q-footer class="q-px-xl">
              <div class="fixed-bottom text-center">
                <q-toolbar class="bg-footer">
                  <img src="~assets/agemed.png" class="fixed-bottom-center fixed-center-bottom">
                </q-toolbar>
              </div>
            </q-footer>
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
  beforeCreate() {
    this.timer = setTimeout(() => {
      this.carga=false
      this.timer = void 0
    }, 2000)
  },
  computed:{
    bgClass(){
      if(this.carga){
        return 'bg-inicio'
      } else{
        return 'bg-primeraPagina'
      }
    }
  },
  methods:{
    agregarUsuario(){
      this.$router.push("/nuevoUsuario/0");
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
    background: linear-gradient(to bottom, #6dd5fa, #ffffff); 
  }
  .bg-primeraPagina{
      background: linear-gradient(to bottom, #ada996, #f2f2f2); 
  }
 </style>