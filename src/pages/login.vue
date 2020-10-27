<template>
  <q-page class="flex column">
    <div class="col q-pt-lg q-px-md"></div>
    <div class="col text-center">
      <q-img src="~assets/salud.png" style="max-width: 300px; height: 150px;" contain ></q-img>
      <div class="q-gutter-y-md  q-px-xl">
        <form @submit.prevent="inicio">
          <q-input v-model="email" label="Correo electrónico">
            <template v-slot:append>
              <q-icon name="person" />
            </template>
          </q-input>
          <q-input v-model="password" :type="isPwd ? 'password' : 'text'" label="Contraseña">
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer" @click="isPwd = !isPwd" />
            </template>
          </q-input>
          <span class="text-right text-grey-9" to="/usuarios" flat :ripple="false" 
            no-caps no-wrap >¿Olvidaste tu contraseña? </span>
          <br> <br>
          <q-btn label="Iniciar" type="iniciar" class="full-width" rounded color="blue"/>
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
import apiClient from '../service/api.js';
export default {
    name: 'login',
    data() {
        return {
            email: 'karina2@ejemplo.com',
            password: '123',
            isPwd: true
        }
    },
    methods: {
      inicio(){
        this.$router.push('/usuarios')
        /* apiClient.get('/sanctum/csrf-cookie')
          .then(response => {
              apiClient.post('/login' , {
                    email: this.email,
                    password: this.password
              }).then(response => {
                  console.log(response)
              })
          }); */
      }
    }
}
</script>