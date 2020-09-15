<template>
    <q-page class="bg-paginas">
       <div class="column col q-ma-sm q-mr-sm">
          <div class="col text-center bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold">Nombre del grupo</div>
            <div class="q-pt-xs"><q-btn size="xs" class="bg-btn" unelevated rounded 
               @click="EditarPerfil()" color="black" label="Editar grupo" />
            </div>
          </div>
            <div class=" col column q-pt-xl q-ml-md" >                
                <div v-for="(item) in ListaUsuarios" :key="item.id">
                    <q-item>
                        <!-- <q-item-section avatar>
                        <q-avatar>
                            <img :src= "item.imagen">
                        </q-avatar>
                        </q-item-section> -->
                        <q-item-section class="text-left" rounded clickable v-ripple @click="MenuUsuario(item.id)">
                          {{item.attributes.name}}  </q-item-section>
                        <q-item-section top side>
                          <div class="text-grey-8 q-gutter-xs">
                            <q-btn size="12px" flat dense round icon="more_vert" >
                            <q-menu >
                              <q-list style="min-width: 150px">
                                <q-item clickable v-close-popup  @click="editarPerfilUsuario(item.id)">
                                  <q-item-section>Editar perfil</q-item-section>
                                </q-item>
                                <q-separator />
                                <q-item clickable v-close-popup  @click="eliminarPerfil(item.id)">
                                  <q-item-section>Eliminar perfil</q-item-section>
                                </q-item>
                              </q-list>
                            </q-menu>

                            </q-btn>
                          </div>
                        </q-item-section>
                    </q-item>
                </div> 
                <q-btn dense unelevated @click="MenuUsuario"> Karina</q-btn>
            </div> 
    </div>
  </q-page>
</template>

<script>
import { LocalStorage, SessionStorage } from 'quasar'

import axios from "axios";
// axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://agemed.test/api/v1";
axios.defaults.headers = { "Content-Type": "application/vnd.api+json" };
export default {
  name: "usuarios",
  data() {
    return {
      show: true,
      ListaUsuarios: null
    };
  },
  methods: {
    EditarPerfil() {
      this.$router.push("/EditarPerfil");
    },
    MenuUsuario(id) {
      localStorage.setItem('id_usuario',id)
      this.$router.push("/menuUsuario");
    },
    obtenerUsuarios() {
      axios.get("/cuentas/1/users").then((res) => {
        this.ListaUsuarios = res.data.data;
        localStorage.setItem('id_cuenta', JSON.stringify(1))
      });
    },
    editarPerfilUsuario(id){
      this.$router.push("/nuevoUsuario/"+id)
    },
    eliminarPerfil(id){
      axios.delete("/users/"+id).then((res) => {
        this.$q.notify('Usuario eliminado')
      })
      this.ListaUsuarios = null
      axios.get("/cuentas/1/users").then((res) => {
        this.ListaUsuarios = res.data.data;
        localStorage.setItem('id_cuenta', JSON.stringify(1))
      });
    }
  },
  mounted() {
    this.obtenerUsuarios();
  },
};
</script>
<style lang="scss">
.bg-btn {
  opacity: 0.5;
}
.bg-color{
  background-color:#2193b0;
}
</style>