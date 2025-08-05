<template>
  <div class="container">
    <h2>Children</h2>

   <center v-if="loading"><p>Loading children...</p></center>

    <table v-else-if="users.length" class="responsive-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="index">
          <td>{{ user.name }}</td>
          <td>{{ user.age }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else>No children found.</p>
  </div>
</template>

<script>
export default {
  name: 'ChildrenPage',
  data() {
    return {
      users: [],
      loading: true
    };
  },
  async mounted() {
    try {
      const response = await fetch('http://localhost:5500/api/users/getusers/children');
      const data = await response.json();
      this.users = data.reverse();
    } catch (error) {
      console.error('Error fetching children data:', error);
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 30px auto;
  padding: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.responsive-table {
  width: 80%;
  border-collapse: collapse;
  overflow-x: auto;
  margin: 0 auto;
}

.responsive-table th,
.responsive-table td {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  text-align: left;
}

.responsive-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

@media (max-width: 600px) {
  .responsive-table th,
  .responsive-table td {
    padding: 10px;
    font-size: 14px;
  }
}
</style>
