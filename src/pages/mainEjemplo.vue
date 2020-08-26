<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
        />
        <!--  va dentro del botón de arriba
          @click="leftDrawerOpen = !leftDrawerOpen" -->
        <div class="q-px-lg q-pt-xl q-mb-md">
          <div class="text-h3">Todo</div>
          <div class="text-subtitle1">Hola</div>
          <div class="text-subtitle1">{{todaysDate}}</div>
        </div>
        <q-img
          src="~assets/perros.png"
        class="header-image absolute-top" />
      </q-toolbar>
    </q-header>

     <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        :width="250"
        :breakpoint="600"
      >
        <q-scroll-area style="height: calc(100% - 170px); margin-top: 170px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item to="/todo" exact clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="list" />
              </q-item-section>

              <q-item-section>
                Estado de salud hoy
              </q-item-section>
            </q-item>
             <q-item to="/seguimiento" exact clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="help" />
              </q-item-section>

              <q-item-section>
                Seguimiento de salud
              </q-item-section>
            </q-item>
            <q-item to="/ejemplo" exact clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="list" />
              </q-item-section>

              <q-item-section>
                Ejemplo del inicio
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="~assets/perros.png" style="height: 170px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="~assets/perfil.png">
            </q-avatar>
            <div class="text-weight-bold">Karina Carmona</div>
            <div></div>
          </div>
        </q-img>
      </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>      
    </q-page-container>
  </q-layout>
</template>

<script>

import { date } from 'quasar'
import EssentialLink from 'components/EssentialLink.vue'

export default {
  name: 'MainLayout',
  data(){
    return{
      leftDrawerOpen:false
    }
  },
  computed:{
    todaysDate(){
      let timeStamp = Date.now()
      let formattedString = date.formatDate(timeStamp, 'dddd D MMMM')
      return formattedString
    }
  }
}
</script>
 <style lang="scss">
   .header-image{
     height: 100%;
     z-index: -1;
     //opacity: 0.2; //para quedar un poco opaco
     //filter: grayscale(100%); //y en escala de grices
   }
 </style>