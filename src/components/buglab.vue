<template>
  <div class="container">
    <header class="row row-cols-3 mb-3 mt-3">
      <h2 class="col display-6 fw-bolder text-success">Bug.Lab <span class="text-secondary fa fa-bug-slash"></span></h2>
      <p class="col"></p>
      <span class="col text-end">Reported <b-badge class="badge bg-gradient bg-secondary">{{ bugReportCounter }}</b-badge></span>
    </header>
    <!-- input -->
    <div class="p-2 gap-1 rounded-3 row">
      <div class="input-group input-group-lg">
        <input v-model="taskValue" type="text" placeholder="Report a bug" class="form-control" required>
      </div>
      <div class="input-group input-group-lg">
        <b-form-select class="form-control fs-6 text-secondary"
                       v-model="catValue"
                       :options="$store.state.categories"
                       required>
        </b-form-select>
        <b-form-select class="form-control fs-6 text-secondary"
                       v-model="prioValue"
                       :options="$store.state.priorities"
                       required
        ></b-form-select>
        <button @click="submitBug" class="btn bg-gradient btn-success"><i class="fa fa-bug"></i> Report</button>
      </div>
    </div>

    <!-- Bug Reports Data-->
    <div class="container">
      <h3 class="mt-3 text-secondary lead">Reports</h3>
      <div v-for="(task, index) in $store.state.tasks" :key="index">
        <div class="row py-3 row-cols-auto bug-report-list"  v-if="$store.state.tasks[index].isArchive === false"
             :class="{' bg-light': $store.state.tasks[index].isEdit === true}">
        <!-- Reports -->
          <div class="col-sm-12 col-md-12 col-lg-7 col-xl-8" >
            <div :class="{'text-success': task.status === 'done',
                          'text-primary': task.status === 'in-progress',
                          'text-secondary': task.status === 'refused' || task.status === 'waiting' }" class="bugreport" >
              <span class="lh-lg" v-show="!task.isEdit">
                 <i class="fs-6 fa fa-bug"></i> {{ task.name }}
              </span>
              <span class="lh-lg" v-show="task.isEdit">
                <b-badge class="badge bg-opacity-50 bg-gradient bg-secondary blinker">EDIT</b-badge>
                <!-- how the f** is this v-model working -->
                <input v-model="task.name"
                       @blur="$store.state.tasks[index].isEdit = false"
                       @keydown.enter="$store.state.tasks[index].isEdit = false"
                       class="task-edit-input" type="text">
              </span>

              <!--<b-badge v-if="(task.priority) === 'Highest' && (task.status) !== 'done'" class="bg-danger rounded-circle bg-gradient text-white">!</b-badge>-->
            </div>
          </div>
          <!-- Settings -->
          <div class="col-sm-12 col-md-12 col-lg-4 col-xl-4 align-content-end">

            <div class="d-inline-flex flex-row align-items-center">
              <div class="badge status settings-item"
                   :class="{'progress-bar-striped progress-bar-animated bg-primary': task.status === 'in-progress',
                            'bg-secondary': task.status === 'to-do',
                            'bg-success': task.status === 'done',
                            'bg-danger': task.status === 'refused',
                            'progress-bar-striped progress-bar-animated bg-opacity-75 bg-secondary': task.status === 'waiting',
                            }"
                   @click="changeStatus(index)">
                {{ task.status }}
              </div>

              <div v-show="!task.isEdit" class="badge text-secondary settings-item">
                {{ task.priority | upperCase }}
              </div>
              <b-form-select v-show="task.isEdit" class="badge task-edit text-secondary"
                             v-model="task.priority"
                             :options="$store.state.priorities"
                             @change="$store.state.tasks[index].isEdit = false"
                             required>
              </b-form-select>

              <div v-show="!task.isEdit" class="badge text-dark settings-item">
                {{ task.category | upperCase }}
              </div>
              <b-form-select v-show="task.isEdit" class="badge task-edit text-secondary"
                             v-model="task.category"
                             :options="$store.state.categories"
                             @change="$store.state.tasks[index].isEdit = false"
                             required>
              </b-form-select>

              <div class="text-center settings" v-b-tooltip.hover.left="'Edit'" @click="$store.state.tasks[index].isEdit = true">
                <span class="fa fa-edit "></span>
              </div>

              <div class="text-center settings" v-b-tooltip.hover.right="'Archive'" @click="ArchiveBug(index)">
                <div class="fa fa-archive" title="send to archive"></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <!-- data
    <table class="table mt-4 lh-lg">
      <thead class="text-secondary">
      <tr>
        <th scope="col">Reported Bugs</th>
        <th scope="col">Status</th>
        <th scope="col">Priority</th>
        <th scope="col">Category</th>
        <th scope="col">#</th>
        <th scope="col">#</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(task, index) in tasks" :key="index" >
        <td>
          <span :class="{'text-success': task.status === 'done',
                         'text-primary': task.status === 'in-progress',
                         'text-danger': task.status === 'refused'}" class="h6 bugreport" >
            <i class="fs-6 fa fa-bug" style="width: 30px"></i>
            {{ task.name }} <b-badge v-if="(task.priority) === 'highest' && (task.status) !== 'done'" class="bg-danger rounded-circle bg-gradient text-white">!</b-badge>
          </span>
        </td>
        <td style="width:120px;">
          <span class="badge status"
                :class="{'progress-bar-striped progress-bar-animated bg-primary': task.status === 'in-progress',
                          'bg-secondary': task.status === 'to-do',
                          'bg-success': task.status === 'done',
                          'bg-danger': task.status === 'refused',
                          'progress-bar-striped progress-bar-animated bg-warning': task.status === 'waiting',
                          }"
                @click="changeStatus(index)">
            {{ task.status }}</span>
        </td>
        <td>
          <span class="badge text-secondary">
            {{ task.priority | upperCase }}</span>
        </td>
        <td>
          <span class="badge text-dark">{{ task.category | upperCase }}</span>
        </td>
        <td>
          <div v-b-tooltip.hover.left="'Edit'" class="text-center settings" @click="editReport(index)">
            <span class="fa fa-edit "></span>
          </div>
        </td>
        <td>
          <div v-b-tooltip.hover.right="'Archive'" class="text-center settings" @click="deleteReport(index)">
            <span class="fa fa-archive" title="send to archive"></span>
          </div>
        </td>
      </tr>
      </tbody>
    </table>-->
  </div>
</template>

<script>
import {mapMutations, mapState, mapActions} from "vuex";
export default {
  name: 'Bug-Lab',
  data() {
    return {
    }
  },
  methods: {
    ...mapMutations ([
        'ArchiveBug', // Sends to archive
        'changeStatus' // Switches status to-do, in-progress, waiting, refused, done...
    ]),
    ...mapActions([
        'submitBug', // Async submit action
    ]),
  },
  computed: {
    ...mapState(['categories', 'priorities', 'statuses']),
    bugReportCounter() { // Returns total report count.
      return this.$store.state.tasks.length;
    },
    taskValue : { // Handling for v-model input
      get(){
        return this.$store.getters.getTask;
      },
      set(value){
        return this.$store.commit("setTaskData", value);
      }
    },
    catValue : { // Handling for v-model input
      get(){
        return this.$store.getters.getCat;
      },
      set(value){
        return this.$store.commit("setCatData", value);
      }
    },
    prioValue : { // Handling for v-model input
      get(){
        return this.$store.getters.getPrio;
      },
      set(value){
        return this.$store.commit("setPrioData", value);
      }
    }
  }
}
</script>