<template>
  <button
    class="btn btn-outline-primary btn-sm"
    type="button"
    data-bs-toggle="offcanvas"
    v-bind:data-bs-target="'#offcanvasRight' + taskId"
    v-bind:aria-controls="'offcanvasRight' + taskId"
    @click="loadTask(taskId)"
  >
    <i class="fa fa-pen"></i>
  </button>

  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    :id="'offcanvasRight' + taskId"
    aria-labelledby="'offcanvasRightLabel' + taskId"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasRightLabel">Edit Task</h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <form
        class="needs-validation"
        @submit.prevent="updateTask(taskId)"
        novalidate
      >
        <div class="modal-body">
          <div>
            <label for="exampleFormControlInput1" class="form-label"
              >Task-Title</label
            >
            <input
              class="form-control"
              v-model="task.title"
              type="text"
              placeholder="Give your Task a Title"
              aria-label="default input example"
              required
            />
            <div class="invalid-feedback">Please provide a valid title.</div>
          </div>
          <label class="select-label">Select a status</label>
          <div class="form-floating">
            <select
              class="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
              v-model="task.status"
              required
            >
              <option value="To-Do">To-do</option>
              <option value="In-Progress">In-Progress</option>
              <option value="Finished">Finished</option>
            </select>
            <div class="invalid-feedback">Please provide a valid status.</div>
            <label for="floatingSelect">Status</label>
          </div>
          <div class="date-picker">
            <label class="date-label">Select a Date</label>
            <VueDatePicker
              v-model="task.date"
              :format="datePickerFormat"
              placeholder="Select a date"
              required
            />
          </div>
        </div>
        <div v-if="this.serverValidationMessages">
          <ul>
            <li
              v-for="(message, index) in serverValidationMessages"
              :key="index"
              style="color: red"
            >
              {{ message }}
            </li>
          </ul>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="offcanvas"
          >
            Close
          </button>
          <button
            type="submit"
            class="btn btn-primary m-3"
            @click="updateTask(taskId)"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import VueDatePicker from "@vuepic/vue-datepicker";

export default {
  name: "EditTestComponent",
  components: { VueDatePicker },
  props: ["taskId"],
  data() {
    return {
      task: {
        id: null,
        title: "",
        status: "",
        date: null,
      },
      datePickerFormat: "dd.MM.yyyy",
      serverValidationMessages: [],
    };
  },
  methods: {
    async loadTask(id) {
      const response = await fetch(`http://localhost:8080/api/v1/todos/${id}`);
      if (!response.ok) {
        throw new Error("Failed to load task");
      }
      this.task = await response.json();
    },
    // async updateTask(id) {
    //   if (this.validate()) {
    //     const headers = new Headers();
    //     headers.append("Content-Type", "application/json");
    //
    //     const raw = JSON.stringify(
    //       {
    //         title: this.task.title,
    //         status: this.task.status,
    //         date: this.task.date,
    //       }
    //       // null,
    //       // 2
    //     );
    //
    //     const requestOptions = {
    //       method: "PUT",
    //       headers: headers,
    //       body: raw,
    //       redirect: "follow",
    //     };
    //
    //     fetch(
    //       `http://localhost:8080/api/v1/todos/${this.taskId}`,
    //       requestOptions
    //     )
    //       .then((response) => response.text())
    //       .then(async (result) => {
    //         console.log(result);
    //         document.location.reload();
    //       })
    //       .catch((error) => console.log("error", error));
    //
    //     const response = await fetch(
    //       `http://localhost:8080/api/v1/todos/${id}`,
    //       requestOptions
    //     );
    //     const data = await this.handleResponse(response);
    //     console.log(data);
    //   }
    // },
    // async handleResponse(response) {
    //   const data = await response.json();
    //   if (response.ok) {
    //     // Close the modal and reload the page
    //     var myModal = new bootstrap.Modal(
    //       document.getElementById("offcanvasRight" + this.task.id)
    //     );
    //     myModal.hide();
    //     this.$emit("task-updated", this.task);
    //   } else if (response.status === 400) {
    //     data.errors.forEach((error) => {
    //       this.serverValidationMessages.push(error.defaultMessage);
    //     });
    //   } else {
    //     this.serverValidationMessages.push("Unknown error occurred");
    //   }
    //   return data;
    // },

    updateTask(id) {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      const raw = JSON.stringify({
        title: this.task.title,
        status: this.task.status,
        date: this.task.date,
      });

      const requestOptions = {
        method: "PUT",
        headers: headers,
        body: raw,
        redirect: "follow",
      };

      fetch(`http://localhost:8080/api/v1/todos/${id}`, requestOptions)
        .then((response) => response.text())
        .then(async (result) => {
          console.log(result);
          document.location.reload();
        })
        .catch((error) => console.log("error", error));
    },
    validate() {
      const form = document.querySelector(".needs-validation");
      form.classList.add("was-validated");
      return form.checkValidity();
    },
  },
};
</script>

<style scoped></style>
