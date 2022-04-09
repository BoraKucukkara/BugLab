<template>
  <div class="container">
    <h2 class="display-6 fw-bolder mt-3 mb-3 text-success">Bug.Lab <span class="text-secondary fa fa-bug-slash">/ report and fix some bugs</span></h2>
    <!-- input -->
    <div class="d-flex input-group input-group-lg">
      <input v-model="task" type="text" placeholder="Report a bug" class="form-control w-50">
      <select v-model="cat" class="form-control">
        <option>Back-end</option>
        <option>Front-end</option>
        <option>UI/UX</option>
      </select>
      <select v-model="prio" class="form-control">
        <option>high</option>
        <option>medium</option>
        <option>low</option>
      </select>
      <button @click="submitReport" class="btn btn-success"><i class="fa fa-bug"></i></button>
    </div>

    <!-- data -->
    <table class="table mt-4 lh-lg">
      <thead class="text-secondary ">
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
      <tr v-for="(task, index) in tasks" :key="index">
        <th>
          <span :class="{'text-success': task.status === 'done',
                         'text-primary': task.status === 'in-progress',
                         'text-danger': task.status === 'refused'}" class="h6" >
            <i class="fs-6 fa fa-bug" style="width: 30px"></i>
            {{ task.name }}
          </span>
        </th>
        <td style="width:120px;">
          <span class="badge  status"
                :class="{'progress-bar-striped progress-bar-animated bg-primary': task.status === 'in-progress',
                          'bg-secondary': task.status === 'to-do',
                          'bg-success': task.status === 'done',
                          'bg-danger': task.status === 'refused',
                          }"
                @click="changeStatus(index)">
            {{ task.status }}</span>
        </td>
        <td>
          <span>{{ task.priority }}</span>
        </td>
        <td>
          <span>{{ task.category }}</span>
        </td>
        <td>
          <div class="text-center settings" @click="editReport(index)">
            <span class="fa fa-edit "></span>
          </div>
        </td>
        <td>
          <div class="text-center settings" @click="deleteReport(index)">
            <span class="fa fa-archive" title="send to archive"></span>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Bug-Lab',
  props: {
    msg: String
  },
  data() {
    return {
      task: '',
      cat: '',
      prio: '',
      editedReport: null,
      statuses: ['to-do', 'in-progress', 'done', 'refused'],
      priorities: ['high', 'medium', 'low'],
      tasks: [
        {
          name: 'Account page profile picture shows same picture twice',
          status: 'to-do',
          category: 'UI/UX',
          priority: 'high',
        },
        {
          name: 'User logout not working on profile page ',
          status: 'done',
          category: 'Back-end',
          priority: 'low',
        },
        {
          name: 'Homepage link returns http, should be https',
          status: 'to-do',
          category: 'Front-end',
          priority: 'medium',
        }
      ]
    }
  },
  methods: {
    submitReport() {
      if(this.task.length === 0) return;
      if(this.editedReport == null) {
        this.tasks.push({
          name: this.task,
          status: 'to-do',
          category: this.cat,
          priority: this.prio
        });
      } else {
          this.tasks[this.editedReport].name = this.task;
          this.tasks[this.editedReport].category = this.cat;
          this.tasks[this.editedReport].priority = this.prio;
          this.editedReport = null;
      }
      this.task = '';
    },
    deleteReport(index){
      this.tasks.splice(index, 1);
    },
    editReport(index) {
      this.task = this.tasks[index].name;
      this.cat = this.tasks[index].category;
      this.prio = this.tasks[index].priority;
      this.editedReport = index;
    },
    changeStatus(index) {
      let newIndex = this.statuses.indexOf(this.tasks[index].status);
      if(++newIndex > 3) newIndex = 0;
      this.tasks[index].status = this.statuses[newIndex];
    }
  }
}
</script>


<style scoped>
tr {
  transition: all 0.3s;
}
.status {
  cursor: pointer;
}
.settings {
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 20px;
}
.settings:hover {
  color: #018001;
  background: white;
}
tr:hover {
  background-color: #f3f3f3;

}
</style>
