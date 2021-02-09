<template>
    <div class="bg-paginas"  v-if="recordatorio">
        <q-layout view="lHh Lpr lff" class="shadow-2 rounded-borders">
            <q-header class="bg-cyan-8 q-px-sm q-pt-md q-mb-md">
              <q-toolbar>
                <q-btn flat label="Cancelar" no-caps @click="atras" class="absolute-left"
                />
                <span v-if="id == (0).toString()" class="q-subtitle-2 absolute-center ">
                  Agregar recordatorio
                </span>
                <span v-else class="q-subtitle-2 absolute-center "> Editar recordatorio </span>
               <!--  <q-btn flat label="Guardar" v-if="id == (0).toString() " @click="guardarMedicamento" no-caps class="absolute-right"/> -->
               <q-btn flat label="Guardar" v-if="id == (0).toString() " @click="ejemplo" no-caps class="absolute-right"/>
                <q-btn flat label="Guardar" v-else @click="editarMedicamento" no-caps class="absolute-right"/>
              </q-toolbar>
            </q-header>
            <q-page-container class="row q-ma-lg">
              <div class="q-gutter-y-xs col-12 padding">
                <p v-if="validacion" class=" text-center">Favor de llenar todos los datos</p>      
                <q-input class="text-center" bottom-slots filled dense v-model="medicamento">
                  <template v-slot:before>
                    <p class="text-caption no-margin text-black">Medicamento:</p>
                  </template> 
                </q-input>
                    <q-item class="text-center">
                      <q-item-section >
                        <q-select borderless filled dense v-model="frecuencia" :options="frecuenciaOps"/>
                      </q-item-section>
                      <q-item-section >
                        <q-item-label> cada </q-item-label>
                      </q-item-section>
                      <q-item-section >
                        <q-select borderless filled dense v-model="horas" @input="borrarHorarios" :options="horasOps"/>
                      </q-item-section>
                      <q-item-section v-if="typeof horas != 'string'" >
                        <q-item-label v-if="horas == 1 || horas == null "> hora </q-item-label>
                        <q-item-label v-else-if="horas > 1 "> horas  </q-item-label>
                      </q-item-section>       
                    </q-item>
                    <br v-if="horas == 24 || horas == null">
                    <div v-if="typeof horas === 'string'">
                      <br />
                      <q-input v-model="Horas24" filled type="time" class="text-center" bottom-slots dense>
                        <template v-slot:before>
                          <p class="text-caption no-margin text-black">Horario: </p>
                        </template>
                      </q-input>
                    </div>                    
                    <div v-if="horas > 2  && horas < 13 " class="q-pb-sm" >
                      <p class="text-center q-mt-md">
                        Horarios sugeridos: 
                      </p>
                      <q-select v-if="horas == 4" borderless dense  filled v-model="horarios" :options="horariosSugeridos4Horas"/> 
                      <q-select v-if="horas == 6" borderless dense  filled v-model="horarios" :options="horariosSugeridos6Horas"/> 
                      <q-select v-if="horas == 8" borderless dense  filled v-model="horarios" :options="horariosSugeridos8Horas"/> 
                      <q-select v-if="horas == 12" borderless dense  filled v-model="horarios" :options="horariosSugeridos12Horas"/> 
                      <br>
                    </div>
                    <div v-if="typeof horas != 'string'" class="col-6 q-pr-xl">
                      <q-select @input="onChange" class="text-center" bottom-slots filled dense v-model="duracion "
                      :options="cantidadDias" transition-show="jump-up" transition-hide="jump-up" >
                        <template v-slot:before>
                          <p class="text-caption no-margin text-black " >Duración:</p>
                        </template> 
                        <template v-slot:after>
                          <p v-if="duracion == 1" class="text-caption no-margin text-black"> día</p>
                          <p v-else class="text-caption no-margin text-black"> días</p>
                        </template>
                      </q-select>
                    </div>
                <q-input type="time" v-model="tiempo" />
                <q-btn color="primary" label="Get Picture" @click="captureImage" />

                <img :src="imageSrc">
                <q-input v-model="dateInicio" filled type="date" today transition-show="scale" transition-hide="scale"
                    mask="date" label="Fecha de inicio"  stack-label input-class="text-center" />
                    <br>                  
                <q-input v-model="dateFin" filled type="date" transition-show="scale" transition-hide="scale"
                  mask="date" label="Fecha final" today  stack-label input-class="text-center" />
                  <br>
                <q-toggle v-model="repetir" label="Activar recordatorio" size="lg" left-label class="text-subtitle1 float-right" icon="alarm" />
              </div>
              <div class="q-pt-md col-12" v-if="id != '0'">
                <q-btn class="full-width text-center"  @click="eliminar" label="Eliminar"
                  no-caps rounded unelevated color="red-5" >  
                </q-btn>
              </div>
              <q-footer>
                <Footer />
              </q-footer>
            </q-page-container>
        </q-layout>
    </div>
    <div v-else>
      <datos :dia="datosDia" :cada="datosCada" :recordatorio="recordatorio" @ActualizandoValores="ActualizarValores"/> 
    </div>
</template>

<script>
import { date } from 'quasar'
import Footer from 'components/piePagina.vue'
import apiClient from '../service/api.js';
import datos from 'pages/personalizado.vue'

const cantidad = []
for (let i = 1; i < 32; i++) {
  cantidad.push(i)  
}
export default {
    name: 'nuevoRecordatorio',
    data() {
      return {
        imageSrc: '',
        tiempo: null,
        datosDia: 1,
        datosCada: "1",
        recordatorio: true,
        validacion: false,
        horariosSugeridos4Horas: [
          { label: '8:00 am, 12:00 pm, 4:00 pm, 8:00 pm', value: '8,12,16,20' },
          { label: '9:00 am, 1:00 pm, 5:00 pm, 9:00 pm', value: '9,13,17,21' },
          { label: '10:00 am, 2:00 pm, 6:00 pm, 10:00 pm', value: '10,14,18,22' }
        ],
        horariosSugeridos6Horas: [
          { label: '8:00 am, 2:00 pm, 8:00 pm', value: '8,14,20' },
          { label: '9:00 am, 3:00 pm, 9:00 pm', value: '9,15,21' },
          { label: '10:00 am, 4:00 pm, 10:00 pm', value: '10,16,22' },
          { label: '11:00 am, 5:00 pm, 11:00 pm', value: '11,17,23' }
        ],
        horariosSugeridos8Horas: [
          { label: '8:00 am, 4:00 pm', value: '8,16' },
          { label: '9:00 am, 5:00 pm', value: '9,17' },
          { label: '10:00 am, 6:00 pm', value: '10,18' },
          { label: '11:00 am, 7:00 pm ', value: '11,19' },
          { label: '12:00 pm, 8:00 pm', value: '12,20' },
          { label: '1:00 pm, 9:00 pm', value: '13,21' },
          { label: '2:00 pm, 10:00 pm', value: '14,22' },
          { label: '3:00 pm, 11:00 pm', value: '15,23' }
        ],
        horariosSugeridos12Horas: [
          { label: '8:00 am, 8:00 pm', value: '8,20' },
          { label: '9:00 am, 9:00 pm', value: '9,21' },
          { label: '10:00 am, 10:00 pm', value: '10,22' },
          { label: '11:00 am, 11:00 pm', value: '11,21' },
          { label: '12:00 am, 12:00 pm', value: '0,12' }
        ],
        id: this.$route.params.id,
        hora: null,
        dateInicio: null,
        dateFin: null,
        medicamento: '',
        horas: null,
        frecuencia: null,
        cantidadDias: cantidad,
        Horas24: null,
        text: null,
        duracion: null,
        horarios: null,
        Medidas: [ 'ml','mg'],
        dosis: null,
        repetir: true,
        activar: "",
        ResMedi: null,
        frecuenciaOps: ['1/4','1/2','1','2','3','4'],
        horasOps: [4,6,8,12,24,'Elegir otro horario'],
        idHistorial: localStorage.getItem('id_historial'),
      }
    },
    methods:{
      atras(){
        this.$router.go(-1)
      },
      eliminar(){
        apiClient.delete("/api/v1/medicamentos/"+this.id)
        this.$router.go(-1)
      },
      borrarHorarios(){
        //this.horarios = null
        if (this.horas == "Elegir otro horario"){
          this.recordatorio = false
        }
      },
      fechaActual(){
        var d = new Date();
        var dia = d.getUTCDate();
        if (dia < 10){
          dia = "0"+dia
        }
        var mes =  ("0" + (d.getMonth() + 1)).slice(-2);
        var año = d.getUTCFullYear();
        this.dateInicio = año + "-" + mes + "-" + dia; 
      },
      onChange: function(){
          let fecha=this.dateInicio;          
          fecha = date.addToDate(this.dateInicio, { days: this.duracion });
          let formatoFecha = date.formatDate(fecha, 'YYYY-MM-DD')
          this.dateFin=formatoFecha;
      },
      guardarMedicamento(){
        if(this.repetir == false) this.activar = "0"
          else this.activar = "1"
        if(this.medicamento != '' && this.duracion != null && this.frecuencia != null && this.horas != null) {
            this.validacion = false
            apiClient.post("/api/v1/medicamentos", {
              data: {
                type: "medicamentos",
                attributes: {
                  historial_id: this.idHistorial,
                  nombre: this.medicamento,
                  dosis: this.dosis,
                  duracion: this.duracion,
                  fecha_inicio: this.dateInicio,
                  fecha_final: this.dateFin,
                  //frecuenciaHoras: this.horarios.value,
                  frecuencia: this.horarios.label,
                  cada: this.frecuencia,
                  hora: this.horas,
                  activar: this.activar
                },
              },
            }).then((res) => {
              this.$q.notify('Recordatorio guardado')
              this.$router.go(-1)
            });
         } else{
           this.validacion = true
         }
      },
      obtenerMedicamento(){
        apiClient.get("/api/v1/medicamentos/"+this.id).then((respuesta) => {
          this.ResMedi = respuesta.data.data.attributes
          this.medicamento = this.ResMedi.nombre
          this.dosis = this.ResMedi.dosis
          this.duracion = this.ResMedi.duracion
          this.dateInicio = this.ResMedi.fecha_inicio
          this.dateFin = this.ResMedi.fecha_final
          this.horarios = this.ResMedi.frecuencia
          this.horas = this.ResMedi.hora
          this.frecuencia = this.ResMedi.cada
          this.activar = this.ResMedi.activar
          if(this.activar == 0) this.repetir = false
            else this.repetir = true
        })
      },
      editarMedicamento(){            
        if(this.repetir == false) this.activar = "0"
          else this.activar = "1"    
        if(this.medicamento != '' && this.duracion != null && this.frecuencia != null && this.horas != null) {
          this.validacion = false
          console.log(this.horarios)
          apiClient.patch("/api/v1/medicamentos/"+this.id, {
            data: {
              type: "medicamentos",
              id: this.id,
              attributes: {
                nombre: this.medicamento,
                dosis: this.dosis,
                duracion: this.duracion,
                fecha_inicio: this.dateInicio,
                fecha_final: this.dateFin,
                //frecuenciaHoras: this.horarios.value,
                frecuencia: this.horarios.label,
                cada: this.frecuencia,
                hora: this.horas,
                activar: this.activar,
              },
            },
          }).then((res) => {
            this.$q.notify('Recordatorio guardado')
            this.$router.go(-1)
          })
        } else{
          this.validacion = true
          }
      },
      atrasPersonal(){
        this.recordatorio = true
      },
      ActualizarValores(newValue, valor2, valor3) {
        if(newValue == 1) this.horas = valor2
          else this.horas = newValue+" "+valor2
        this.recordatorio = valor3
      },
      ejemplo(){
        //console.log(this.dateInicio, this.tiempo, this.horarios)
        //let tiempo_dia = new Date((this.dateInicio+" "+this.tiempo).replace(/-/g,"/")).getTime();
        //console.log(tiempo_dia)
        /*cordova.plugins.notification.local.hasPermission(function(granted){
          if(granted == true) ActivarRecordatorio(1,"prueba titulo 1","prueba mensaje 1", "1611260760000")
            else {
              cordova.plugins.notification.local.registerPermission(function(granted){
                if(granted == true) ActivarRecordatorio(1,"prueba titulo 1","prueba mensaje 1", "1611260760000")
                  else navigator.notification.alert("No tiene permiso")
              });              
            }
        });*/
        cordova.plugins.notification.local.schedule({
          title: 'My first notification',
          text: 'Thats pretty easy...',
          foreground: true
        });
      },
      ActivarRecordatorio(id, titulo, mensaje, dia_hora){
        cordava.plugins.notification.local.schedule({
          id: id,
          title: titulo,
          message: mensaje,
          at: dia_hora
        })
        let arreglo = [id, titulo, mensaje, dia_hora]
        info.data[info.data.length] = arreglo
        localStorage.setItem("rp_data", JSON.stringify(info))

        navigator.notification.alert("exito")
      },      
      captureImage () {
        Navigator.camera.getPicture(
          data => { // on success
            this.imageSrc = `data:image/jpeg;base64,${data}`
          },
          () => { // on fail
            this.$q.notify('Could not access device camera.')
          },
          {
            // camera options
          }
        )
      },
    },
  components: {
    Footer, datos
  },
  mounted() {
    //console.log(this.datosGeneral)
    this.fechaActual(); 
    if(this.id != 0){
      this.obtenerMedicamento()
    }
  }  
}
</script>

