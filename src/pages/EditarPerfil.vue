<template>
    <div class="bg-paginas">
        <q-layout view="lHh Lpr lff" style="height: 300px" class="shadow-2 rounded-borders">
            <q-header class="bg-cyan-8 q-px-sm q-pt-md q-mb-md">
              <q-toolbar>
                <q-btn flat  dense size="sm" round @click="atras" class="platform-ios-only"
                  icon="arrow_back_ios"
                />
                <q-btn flat  dense size="sm" round @click="atras" class="platform-android-only"
                  icon="arrow_back"
                />
                <span class="q-subtitle-2 absolute-center ">
                  Editar perfil
                </span>
                <q-btn flat label="Guardar" size="sm" class="absolute-right"/>
              </q-toolbar>
            </q-header>
            <q-page-container class="column col q-ma-xl q-mr-sm">
                <div class="col text-center bg-transparent" v-for="(item,index) in nombreGrupo"
                :key="index">
                    <q-avatar size="100px" class="q-mb-sm">
                    <img :src="item.foto">
                    </q-avatar>
                    <div class="q-pt-xs">
                        <q-btn size="sm" class="bg-btn" unelevated rounded 
                        text-color="black" label="Cambiar foto" />
                    </div>
                    <q-input v-model="item.nombre" input-class="text-center" :dense="dense" />
                    <div class=" q-pt-sm text-weight-bold">Nombre del grupo
                    </div>
                    <!-- <div class="q-pt-xl">
                        <q-btn size="sm" class="bg-btn" unelevated rounded 
                        color="black" label="Guardar cambios" />
                    </div> -->
                </div>
                <q-footer class="q-px-xl">
                    <Footer />
                </q-footer>
            </q-page-container>
        </q-layout>
    </div>
</template>
<script>
import Footer from 'components/piePagina.vue'
export default {
    name: 'EditarPerfil',
    data() {
        return {
            dense: false,
            nombreGrupo: [
                {foto: 'https://cdn.quasar.dev/img/boy-avatar.png', nombre:'Familia Carmona'}
            ]
        }
    },
    methods:{
        atras(){
            this.$router.go(-1)
        }
    },
  components: {
    Footer
  }
}
</script>