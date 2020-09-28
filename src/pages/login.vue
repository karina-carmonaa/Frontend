<template>
  <q-page class="flex column">
    <div class="col q-pt-lg q-px-md"></div>
    <div class="col text-center">
      <q-img src="~assets/salud.png" style="max-width: 300px; height: 150px;" contain ></q-img>
      <div class="q-gutter-y-md  q-px-xl">
        <form @submit.prevent="inicio">
          <q-input v-model="form.nombre" label="Nombre de usuario">
            <template v-slot:append>
              <q-icon name="person" />
            </template>
          </q-input>
          <q-input v-model="form.contra" :type="isPwd ? 'password' : 'text'" label="Contraseña">
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer" @click="isPwd = !isPwd" />
            </template>
          </q-input>
          <span @click="inicio" class="text-right text-grey-9" to="/usuarios" flat :ripple="false" 
            no-caps no-wrap >¿Olvidaste tu contraseña? </span>
          <br> <br>
          <q-btn label="Iniciar" class="full-width" rounded @click="inicio" color="blue"/>
          </form>
          <div class="q-pt-xl text-center text-grey-9">
            <span class="text-center"> ¿No tienes una cuenta?
              <q-btn label="Registrate" flat :ripple="false" no-caps no-wrap to="/registro"  />
            </span>
          </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://agemed.test/api/v1";
axios.defaults.headers = { "Content-Type": "application/vnd.api+json" };
export default {
    name: 'login',
    data() {
        return {
          form: {
            nombre: 'karina',
            contra: '123',
            email: 'karina@ejemplo'
          },
            isPwd: true
        }
    },
    methods: {
      inicio(){
        axios.post("/cuentas",this.form).then((res)=> {
          console.log(res)
        })
        console.log(this.form)
      }
    }
}
</script>