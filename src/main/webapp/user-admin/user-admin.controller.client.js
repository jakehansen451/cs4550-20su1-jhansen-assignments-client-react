(function () {
  let users = [];
  let $tbody, $searchBtn, $addBtn, $updateBtn;
  let $usernameFld, $passwordFld, $firstFld, $lastFld, $roleFld;
  let service = new AdminUserServiceClient();
  let selectedUser;

  /*
   * While embedding HTML in JS code isn't ideal (until we get to react), this
   * code enables the rendering of the table without a brief flash of an empty
   * row caused by a delay between the first render and the call to
   * renderAllUsers that empties the tbody tag of the template row.
   */
  const userRowTemplate = '<tr class="user-admin-row">\n'
      + '  <td class="user-admin-cell wbdv-username"></td>\n'
      + '  <td class="user-admin-cell wbdv-password"></td>\n'
      + '  <td class="user-admin-cell wbdv-first-name"></td>\n'
      + '  <td class="user-admin-cell wbdv-last-name"></td>\n'
      + '  <td class="user-admin-cell wbdv-role"></td>\n'
      + '  <td class="user-admin-cell wbdv-controls">\n'
      + '    <i id="wbdv-remove" '
      + '       class="float-right icon-link delete-btn fa-2x fa fa-times wbdv-delete-btn"'
      + '    ></i>\n'
      + '    <i id="wbdv-edit"'
      + '       class="float-right icon-link fa-2x fa fa-pencil wbdv-edit-btn"'
      + '    ></i>\n'
      + '  </td>\n'
      + '</tr>';

  function deleteUser(event) {
    const target = event.currentTarget;
    const $button = $(target);
    const userId = $button.attr('id');
    service.deleteUser(userId)
    .then(() => {
      users = users.filter((user) => user.getId() !== userId);
      renderAllUsers();
    });
  }

  function renderUser(user) {
    selectedUser = user;
    $usernameFld.val(user.getUsername());
    $passwordFld.val('');
    $firstFld.val(user.getFirstName());
    $lastFld.val(user.getLastName());
    $roleFld.val(user.getRole());
  }

  function updateUser() {
    if (selectedUser) {
      const selectedId = selectedUser.getId();
      const updatedUser = new User(selectedId)
      .setUsername($usernameFld.val())
      .setPassword($passwordFld.val() ? $passwordFld.val() : selectedUser.password)
      .setFirstName($firstFld.val())
      .setLastName($lastFld.val())
      .setRole($roleFld.val());

      service.updateUser(selectedId, updatedUser)
      .then(function() {
        users = users.map(function(user) {
          return user.getId() === selectedId ? updatedUser : user;
        });
        renderAllUsers();
        clearForm();
      });
    }
  }

  function selectUser(event) {
    const userId = $(event.currentTarget).attr('id');
    service.findUserById(userId)
    .then(function (user) {
      renderUser(users.find((existingUser) => user._id === existingUser.getId()));
    })
  }

  function regexMatchesFields(regexes, user) {
    return user.getUsername().match(regexes[0])
        && user.getFirstName().match(regexes[1])
        && user.getLastName().match(regexes[2])
        && user.getRole().match(regexes[3]);
  }

  function renderAllUsers(regexes=['.*', '.*', '.*', '.*']) {
    $tbody.empty();
    for(let i=0; i<users.length; i++) {
      const user = users[i];
      if (regexMatchesFields(regexes, user)) {
        const copy = $(userRowTemplate).clone();
        copy.find('.wbdv-username').html(user.getUsername());
        copy.find('.wbdv-password').html('*'.repeat(user.getPassword().length));
        copy.find('.wbdv-first-name').html(user.getFirstName());
        copy.find('.wbdv-last-name').html(user.getLastName());
        copy.find('.wbdv-role').html(user.getRole());
        copy.find('.wbdv-delete-btn').attr('id', user.getId()).click(deleteUser);
        copy.find('.wbdv-edit-btn').attr('id', user.getId()).click(selectUser);
        $tbody.append(copy)
      }
    }
  }

  function createUser() {
    const username = $usernameFld.val();
    const password = $passwordFld.val();
    const first = $firstFld.val();
    const last = $lastFld.val();
    const role = $roleFld.val();

    if (!(username && password && first && last && role)) {
      alert("All form fields must be filled in to add a user.");
      return;
    }

    const newUser = {
      username: username,
      password: password,
      firstName: first,
      lastName: last,
      role: role
    };

    service.createUser(newUser)
    .then(function (returnedUser) {
      users.push(
          new User(returnedUser._id)
          .setUsername(returnedUser.username)
          .setPassword(returnedUser.password)
          .setFirstName(returnedUser.firstName)
          .setLastName(returnedUser.lastName)
          .setRole(returnedUser.role)
      );
      renderAllUsers();
      clearForm();
    });
  }

  function findAllUsers() {
    users = service.findAllUsers()
    .then(function (allUsers) {
      users = allUsers.map(function(user) {
        return new User(user._id)
        .setUsername(user.username)
        .setPassword(user.password)
        .setFirstName(user.firstName)
        .setLastName(user.lastName)
        .setRole(user.role);
      });
      renderAllUsers()
    })
  }

  function searchUsers() {
    function buildRegex(val) {
      return new RegExp(val ? '.*' + val + '+.*' : '.*');
    }
    const regexes = [
      buildRegex($usernameFld.val()),
      buildRegex($firstFld.val()),
      buildRegex($lastFld.val()),
      buildRegex($roleFld.val()),
    ];
    renderAllUsers(regexes);
    clearForm();
  }

  function clearForm() {
    $usernameFld.val('');
    $passwordFld.val('');
    $firstFld.val('');
    $lastFld.val('');
    $roleFld.val('');
    selectedUser = undefined;
  }

  function main() {
    $tbody = $('tbody');
    $searchBtn = $('.wbdv-search-btn');
    $addBtn = $('.wbdv-add-btn');
    $updateBtn = $('.wbdv-update-btn');

    $searchBtn.click(searchUsers);
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