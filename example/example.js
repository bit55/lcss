// btn-upload
$(function() {
  var fileInput = document.getElementById('file');
  defaultLabel = $(fileInput).parent('.btn-upload').find('span').text();

  fileInput.addEventListener('change', function(e) {

    if (fileInput.value.substring(fileInput.value.lastIndexOf('.') + 1, fileInput.value.length).toLowerCase() != 'png') {
      alert('Only png files are accepted!');
      fileInput.value = null;
      $(fileInput).parent('.btn-upload').find('span').html(defaultLabel);
    }

    fileNames = [];

    if (e.target.files.length) {
      for (i=0; i < e.target.files.length; i++) {
        fileNames.push(e.target.files[i].name);
      };
    }

    if (fileInput.files.length) {
      $(fileInput).parent('.btn-upload').addClass('selected');
      $(fileInput).parent('.btn-upload').find('span').html('(' + fileNames.length + ') ' + fileNames.join("; ").trim());
    } else {
      $(fileInput).parent('.btn-upload').removeClass('selected');
      $(fileInput).parent('.btn-upload').find('span').html(defaultLabel);
    }
  }, false);

});
// tabs
$(function() {
  $('.tabs__link').click(function(e) {
    e.preventDefault();
    $(this).parent().parent().find('.tabs__link').removeClass('active');
    $(this).addClass('active');
  });


  $('.nav-trigger').click(function(e) {
    $('#responsive-nav').toggleClass('show-md');
    if (!$('#responsive-nav').hasClass('show-md')) {
      $('.nav-trigger').addClass('nav-is-visible');
    } else {
      $('.nav-trigger').removeClass('nav-is-visible');
    }
  });

  $('[data-toggle="tooltip"]').tooltip({
    delay: { "show": 0, "hide": 200 }
  });
});
