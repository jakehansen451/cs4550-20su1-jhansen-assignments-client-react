function User(
    id,
    username,
    password,
    email,
    firstName,
    lastName,
    phone,
    role,
    dob) {

  // Constants
  this.id = id ? id :  (() =>  { throw "User ID cannot be null" })();
  this.username = username;
  this.password = password;
  this.email = email;
  this.firstName = firstName;
  this.lastName = lastName;
  this.phone = phone;
  this.role = role;
  this.dob = dob;

  // Getters
  this.getId = () => {
    return this.id;
  };

  this.getUsername = () => {
    return this.username;
  };

  this.getPassword = () => {
    return this.password;
  };

  this.getEmail = () => {
    return this.email;
  };

  this.getFirstName = () => {
    return this.firstName;
  };

  this.getLastName = () => {
    return this.lastName;
  };

  this.getPhone = () => {
    return this.phone;
  };

  this.getRole = () => {
    return this.role;
  };

  this.getDoB = () => {
    return this.dob;
  };

  // Setters
  this.setUsername = (username) => {
    this.username = username;
    return this;
  };

  this.setPassword = (password) => {
    this.password = password;
    return this;
  };

  this.setEmail = (email) =>{
    this.email = email;
    return this;
  };

  this.setFirstName = (firstName) => {
    this.firstName = firstName;
    return this;
  };

  this.setLastName = (lastName) => {
    this.lastName = lastName;
    return this;
  };

  this.setPhone = (phone) => {
    this.phone = phone;
    return this;
  };

  this.setRole = (role) => {
    this.role = role;
    return this;
  };

  this.setDoB = (dob) => {
    this.dob = dob;
    return this;
  };

  // Bindings
  this.getId.bind(this);
  this.getUsername.bind(this);
  this.getPassword.bind(this);
  this.getEmail.bind(this);
  this.getFirstName.bind(this);
  this.getLastName.bind(this);
  this.getPhone.bind(this);
  this.getRole.bind(this);
  this.getDoB.bind(this);

  this.setUsername.bind(this);
  this.setPassword.bind(this);
  this.setEmail.bind(this);
  this.setFirstName.bind(this);
  this.setLastName.bind(this);
  this.setPhone.bind(this);
  this.setRole.bind(this);
  this.setDoB.bind(this);
}
