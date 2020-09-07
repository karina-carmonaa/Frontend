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
                <!--  para crear un nuevo usuario, guardar
                  <button @click="crearUsuario">Crear usuario</button> -->
                <div v-for="(item) in ListaUsuarios" :key="item.id">
                    <q-item clickable v-ripple @click="MenuUsuario()">
                        <q-item-section avatar>
                        <q-avatar>
                            <img :src= "item.imagen">
                        </q-avatar>
                        </q-item-section>
                        <q-item-section>{{item.attributes.name}}  </q-item-section>
                    </q-item>
                </div>  
                <q-btn dense unelevated @click="MenuUsuario"> Karina</q-btn>
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
import axios from "axios";
// axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://agemed.test/api/v1";
axios.defaults.headers = { "Content-Type": "application/vnd.api+json" };
//axios.defaults.baseURL = "http://localhost:8000/agemed/public/api/v1";
export default {
  name: "usuarios",
  data() {
    return {
      show: true,
      ListaUsuarios: null,
      user: {
        data: {
          type: "users",
          attributes: {
            name: "Karina Carmona 2",
            email: "karina2@gmail.com",
            password: "password",
            cuenta_id: 24,
            telefono: "9991339966",
            sexo: "Femenino",
            direccion: "Calle 53 #321 x 14a",
            fecha_nacimiento: "1988-09-09",
          },
        },
      },
    };
  },
  methods: {
    agregarUsuario() {
      this.$router.push("/nuevoUsuario");
    },
    EditarPerfil() {
      this.$router.push("/EditarPerfil");
    },
    MenuUsuario() {
      this.$router.push("/menuUsuario");
    },
    obtenerUsuarios() {
      axios.get("/cuentas/1/users").then((res) => {
        this.ListaUsuarios = res.data.data;
        console.log(this.ListaUsuarios);
      });
    },
    crearUsuario() {
      console.log(this.user)
      axios.post("/users", this.user).then((res) => {
        console.log(res.data);
      });
    },
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
</style>