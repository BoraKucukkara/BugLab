<template>
  <div class="container">
    <div class="container mt-3">
      <h3 class="mt-3 text-secondary lead">Archive</h3>
      <div v-for="(task, index) in $store.state.tasks" :key="index">
        <!-- Archive List -->
        <div class="row row-cols-auto bug-report-list"  v-if="$store.state.tasks[index].isArchive === true">
          <div class="col-sm-12 col-md-12 col-lg-7 col-xl-8">
            <div :class="{'text-success': task.status === 'done',
                          'text-primary': task.status === 'in-progress',
                          'text-secondary': task.status === 'refused' || task.status === 'waiting' }" class="bugreport mx-2" >
              <i class="fs-6 fa fa-bug" style="width: 1rem"></i>
              {{ task.name }} <b-badge v-if="(task.priority) === 'Highest' && (task.status) !== 'done'" class="bg-danger rounded-circle bg-gradient text-white">!</b-badge>
            </div>
          </div>
          <!-- Settings -->
          <div class="col-sm-12 col-md-12 col-lg-4 col-xl-4 align-content-end">

            <div class="d-inline-flex flex-row align-items-center">
              <div class="badge  settings-item"
                   :class="{'progress-bar-striped progress-bar-animated bg-primary': task.status === 'in-progress',
                            'bg-secondary': task.status === 'to-do',
                            'bg-success': task.status === 'done',
                            'bg-danger': task.status === 'refused',
                            'progress-bar-striped progress-bar-animated bg-opacity-75 bg-secondary': task.status === 'waiting',
                            }">
                {{ task.status }}
              </div>

              <div class="badge text-secondary settings-item">
                {{ task.priority | upperCase }}
              </div>

              <div class="badge text-dark settings-item">
                {{ task.category | upperCase }}
              </div>
              <div class="badge text-dark settings-item">
                {{ task.isArchive }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bug-archive",
  data(){
    return {}
  },
}
</script>
