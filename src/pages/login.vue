
<template>
  <q-page class="flex column"> 
    <div class="col q-pt-lg q-px-md"></div>
    <div class="col text-center">
      <q-img src="~assets/salud.png" style="max-width: 300px; height: 150px;" contain ></q-img>
      <div class="q-gutter-y-md  q-px-xl">
        <form @submit.prevent="inicio">
          <q-input v-model="form.email" label="Correo electrónico">
            <template v-slot:append>
              <q-icon name="person" />
            </template>
          </q-input>
          <q-input v-model="form.password" :type="isPwd ? 'password' : 'text'" label="Contraseña">
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer" @click="isPwd = !isPwd" />
            </template>
          </q-input>
          <span class="text-right text-grey-9">
            <q-btn flat no-caps no-wrap to="/resetPassword" >
             ¿Olvidaste tu contraseña?
            </q-btn> 
          </span>
          <br> <br>
          <q-btn label="Iniciar" type="iniciar" class="full-width" rounded color="blue"/>
        </form>
        <div class="q-pt-xl text-center text-grey-9">
          <span class="text-center"> ¿No tienes una cuenta?
            <q-btn label="Registrate" flat no-caps no-wrap to="/registro"  />
          </span>
        </div>
      </div>
    </div>
  </q-page>
</template>  

<script>
import { mapActions } from 'vuex'

export default {
  name: 'login',
  data() {
    return {
      form: {
          email: 'ejemploFinal1@ejemplo.com',
          password: '12345678',
        },
      isPwd: true,
      user: {}
    }
  },
  methods: {
    ...mapActions({
      login: 'auth/login'
    }),
    async inicio(){
      await this.login(this.form)
      this.$router.replace("/usuarios")
    }
  }
}
</script>