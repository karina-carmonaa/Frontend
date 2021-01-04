<template>
  <div>
    <Formulario tipo="Ingresos" tipoImagen="documentos" />
  </div>
</template>

<script>
import Formulario  from 'components/FormularioConsultas-Ingresos.vue'

export default {
  name: 'IngresosNuevos',
  components: {
    Formulario
  }
}
</script>