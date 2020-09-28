<template>
  <q-page class="flex column">
    <div class="col q-pt-lg q-px-xl"></div>
    <div class="col text-center">
      <div class="q-gutter-y-md  q-px-xl">
          <label class="text-h4" > Registro</label>
        <q-input v-model="nombre" label="Nombre de usuario" />        
        <q-input label="Correo electrónico" type="email" v-model="correo"/>
        <q-input v-model="contra" type='password' label="Contraseña">         
        </q-input>
        <q-input bottom-slots v-model="confirmacion" :type="isPwd ? 'password' : 'text'"
          label="Confirmar contraseña" v-on:blur ="confirmar" v-on:focus="limpiar">
          <template v-slot:after>
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
export default {
    name: 'regristro',
    data() {
        return {
            nombre: null,
            contra: null,
            isPwd: true,
            confirmacion: null,
            aceptado: true,
            alert: false,
            correo: null
        }
    },
    methods: {
        confirmar(){
            if(this.contra != this.confirmacion){
              this.aceptado = false
            }else{
              this.aceptado = true
            }
        },
        validar(){
          if(this.nombre == null || this.contra == null || this.nombre == '' || this.contra == '' ||
          this.correo == null || this.correo == ''){
            this.alert = true
          }else{
            this.alert = false
          }
        },
        limpiar(){
          this.confirmacion = null
          this.aceptado= true
        }
    }
}
</script>