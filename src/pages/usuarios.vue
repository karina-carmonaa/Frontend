<template>
    <q-page class="bg-paginas">
       <div class="column col q-ma-sm q-mr-sm">
          <div class="col text-center bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold">Nombre del grupo</div>
            <div class="q-pt-xs"><q-btn size="xs" class="bg-btn" unelevated rounded 
               @click="EditarPerfil()" color="black" label="Editar grupo" /></div>
          </div>
            <div class=" col column q-pt-xl q-ml-md" >
                <div v-for="(item, index) in ListaUsuarios" :key="item.id">
                    <q-item clickable v-ripple @click="MenuUsuario()">
                        <q-item-section avatar>
                        <q-avatar>
                            <img :src= "item.imagen">
                        </q-avatar>
                        </q-item-section>
                        <q-item-section>{{item.attributes.name}}  </q-item-section>
                    </q-item>
                </div>  
            </div> 
            <div class=" q-ml-md q-pb-xl">
                <q-separator />
                <q-item clickable v-ripple @click="agregarUsuario">
                    <q-item-section avatar>
                        <q-btn unelevated round icon="add" />
                    </q-item-section>
                    <q-item-section>Agregar Usuario</q-item-section>
                </q-item>
            </div>
        </div>
    </q-page>
</template>

<script>
import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://backend.test/api/v1';
export default {
    name: 'usuarios',
    data() {
        return {
            show: true,
            ListaUsuarios: null,
        }
    },   
    methods:{
        agregarUsuario(){
            this.$router.push('/nuevoUsuario')
        },
        EditarPerfil(){
            this.$router.push('/EditarPerfil')
        },
        MenuUsuario(){
            this.$router.push('/menuUsuario')
        },
        obtenerUsuarios(){
            axios.get("/users").then( res => {
                this.ListaUsuarios = res.data.data
                console.log(this.ListaUsuarios)
            });
        }
    },
    mounted() {
        this.obtenerUsuarios();
    },
}
</script>
<style lang="scss">
    .bg-btn{
        opacity: 0.5;
    }
</style>