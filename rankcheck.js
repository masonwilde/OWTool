var ul = document.getElementById('users');  // Parent

ul.addEventListener('click', function(e) {
    if (e.target.tagName === 'li'){
      console.log(e.target.id);  // Check if the element is a LI
    }
});
