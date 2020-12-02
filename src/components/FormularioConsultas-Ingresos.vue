<template>
    <div>  
        <div class="bg-paginas">
          <q-layout view="lHh Lpr lff" class="shadow-2 rounded-borders">
            <q-header class="bg-cyan-8 q-px-sm q-pt-md q-mb-md">
              <q-toolbar>
                <q-btn flat  dense size="sm" round @click="atras" class="platform-ios-only"
                icon="arrow_back_ios" />
                <q-btn flat  dense size="sm" round @click="atras" class="platform-android-only"
                icon="arrow_back" />
                <span class="q-subtitle-2 absolute-center ">
                    {{tipo}}
                </span>
                <q-btn flat label="Guardar" no-caps @click="guardarConsulta()" class="absolute-right"/>
            </q-toolbar>
            </q-header>
            <q-page-container class="row q-ma-lg">
              <div class="q-gutter-y-sm col-12">
                <q-input filled dense v-model="motivo" >
                  <template v-slot:before>
                    <p class="text-body2 text-black">Motivo: </p>
                  </template>
                </q-input>
                <q-input  v-model="fecha" dense filled type="date" today transition-show="scale" transition-hide="scale"
                    mask="date" stack-label >
                  <template v-slot:before>
                    <p class="text-body2 text-black">Fecha:</p>
                  </template>
                </q-input>
                <q-input filled dense v-model="medico">
                    <template v-slot:before>
                    <p class="text-body2 text-black">Médico:</p>
                    </template>
                </q-input>
                <q-input v-model="telefono" filled  mask="(###) ### - ####" stack-label unmasked-value dense>
                  <template v-slot:before>
                    <p class="text-body2 text-black">Teléfono:</p>
                  </template>
                </q-input>
                <q-input filled dense v-model="hospital">
                  <template v-slot:before>
                    <p class="text-body2 text-black">Hospital:</p>
                  </template>
                </q-input>
              </div>
              <div class="text-center q-mt-md column">
                <p class="text-h6 text-black">Receta médica</p>
              </div>
              <br/>
              <div class="q-pa-md row q-gutter-sm">
                <q-card v-for="(imagen, key) in imagenes" :key="key">
                  <q-img :src = "imagen.img_url"/> 
                  <q-card-section vertical class="q-pt-xs text-subtitle2 text-center">
                    <q-input dense v-model="imagen.img_descrip" placeholder="Nota" >
                      <template v-slot:append>
                        <q-btn round dense flat icon="delete" @click="eliminar(key, imagen.img_url, imagen.img_id)" />
                      </template>
                    </q-input >
                  </q-card-section> 
                </q-card> 
              </div>        
              <input type="file" @change="uploadFile" style="display:none" ref="fileInput" multiple 
                accept=".jpg, image/*" @rejected="onRejected" auto-upload/>
              <div class="q-pt-md col-12">
                <q-btn class="full-width text-center"  @click="$refs.fileInput.click()" label="Agregar Imagen"
                  no-caps rounded unelevated color="secondary" >  
                </q-btn>
              </div>
              <div class="q-pt-md col-12" v-if="this.id != '0'">
                <div class="q-pa-md q-gutter-lg text-center">            
                  <q-btn color="negative" label="Eliminar" @click="eliminarConsulta" no-caps rounded unelevated />
                  <q-btn color="green-7" label="Compartir" no-caps rounded  unelevated />
                </div>
              </div>
              <q-footer>
                <Footer />
              </q-footer>
            </q-page-container>
          </q-layout>
        </div>  
    </div>
</template>

<script>
import apiClient from '../service/api.js';
import Footer from 'components/piePagina.vue'
import tipo from 'pages/IngresosNuevos.vue'

let fileData
let idHistorial = JSON.parse(localStorage.getItem('id_historial'));
export default {
  name: 'FormularioConsultas-Ingresos.vue',
  data() {
    return {
      motivo: null,
      fecha: null,
      medico: null,
      telefono: null, 
      hospital: null,
      receta: false,      
      id: this.$route.params.id, 
      imagenes: [],
      path: [],
      RespuestaImagenes: [],
      tipoMinusculas: this.tipo.toLowerCase()
    }
  },
  components:{
    Footer
  },
  props: {
    tipo: String,
    tipoImagen: String
  },
  methods:{
    atras(){ this.$router.go(-1) },  
    //este metodo sirve para mostrar las imagenes en la pantalla
    uploadFile(event) {  
      for (let i = 0; i < event.target.files.length; i++) {
        try {
          let url = URL.createObjectURL(event.target.files[i]) 
          this.imagenes.push({img_url: url, img_descrip: "" })
          this.receta = true
          //añadimos el path de los archivos seleccionados
          this.path.push(event.target.files[i])
        } catch (error) {
          console.log(error)
        }        
      }      
    },
    onRejected (rejectedEntries) {
      //por si algo sale mal al momento de cargar las imagenes
      this.$q.notify({
        type: 'negative',
        message: '${rejectedEntries.length} los archivos no pasaron la validación'
      })
    },
    eliminarConsulta(){
      apiClient.delete('api/v1/'+this.tipoMinusculas+'/'+this.id).then(() => {
        //eliminamos las imagenes igual, relacionadas con esta consulta
        for (let i = 0; i < this.imagenes.length; i++) {
          fileData = new FormData()
          fileData.append("actualizar", true)
          fileData.append("nombre", this.imagenes[i].img_url)
          apiClient.post('upload', fileData);
        }
        //todo sale bien, nos regresamos a la página anterior
        this.$router.go(-1) 
      })
    },
    guardarConsulta(){
      if (this.id == 0) {
        //guarda una nueva consulta
        apiClient.post('api/v1/'+this.tipoMinusculas, {
          data: {
            type: this.tipoMinusculas,
            attributes: {
              historial_id: idHistorial,
              motivo: this.motivo,
              medico: this.medico,
              telefono: this.telefono,
              hospital: this.hospital,
              fecha: this.fecha
            }
          }
        }).then((res) => {       
          let id = res.data.data.id 
          for (let i = 0; i < this.path.length; i++) {
            this.guardarImagenes(i, id);
          } 
          //todo salio bien y regresa a la siguiente página
          this.$q.notify(this.tipoMinusculas+'guardado')
          this.$router.go(-1) 
        });
      } else {
          //edita la consulta existente segun el id
          apiClient.patch('api/v1/'+this.tipoMinusculas+'/'+this.id,{
          data: {
            type: this.tipoMinusculas,
            id: this.id,
            attributes: {
              historial_id: idHistorial,
              motivo: this.motivo,
              medico: this.medico,
              telefono: this.telefono,
              hospital: this.hospital,
              fecha: this.fecha
            }
          }
        }).then(() => {                 
            //si tiene algun nuevo valor en el path se guarda en la base de datos
            if (this.path.length != 0) { 
              for (let i = 0; i < this.path.length; i++) {
                this.guardarImagenes(i, this.id )
              } 
            } else{
              //se actualizan todas las descripciones de las imagenes antiguas       
              for (let i = 0; i < this.imagenes.length; i++) {
                apiClient.patch('api/v1/'+this.tipoImagen+'/'+this.imagenes[i].img_id,{
                  data: {
                    type: this.tipoImagen,
                    id: this.imagenes[i].img_id,
                    attributes: {
                      descripcion: this.imagenes[i].img_descrip
                    }
                  }
                })              
              } 
            }          
          //todo salio bien y regresa a la siguiente página
          this.$q.notify('Ingreso guardado')
          this.$router.go(-1) 
        });
      }
    },       
    ObtenerDatos(){
      if(this.id != 0){
        apiClient.get('api/v1/'+this.tipoMinusculas+'/'+this.id).then((res) => {
          let respuestaApi = res.data.data.attributes
          this.motivo = respuestaApi.motivo,
          this.medico = respuestaApi.medico,
          this.telefono = respuestaApi.telefono
          this.hospital = respuestaApi.hospital
          this.fecha = respuestaApi.fecha
          apiClient.get('api/v1/'+this.tipoMinusculas+'/'+this.id+'/'+this.tipoImagen).then((resDoc) => {
            let datos = resDoc.data
            for (let i = 0; i < datos.data.length; i++) {
              this.receta = true              
              this.imagenes.push({
                img_url: datos.data[i].attributes.url_imagen, 
                img_descrip: datos.data[i].attributes.descripcion,
                img_id: datos.data[i].id
              })         
            }
          })          
        })
      }
    },
    guardarImagenes(i, id){
      //verifico que son imagenes nuevas en la parte de editar
      let NuevasFotos = this.imagenes.length - this.path.length
      let datosDescripcion
      if (NuevasFotos == 0 ) datosDescripcion = this.imagenes[i].img_descrip
        else datosDescripcion = this.imagenes[i+NuevasFotos].img_descrip 

      //esta medio chafa pero funciona, se tiene que inicialiar cada vez que cambie le file_path, o tantas veces
      //como fotos se seleccionen. se pasan todos los valores para hacer el guardado 
      fileData = new FormData();
      fileData.append("id",id) //id del ingreso para hacer la relación          
      fileData.append("idHi",idHistorial) //id del historial correspondiente al ingreso       
      fileData.append("type", this.tipo) //this.tipo de imagen que se va a guardar
      fileData.append("cont", i) //para diferenciar las imagenes que se envian del mismo ingreso
      fileData.append("file_path", this.path[i]) //datos de la foto i a enviar            
      apiClient.post('upload', fileData).then((response) => {
        //una vez que ya se guardo la imagen en el servidor y guardamos todos los datos en un arreglo 
        //se guarda la url y la descripción que se haya puesto en la tabla correspondiente con la api.
        if (this.tipoImagen == "estudios") {
          apiClient.post('api/v1/estudios', {
            data: {
              type: 'estudios',
              attributes: {
                consulta_id: id,
                descripcion: datosDescripcion,
                url_imagen: response.data.path
              }
            }
          })
        } else {
          apiClient.post('api/v1/documentos', {
            data: {
              type: 'documentos',
              attributes: {
                ingreso_id: id,
                descripcion: datosDescripcion,
                url_imagen: response.data.path
              }
            }
          })

        }
        
      }); 
    },
    eliminar(id, nombre, idImagen){
      this.imagenes.splice(id, 1)
      if(idImagen!= undefined ){
        fileData = new FormData()
        fileData.append("actualizar", true)
        fileData.append("nombre", nombre)
        apiClient.post('upload', fileData);
        apiClient.delete('api/v1/'+this.tipoImagen+'/'+idImagen);
      }
    }
  },
  mounted() {
    this.ObtenerDatos();
  },
}
</script>