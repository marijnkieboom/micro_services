function handleUserCreated(event) {
  console.log("User Created Event:", event);
  // Update your read model here
}

function handleUserUpdated(event) {
  console.log("User Updated Event:", event);
  // Update your read model here
}

function handleUserDeleted(event) {
  console.log("User Deleted Event:", event);
  // Update your read model here
}

module.exports = {
  handleUserCreated,
  handleUserUpdated,
  handleUserDeleted,
};
