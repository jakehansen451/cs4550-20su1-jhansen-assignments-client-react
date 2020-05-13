(function () {
  var users = [];
  var $usernameFld, $passwordFld;
  var $addBtn, $removeBtn, $editBtn, $createBtn;
  var $usernameFld, $passwordFld, $firstFld, $lastFld, $roleFld;
  var $userRowTemplate, $tbody;

  var userService = new AdminUserServiceClient();

  $(main);

  function main() {
    $tbody = $('tbody');
    $addBtn = $('.wbdv-add-btn');
    $addBtn.click(createUser);
    $usernameFld = $('.wbdv-username-fld');
    $passwordFld = $('.wbdv-password-fld');
    $firstFld = $('.wbdv-first-fld');
    $lastFld = $('.wbdv-last-fld');
    $roleFld = $('.wbdv-role-fld');

    var newTr = $('<tr><td>dan</td></tr>');
    $tbody.append(newTr);

    for(var i=0; i<users.length; i++) {
      var username = users[i].username;
      var newUserRow = $('<tr><td>'+username+'</td></tr>');
      $tbody.append(newUserRow)
    }
    renderUsers();
  }

  function createUser() {
    var username = $usernameFld.val();
    var first = $firstFld.val();
    var newUser = {
      username: username,
      first: first
    };
    users.push(newUser);
    renderUsers()
  }

  function findAllUsers() { … }
  function findUserById() { … }
  function deleteUser() { … }
  function selectUser() { … }
  function updateUser() { … }
  function renderUser(user) { … }

  function renderUsers(users) {
    var template = $('.wbdv-user-row-template')[0];
    var $template = $(template);
    var clone = $template.clone();
    $tbody.empty();
    for(var i=0; i<users.length; i++) {
      var user = users[i];
      var copy = clone.clone()
      copy.find('.wbdv-username').html(user.username);
      copy.find('.wbdv-first-name').html(user.first);
      copy.find('.wbdv-last-name').html(user.last);
      copy.find('.wbdv-role').html(user.role);
      $tbody.append(copy)
    }
  }
})();
