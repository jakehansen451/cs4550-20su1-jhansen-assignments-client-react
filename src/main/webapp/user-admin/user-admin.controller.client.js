(function () {
  let users = [];
  let $tbody, $addBtn, $updateBtn;
  let $usernameFld, $passwordFld, $firstFld, $lastFld, $roleFld;
  let service = new AdminUserServiceClient();
  let selectedUser = {};

  const userRowTemplate = '<tr>\n'
      + '  <td class="wbdv-username">alice</td>\n'
      + '  <td class="wbdv-password">****</td>\n'
      + '  <td class="wbdv-first-name">Alice</td>\n'
      + '  <td class="wbdv-last-name">Wonderland</td>\n'
      + '  <td class="wbdv-role">Faculty</td>\n'
      + '  <td class="wbdv-controls">\n'
      + '    <button class="wbdv-delete">Delete</button>\n'
      + '    <button class="wbdv-edit">Edit</button>\n'
      + '  </td>\n'
      + '</tr>';

  function deleteUser(event) {
    const target = event.currentTarget;
    const $button = $(target);
    const userId = $button.attr('id');
    service.deleteUser(userId)
    .then(function() {
      users = users.filter(function(user) {
        return user._id !== userId
      });
      renderAllUsers()
    })
  }

  function renderUser(user) {
    selectedUser = user;
    $usernameFld.val(user.username);
    $firstFld.val(user.first);
    $lastFld.val(user.last);
  }

  function updateUser() {
    const updatedUser = {
      _id: selectedUser._id,
      username: $usernameFld.val(),
      password: $passwordFld.val(),
      first: $firstFld.val(),
      last: $lastFld.val(),
      role: $roleFld.val(),
    };
    service.updateUser(selectedUser._id, updatedUser)
    .then(function(status) {
      users = users.map(function(user) {
        return user._id === selectedUser._id ? updatedUser : user;
      })
    });
    renderAllUsers();
  }

  function selectUser(event) {
    const target = event.currentTarget;
    const $button = $(target);
    const userId = $button.attr('id');
    service.findUserById(userId)
    .then(function (user) {
      renderUser(user)
    })
  }

  function renderAllUsers() {
    const $template = $(userRowTemplate);
    const clone = $template.clone();
    $tbody.empty();
    for(let i=0; i<users.length; i++) {
      const user = users[i];
      const copy = clone.clone();
      copy.find('.wbdv-username').html(user.username);
      copy.find('.wbdv-first-name').html(user.first);
      copy.find('.wbdv-last-name').html(user.last);
      copy.find('.wbdv-role').html(user.role);
      copy.find('.wbdv-delete')
      .attr('id', user._id)
      .click(deleteUser);
      copy.find('.wbdv-edit')
      .attr('id', user._id)
      .click(selectUser);
      $tbody.append(copy)
    }
  }

  function createUser() {
    const username = $usernameFld.val();
    const password = $passwordFld.val();
    const first = $firstFld.val();
    const last = $lastFld.val();
    const role = $roleFld.val();

    const newUser = {
      username: username,
      password: password,
      first: first,
      last: last,
      role: role
    };

    service.createUser(newUser)
    .then(function (actualUser) {
      users.push(actualUser);
      renderAllUsers()
    })
  }

  function findAllUsers() {
    service.findAllUsers()
    .then(function (allUsers) {
      users = allUsers;
      renderAllUsers()
    })
  }

  function main() {
    $tbody = $('tbody');
    $addBtn = $('.wbdv-add-btn');
    $updateBtn = $('.wbdv-update-btn');

    $addBtn.click(createUser);
    $updateBtn.click(updateUser);

    $usernameFld = $('.wbdv-username-fld');
    $passwordFld = $('.wbdv-password-fld');
    $firstFld = $('.wbdv-first-fld');
    $lastFld = $('.wbdv-last-fld');
    $roleFld = $('.wbdv-role-fld');

    findAllUsers();

    for(let i=0; i<users.length; i++) {
      const username = users[i].username;
      const newUserRow = $('<tr><td>'+username+'</td></tr>');
      $tbody.append(newUserRow)
    }
  }

  jQuery(main)

})();