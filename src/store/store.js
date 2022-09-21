import Vue from "vue";
import Vuex from "vuex";


Vue.use(Vuex);

export const store = new Vuex.Store({
    state : {
        task: '', // Temp data to handling v-model on submit
        cat: null,  // Temp data to handling v-model on submit
        prio: null, // Temp data to handling v-model on submit
        selected: null,
        statuses: ['to-do', 'waiting', 'in-progress', 'done', 'refused'],
        priorities: [{ value: null, disabled: true, text: 'Priority' }, 'Highest', 'High', 'Medium', 'Low', 'Lowest'],
        categories: [{ value: null, disabled: true, text: 'Category' }, 'Front-end', 'Back-end', 'UI/UX'],
        tasks: [
            {
                name: 'Account page profile picture shows same picture twice',
                status: 'to-do',
                category: 'UI/UX',
                priority: 'High',
                isArchive: false,
                isEdit: false
            },
            {
                name: 'User logout not working on profile page ',
                status: 'done',
                category: 'Back-end',
                priority: 'Low',
                isArchive: false,
                isEdit: false
            },
            {
                name: 'Need a back link to event page ',
                status: 'done',
                category: 'Back-end',
                priority: 'Low',
                isArchive: false,
                isEdit: false
            },
            {
                name: 'Homepage link returns http, should be https',
                status: 'waiting',
                category: 'Front-end',
                priority: 'Medium',
                isArchive: false,
                isEdit: false
            }
        ]
    },
    getters : {
        getTask(state){
            return state.task;
        },
        getCat(state){
            return state.cat;
        },
        getPrio(state){
            return state.prio;
        }
    },
    mutations: {
        ArchiveBug(state, index){ // To archive a report
            this.state.tasks[index].isArchive = true;
        },
        submitReport() {
            if (this.state.task.length === 0 || this.state.cat.length === 0 || this.state.prio.length === 0) return;
            // ^^ Control for an empty submit
            this.state.tasks.push({
                name: this.state.task,
                status: 'to-do',
                isArchive: false,
                isEdit: false,
                category: this.state.cat,
                priority: this.state.prio
            });
        },
        setTaskData(state, payload) { // Temporary data mutations before submit action
            state.task = payload;
        },
        setCatData(state, payload) {
            state.cat = payload;
        },
        setPrioData(state, payload) {
            state.prio = payload;
        },
        changeStatus(state, index) {
            let newIndex = this.state.statuses.indexOf(this.state.tasks[index].status);
            if (++newIndex > 4) newIndex = 0;
            this.state.tasks[index].status = this.state.statuses[newIndex];
        }
    },
    actions: {
        submitBug({commit}) { // Main async action to submit report
            setTimeout(() => {
                commit('submitReport')
            }, 1);
        }
    },
});