<template>
  <div class="bg-paginas">
    <q-layout view="lHh Lpr lff" style="height: 300px" class="shadow-2 rounded-borders">
      <q-header class="bg-cyan-8 q-px-sm q-pt-md q-mb-md">
        <q-toolbar>
          <q-btn flat  dense size="sm" round @click="atras" class="platform-ios-only" icon="arrow_back_ios"/>
          <q-btn flat  dense size="sm" round @click="atras" class="platform-android-only" icon="arrow_back"/>
          <span class="q-subtitle-2 absolute-center ">
            Recuperar contraseña
          </span>
        </q-toolbar>
      </q-header>
      <q-page-container class="column col q-ma-xl q-mr-sm">
        <div class="col text-center bg-transparent">
          <div class="q-pt-xs">
            <label> Correo electrónico</label>
          </div>
          <q-input v-model="form.email" input-class="text-center" dense />
          <q-linear-progress :value="progress" :buffer="buffer" color="secondary"/>
          <label class="q-mt-xl">{{respuestaError}} </label>
          <div class=" q-pt-md text-weight-bold">
            <q-btn label="Aceptar" no-caps class="full-width" @click="resetPassword" rounded color="blue"/>
          </div> 
          <q-dialog v-model="enviado" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <q-avatar icon="done_outline" color="positive" text-color="white" />
                <span class="q-ml-sm q-pt-md text-center">{{respuesta204}}.</span>
              </q-card-section>
              <!--v-close-popup -->
              <q-card-actions align="right">
                <q-btn flat label="Aceptar" color="positive" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
        <q-footer class="q-px-xl">
          <Footer />
        </q-footer>
      </q-page-container>
    </q-layout>
  </div>
</template>


<script>
import Footer from 'components/piePagina.vue'
import apiClient from 'src/service/api'
export default {
  name: 'resetPassword',
  data() {
    return {
      form: {        
        email: 'karina.carmonav@hotmail.com'
      },
      progress: 0.00,
      buffer: 0.00,
      respuesta204: null,
      respuestaError: null,
      enviado: false,
      cancelEnabled: false
    }
  },
  methods:{
    atras(){
      this.$router.go(-1)
    },
    async resetPassword(){
      this.progress = this.buffer = 0
      if(this.form.email == null || this.form.email == ""){
        this.respuesta = "Favor de escribir un correo electrónico valido"
      } else {
        this.bufferInterval = setInterval(() => {
          if (this.buffer < 1) {
            this.progress = Math.min(1, this.buffer, this.progress + 0.1)
            this.buffer = Math.min(1, this.buffer + Math.random() * 0.2)
          }
        }, 700)
      await apiClient.get('/sanctum/csrf-cookie') 
        apiClient.post("/password/email", this.form)
        .then((res) => {     
          this.progress = 1;
          this.buffer = 1;
          this.enviado = true
          this.respuesta204 = res.data.message
        })  
        .catch((error) => {
          this.respuestaError = error.response.data.errors.email[0]
          this.progress = 1;
          this.buffer = 1;
        })
      }
    }
  },
  components: {
    Footer
  }
}
</script>