<template>
  <q-page>
      <div class="column q-pa-xl q-gutter-sm">
        <q-btn unelevated class="bg-cyan-9 text-cyan-1" rounded label="Estado de salud hoy" no-caps 
        @click="Estado"/>
        <q-btn unelevated class="bg-cyan-9 text-cyan-1" rounded label="Seguimiento de salud" no-caps 
        @click="Seguimiento"/>
        <q-btn unelevated class="bg-cyan-9 text-cyan-1" rounded label="Historial médico" no-caps 
        @click="Historial"/>
        <q-btn unelevated class="bg-cyan-9 text-cyan-1" rounded label="Recordatorio medicamentos" no-caps 
        @click="Recordatorio"/>
        <q-btn unelevated class="bg-cyan-9 text-cyan-1" rounded label="A qué médico acudir" no-caps
        @click="Medico" />
      </div>
  </q-page>
</template>

<script>
export default {
    name: 'menuUsuario',
    data() {
        return {
            
        }
    },
    methods:{
        Estado(){
            this.$router.push('/EstadoSalud')
        },
        Seguimiento(){
             this.$router.push('/Seguimiento')
        },
        Historial(){
             this.$router.push('/menuHistorial')
        },
        Recordatorio(){
             this.$router.push('/Recordatorio')
        },
        Medico(){
             this.$router.push('/MedicoAcudir')
        }
    }
}
</script>