<template>
  <q-page class="flex column">
    <div class="col q-px-xl"></div>
    <div class="col text-center">
      <div class="q-gutter-y-md  q-px-md">
          <label class="text-h3 text-weight-light" > Registro</label>     
        <q-input placeholder="Correo electrónico" outlined  type="email" v-model="form.email"/>
        <q-input v-model="form.password" type='password' outlined placeholder="Contraseña">         
        </q-input>
        <q-input bottom-slots outlined outlined v-model="form.password_confirmation" :type="isPwd ? 'password' : 'text'" placeholder="Confirmar contraseña" v-on:blur ="confirmar" v-on:focus="limpiar">
          <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer" @click="isPwd = !isPwd" />
          </template>
        </q-input>
        <span v-if="!aceptado" class="text-red">Las constraseñas no coinciden</span>
        <q-btn label="Crear usuario" class="full-width" @click="validar" rounded color="blue"/>
        <br><br>
        <span v-if="alert" class="text-red">Favor de llenar todos los campos del formulario</span>
        <div class="q-pt-xl text-center text-grey-9">
          <span class="text-center"> ¿Ya tienes una cuenta?
            <q-btn label="Inicia Sesión" flat :ripple="false" no-caps no-wrap to="/"  />
          </span>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>

import { mapActions } from 'vuex'
export default {
  name: 'regristro',
  data() {
    return {
      form: {
        password: null,
        email: null,
        password_confirmation: null
      },
      isPwd: true,
      aceptado: true,
      alert: false,
    }
  },
    methods: {
      ...mapActions({
        registro: 'auth/registro'
      }),
        confirmar(){
            if(this.form.password != this.form.password_confirmation){
              this.aceptado = false
            }else{
              this.aceptado = true
            }
        },
        async validar(){
          if( this.form.password == null || this.form.password_confirmation == '' ||
          this.form.email == null || this.form.email == ''){
            this.alert = true
          }else{
            this.alert = false
            await this.registro(this.form)
            //console.log("user: ",this.$store.getters.["auth/user"])
            this.$router.replace('/nuevoUsuario/'+localStorage.getItem("id_usuario"))
          }          
        },
        limpiar(){
          this.form.password_confirmation = null
          this.aceptado= true
        }
    }
}
</script>