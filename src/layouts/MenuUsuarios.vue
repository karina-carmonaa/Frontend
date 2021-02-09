<template>
  <div class="column flex bg-primeraPagina">
        <q-layout view="lHh Lpr lff" class="shadow-2 rounded-borders">
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
            </q-header>

            <q-drawer
                v-model="leftDrawerOpen"
                show-if-above
                :width="250"
                :breakpoint="600"
              >
              <q-scroll-area style="height: calc(100% - 100px); margin-top: 100px; border-right: 1px solid #ddd">
                <q-list padding>
                  <q-item to="/usuarios" transition-show="jump-up" exact clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon name="person" />
                    </q-item-section>
                    <q-item-section>
                      Usuarios
                    </q-item-section>
                  </q-item>
                  <!-- <q-item to="/EstadoSalud" exact clickable v-ripple class="q-pl-lg">
                    <q-item-section avatar>
                      <q-icon name="person" />
                    </q-item-section>
                  <q-item-section>
                    Estado de salud hoy
                  </q-item-section>
                  </q-item>                  
                  <q-item to="/Seguimiento" exact clickable v-ripple class="q-pl-lg">
                    <q-item-section avatar>
                      <q-icon name="person" />
                    </q-item-section>
                  <q-item-section>
                    Seguimiento de salud
                  </q-item-section>
                  </q-item>                 
                  <q-item to="/Historial" exact clickable v-ripple class="q-pl-lg">
                    <q-item-section avatar>
                      <q-icon name="person" />
                    </q-item-section>
                  <q-item-section>
                    Historial médico
                  </q-item-section>
                  </q-item>                 
                  <q-item to="/Recordatorio" exact clickable v-ripple class="q-pl-lg">
                    <q-item-section avatar>
                      <q-icon name="person" />
                    </q-item-section>
                  <q-item-section>
                    Recordatorio de medicamentos
                  </q-item-section>
                  </q-item>                 
                  <q-item to="/MedicoAcudir" exact clickable v-ripple class="q-pl-lg">
                    <q-item-section avatar>
                      <q-icon name="person" />
                    </q-item-section>
                  <q-item-section>
                    A qué médico acudir
                  </q-item-section>
                  </q-item> -->
                  <q-item @click="cerrar" exact clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon name="list" />
                    </q-item-section>
                    <q-item-section>
                      Cerrar Sesión
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-scroll-area>

              <q-img class="absolute-top bg-cyan-8"  style="height: 100px">
              <div class="absolute-bottom bg-transparent">
                  <div class="text-weight-bold">Ajustes</div>
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
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'MenuUsuario',
  data(){
    return{
      leftDrawerOpen:false,
      carga: false
    }
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout'
    }),
    async cerrar(){
      await this.logout();
      this.$router.replace("/")
    }
  },
}
</script>
 <style lang="scss">
 .bg-footer{
   background: #d7d2cc;
 }
  .bg-primeraPagina{
      background: linear-gradient(to bottom, #ada996, #f2f2f2); 
  }
  .q-item__section--avatar{
      min-width: 0px;
  }
 </style>