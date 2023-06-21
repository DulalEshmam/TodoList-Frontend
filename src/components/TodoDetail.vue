<template>
  <!-- Button trigger modal -->
  <button
    type="button"
    class="btn btn-primary"
    data-bs-toggle="modal"
    data-bs-target="#staticBackdrop"
  >
    Add a Todo-Task
  </button>

  <!-- Modal -->
  <div
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Create your Task</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div>
            <label for="exampleFormControlInput1" class="form-label"
              >Task-Title</label
            >
            <input
              class="form-control"
              v-model="title"
              type="text"
              placeholder="Give your Task a Title"
              aria-label="default input example"
            />
          </div>
          <div>
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label"
                >Description</label
              >
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                v-model="description"
              ></textarea>
            </div>
          </div>
          <div class="form-floating">
            <select
              class="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
              v-model="status"
            >
              <option selected>Open this select menu</option>
              <option value="toDo">To-do</option>
              <option value="in_progress">In-Progress</option>
              <option value="done">Done</option>
            </select>
            <label for="floatingSelect">Works with selects</label>
          </div>
          <div class="date-picker">
            <VueDatePicker v-model="date" :month-change-on-scroll="false" />
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click.prevent="createTask"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  </div>
  <!--  <div v-for="task in tasks" :key="task.id">-->
  <!--    {{ task.title }} - {{ task.description }} - {{ task.status }} - -->
  <!--    {{ task.date }}-->
  <!--  </div>-->
</template>

<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
export default {
  components: {
    VueDatePicker,
  },
  name: "TodoDetail",
  data() {
    return {
      title: "",
      description: "",
      status: "",
      date: null,
      tasks: [],
    };
  },
  methods: {
    createTask() {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const payload = JSON.stringify({
        title: this.title,
        description: this.description,
        status: this.status,
        date: this.date,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: payload,
        redirect: "follow",
      };

      fetch("http://localhost:8080/api/v1/todos", requestOptions)
        .catch((error) => console.log("error", error));
    },
  },
};
</script>

<style scoped>
.date-picker {
  margin-top: 20px;
}
</style>
