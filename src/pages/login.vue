<template>
  <q-page class="flex column">
    <div class="col q-pt-lg q-px-md"></div>
    <div class="col text-center">
      <q-img src="~assets/salud.png" style="max-width: 300px; height: 150px;" contain ></q-img>
      <div class="q-gutter-y-md  q-px-xl">
        <q-input v-model="nombre" label="Nombre de usuario">
          <template v-slot:append>
            <q-icon name="person" />
          </template>
        </q-input>
        <q-input v-model="contra" :type="isPwd ? 'password' : 'text'" label="Contraseña">
          <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer" @click="isPwd = !isPwd" />
          </template>
        </q-input>
        <span @click="inicio" class="text-right text-grey-9" to="/usuarios" flat :ripple="false" 
          no-caps no-wrap >¿Olvidaste tu contraseña? </span>
        <br>
        <q-btn label="Iniciar" class="full-width" rounded to="/usuarios" color="blue"/>
        <div class="q-pt-xl text-center text-grey-9">
          <span class="text-center"> ¿No tienes una cuenta?
            <q-btn label="Registrate" flat :ripple="false" no-caps no-wrap to="/registro"  />
          </span>
        </div>
      </div>
    </div>
  </q-page>
<!--     <div class="">
        <q-layout  view="lHh Lpr lff" class="shadow-2 rounded-borders">
            <q-page-container class="q-px-xl q-pt-xl q-mb-xl">
              <q-img
                src="~assets/salud.png"
                style="max-width: 300px; height: 100px;"
                contain
              ></q-img>
                <div class="q-gutter-y-md column q-pt-xl">
                  <!-- <p class="text-h5 text-center text-grey-9">Inicia sesión</p> 
                  <q-input v-model="nombre" label="Nombre de usuario">
                    <template v-slot:append>
                      <q-icon name="person" />
                    </template>
                  </q-input>
                  <q-input v-model="contra" :type="isPwd ? 'password' : 'text'" label="Contraseña">
                    <template v-slot:append>
                      <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                      />
                    </template>
                  </q-input>
                  <span @click="inicio" class="text-right text-grey-9" to="/usuarios" flat :ripple="false" 
                    no-caps no-wrap >¿Olvidaste tu contraseña? </span>
                  <q-btn label="Iniciar" rounded to="/usuarios" color="blue"/>
                </div>
                <div class="q-pt-xl text-center text-grey-9">
                  <span class="text-center"> ¿No tienes una cuenta?
                     <q-btn label="Registrate" flat :ripple="false" no-caps no-wrap to="/registro"  />
                  </span>
                </div>
            </q-page-container>
        </q-layout>
    </div> -->
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            nombre: '',
            contra: '',
            isPwd: true
        }
    },
    methods: {
      inicio(){
        this.$router.push('/usuarios')
      }
    }
}
</script>