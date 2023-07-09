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
    ref="modal"
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
        <form class="needs-validation" @submit.prevent="createTask" novalidate>
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
                v-model="status"
                @change="$emit('statusChanged', status)"
                required
              >
                <option value="To-Do">To-do</option>
                <option value="In-Progress">In-Progress</option>
                <option value="Finished">Finished</option>
              </select>
              <div class="invalid-feedback">Please provide a valid status.</div>
              <label for="floatingSelect">Status</label>
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
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="submit" class="btn btn-primary">Create</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoTestDetail",
  data() {
    return {
      title: "",
      status: "",
      tasks: [],
      serverValidationMessages: [],
    };
  },
  methods: {
    async createTask() {
      if (this.validate()) {
        const endpoint = "http://localhost:8080/api/v1/todos";

        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const task = JSON.stringify({
          title: this.title,
          status: this.status,
        });

        const requestOptions = {
          method: "POST",
          headers: headers,
          body: task,
          redirect: "follow",
        };

        const response = await fetch(endpoint, requestOptions);
        await this.handleResponse(response);
      }
    },
    async handleResponse(response) {
      if (response.ok) {
        // Schließen Sie das Modal und laden Sie die Seite neu
        var myModal = new bootstrap.Modal(
          document.getElementById("staticBackdrop")
        );
        myModal.hide();
        location.reload();
      } else if (response.status === 400) {
        response = await response.json();
        response.errors.forEach((error) => {
          this.serverValidationMessages.push(error.defaultMessage);
        });
      } else {
        this.serverValidationMessages.push("Unknown error occurred");
      }
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
