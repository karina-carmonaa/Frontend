<template>
    <div>
        <div class="fixed-bottom text-center">
            <q-toolbar class="bg-footer">
              <img src="~assets/agemed.png" class="fixed-bottom-center fixed-center-bottom" @click="PaginaPrincipal">
            </q-toolbar>
          </div>
    </div>
</template>

<script>
export default {
    name: 'piePagina',
    methods:{
         PaginaPrincipal() {
          this.$router.push('/menuUsuario/')
        },
        
        
    },
}


</script>

<style lang="scss">
    .bg-footer{
     background: #d7d2cc;
    }
</style>