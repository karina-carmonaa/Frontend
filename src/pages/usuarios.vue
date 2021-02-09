<template>
  <q-page class="bg-paginas">
    <div class="column col q-ma-sm q-mr-sm">
      <div class=" col column q-pt-xl q-ml-md" > 
        <div v-for="(item) in ListaUsuarios" :key="item.id">
          <q-item>
            <q-item-section class="text-left" rounded clickable v-ripple @click="MenuUsuario(item)">
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
      </div> 
    </div>
  </q-page>
</template>

<script>
import apiClient from '../service/api.js';
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
    MenuUsuario(usuario) {
      let linkHistorial = usuario.relationships.historial.links.self
      localStorage.setItem('id_usuario',usuario.id)
      apiClient.get(linkHistorial).then((respuesta) => {
        localStorage.setItem('id_historial',respuesta.data.data.id)
        this.$router.push("/menuUsuario");
      })
    },
    obtenerUsuarios() {
      let cuenta = localStorage.getItem('id_cuenta')
      apiClient.get("/api/v1/cuentas/"+cuenta+"/users").then((res) => {
        this.ListaUsuarios = res.data.data;
        this.$q.loading.hide()
      });
    },
    editarPerfilUsuario(id){
      this.$router.push("/nuevoUsuario/"+id)
    },
    eliminarPerfil(id){
      apiClient.delete("/api/v1/users/"+id).then((res) => {
        this.$q.notify('Usuario eliminado')
        apiClient.get("/api/v1/cuentas/"+cuenta+"/users").then((res) => {
          this.ListaUsuarios = res.data.data;
        });
      })
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