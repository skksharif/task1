<template>
  <div>
    <form @submit.prevent="submitForm">
      <div>
        <label>Name:</label>
        <input v-model="name" type="text" required />
      </div>
      <div>
        <label>Age:</label>
        <input v-model.number="age" type="number" required />
      </div>
      <button type="submit">Submit</button>
    </form>
    <p v-if="responseMsg">{{ responseMsg }}</p>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      name: "",
      age: null,
      responseMsg: "",
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await fetch(
          "http://localhost:5500/api/users/adduser",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: this.name,
              age: this.age,
            }),
          }
        );

        const result = await response.json();
        this.responseMsg = `${
          result.message || "User added successfully!"
        }`;
        this.name = "";
        this.age = null;
      } catch (error) {
        console.error("Error submitting form:", error);
        this.responseMsg = "Failed to submit data.";
      }
    },
  },
};
</script>

<style scoped>
/* Base styles */
form {
  max-width: 400px;
  margin: 30px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

form div {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 5px;
  font-size: 14px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #42b983; /* Vue green */
}

button {
  padding: 10px;
  font-size: 14px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #36996d;
}

/* Response message */
p {
  text-align: center;
  margin-top: 15px;
  color: #333;
  font-weight: 500;
}

/* Responsive styles */
@media (max-width: 500px) {
  form {
    padding: 15px;
    margin: 20px;
  }

  button,
  input {
    font-size: 16px;
  }
}
</style>
