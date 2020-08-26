<template>
  <q-page class="bg-grey-3 column">
    <div class="row q-pa-sm q-item__label">
      <q-input v-model="nuevaTarea" @keyup.enter="agregarTarea" class="col" square filled bg-color="white"
        label="Nueva tarea" dense>
        
        <template v-slot:append>
          <q-btn @click="agregarTarea" round dense flat icon="add" />
        </template>
      </q-input>
    </div>
    <q-list class="bg-white" separator bordered>
      <q-item  v-for="(task, index) in tasks" :key="task.title" 
        @click="task.done = !task.done" clickable
        :class="{ 'done bg-blue-1': task.done }" v-ripple>
        <q-item-section avatar>
          <q-checkbox v-model="task.done" 
            class="no-pointer-events"  color="primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{task.title}} </q-item-label>
        </q-item-section>
        <q-item-section v-if="task.done" side=""  >
          <q-btn @click.stop="deleteTask(index)" flat round dense color="primary"
           icon="delete" />
        </q-item-section>
      </q-item>
    </q-list>
    <div v-if="!tasks.length"
      class=" q-pa-md row items-center justify-around no-tasks absolute-center">
      <q-icon class="items-center" name="check" size="100px" color="primary" />
      <div class="text-h5 text-primary text-center">
        No hay más tareas
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data(){
    return{
      nuevaTarea:'',
      tasks: [ ]
    }
  },
  methods:{
    deleteTask(index){
      this.$q.dialog({
        title: 'Confirm',
        message: '¿Borrar?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.tasks.splice(index, 1)
        this.$q.notify('Tarea eliminada')
      })
    },
    agregarTarea(){
      this.tasks.push({
        title: this.nuevaTarea,
        done: false
      })
      this.nuevaTarea = ''
    }
  }
}
</script>

<style lang="scss">
  .done{
    .q-item__label{
      text-decoration: line-through;
      color: #bbb;
    }
  }
  .no-tasks{
    opacity: 0.5;
  }
</style>
