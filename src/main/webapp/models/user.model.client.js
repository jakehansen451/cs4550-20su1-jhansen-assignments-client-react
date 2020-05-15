function User(username, password, email, firstName, lastName, phone, role, dob) {
  // Constants
  this.username = username;
  this.password = password;
  this.email = email;
  this.firstName = firstName;
  this.lastName = lastName;
  this.phone = phone;
  this.role = role;
  this.dob = dob;

  // Bindings
  this.getUsername = getUsername;
  this.getPassword = getPassword;
  this.getEmail = getEmail;
  this.getFirstName = getFirstName;
  this.getLastName = getLastName;
  this.getPhone = getPhone;
  this.getRole = getRole;
  this.getDoB = getDoB;

  this.setUsername = setUsername;
  this.setPassword = setPassword;
  this.setEmail = setEmail;
  this.setFirstName = setFirstName;
  this.setLastName = setLastName;
  this.setPhone = setPhone;
  this.setRole = setRole;
  this.setDoB = setDoB;

  // Getters
  function getUsername() {
    return this.username;
  }

  function getPassword() {
    return this.password;
  }

  function getEmail() {
    return this.email;
  }

  function getFirstName() {
    return this.firstName;
  }

  function getLastName() {
    return this.lastName;
  }

  function getPhone() {
    return this.phone;
  }

  function getRole() {
    return this.role;
  }

  function getDoB() {
    return this.dob;
  }

  // Setters
  function setUsername(username) {
    this.username = username;
  }
  function setPassword(username) {
    this.username = username;
  }

  function setEmail(email) {
    this.email = email;
  }

  function setFirstName(firstName) {
    this.firstName = firstName;
  }

  function setLastName(lastName) {
    this.lastName = lastName;
  }

  function setPhone(phone) {
    this.phone = phone;
  }

  function setRole(role) {
    this.role = role;
  }

  function setDoB(dob) {
    this.dob = dob;
  }
}
