<template>
  <Weather></Weather>

  <div class="container">
    <!-- Heading -->
    <h2 class="text-center" style="margin-top: 50px">My Vue Todo App</h2>

    <div class="mt-5 d-flex justify-content-center" style="margin-bottom: 20px">
      <TodoDetail></TodoDetail>
    </div>

    <div class="card">
      <div class="card-header p-3">
        <h5 class="mb-0"><i class="fas fa-tasks me-2"></i>Task List</h5>
      </div>
      <div class="card-body">
        <!-- Task table -->
        <table
          class="table table-hover justify-content-center"
          style="margin-top: 0; width: 100%"
        >
          <thead>
            <tr>
              <th scope="col">Task <i class="fas fa-tasks"></i></th>
              <th scope="col" style="width: 120px">
                Status <i class="fas fa-info-circle"></i>
              </th>
              <th scope="col" class="text-center">
                Datum <i class="fas fa-calendar-alt"></i>
              </th>
              <th scope="col" class="text-center">
                Edit <i class="fas fa-edit"></i>
              </th>
              <th scope="col" class="text-center">
                Delete <i class="fas fa-trash"></i>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task in tasks" :key="task.id">
              <td>
                <span :class="{ 'line-through': task.status === 'Finished' }">
                  {{ task.title }}
                </span>
              </td>
              <td>
                <span
                  class="pointer noselect"
                  @click="changeStatus(task)"
                  :class="{
                    'text-danger': task.status === 'To-Do',
                    'text-success': task.status === 'Finished',
                    'text-warning': task.status === 'In-Progress',
                  }"
                >
                  {{ capitalizeFirstChar(task.status) }}
                </span>
              </td>
              <td class="text-center">
                <div>
                  <span>{{ new Date(task.date).toLocaleDateString() }}</span>
                </div>
              </td>
              <td class="text-center">
                <EditComponent
                  :taskId="task.id"
                  @task-updated="updateTask"
                ></EditComponent>
              </td>
              <td class="text-center">
                <button
                  type="submit"
                  class="btn btn-outline-danger btn-sm"
                  v-on:click="deleteTask(task.id)"
                >
                  <i class="fa fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import TodoDetail from "@/components/TodoDetail.vue";
import Weather from "@/components/WeatherComponent.vue";
import EditComponent from "@/components/EditComponent.vue";

export default {
  name: "HelloWorld",
  components: { EditComponent, Weather, TodoDetail },
  data() {
    return {
      task: "",
      editedTask: null,
      statuses: ["To-Do", "In-Progress", "Finished"],

      /* Status could be: 'to-do' / 'in-progress' / 'finished' */
      tasks: [],
    };
  },
  mounted() {
    this.loadTasks();
  },
  methods: {
    /**
     * Capitalize first character
     */
    capitalizeFirstChar(str) {
      if (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      } else {
        return "";
      }
    },

    /**
     * Change status of task by index
     */
    changeStatus(task) {
      let newIndex = this.statuses.indexOf(task.status);
      if (++newIndex > 2) newIndex = 0;
      let updatedTask = { ...task, status: this.statuses[newIndex] };

      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      };

      fetch(`http://localhost:8080/api/v1/todos/${task.id}`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.loadTasks(); // Load tasks again after updating the status
        })
        .catch((error) => console.log("error", error));
    },

    /**
     * Deletes task by index
     */
    deleteTask(id) {
      const requestOptions = {
        method: "DELETE",
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
    updateTask(updatedTask) {
      const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        this.tasks.splice(index, 1, updatedTask);
      }
      // Reload the tasks list
      this.loadTasks();
    },

    loadTasks() {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch("http://localhost:8080/api/v1/todos", requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((result) => {
          this.tasks = result;
        })
        .catch((error) => console.log("error", error));
    },
  },
};
</script>
//TODO: NEUE VIEW EINSETZEN UND BEARBEITEN

<style scoped>
.container {
  font-family: Arial, sans-serif;
}

.table {
  border-collapse: separate;
  border-spacing: 0;
}

.table th {
  background-color: #f8f9fa;
  color: #495057;
}

.table td {
  background-color: #fff;
  border-radius: 15px;
}

.table td,
.table th {
  padding: 20px;
}

.pointer {
  cursor: pointer;
}

.line-through {
  text-decoration: line-through;
}
</style>
