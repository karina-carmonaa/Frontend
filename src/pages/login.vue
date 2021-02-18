
<template>
  <q-page class="flex column"> 
    <div class="col q-px-md"></div>
    <div class="col text-center">
      <q-img src="~assets/salud.png" style="max-width: 300px; height: 150px;" contain ></q-img>
      <div class="q-gutter-y-md  q-px-md">
        <form @submit.prevent="inicio" class="q-gutter-y-md">
          <q-input v-model="form.email" outlined rounded placeholder="Correo electrónico">
            <template v-slot:append>
              <q-icon name="person" />
            </template>
          </q-input>
          <q-input v-model="form.password" outlined rounded :type="isPwd ? 'password' : 'text'" placeholder="Contraseña" >
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
          <label class="q-pb-md text-red-5 text-weight-bold">{{respuesta}} </label>
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
          email: '',
          password: '',
        },
      isPwd: true,
      user: {},
      respuesta: null,
    }
  },
  methods: {
    ...mapActions({
      login: 'auth/login'
    }),
    async inicio(){
      if(this.form.password != '' && this.form.email != ''){
        await this.login(this.form)
        .catch((err) => {
          this.respuesta = err.response.data.errors.email[0]
          console.log(err.response.data.errors.email[0])
        })
      } else this.respuesta = 'Favor de llenar todos los campos del formulario.'
    }
  }
}
</script>