// btn-upload
$(function() {
  var fileInput = document.getElementById('file');
  defaultLabel = $(fileInput).parent('.btn-upload').find('span').text();

  fileInput.addEventListener('change', function(e) {

    if (fileInput.value.substring(fileInput.value.lastIndexOf('.') + 1, fileInput.value.length).toLowerCase() != 'png') {
      alert('Принимаются только файлы в формате PNG!');
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
      $(fileInput).parent('.btn-upload').addClass('-changed');
      $(fileInput).parent('.btn-upload').find('span').html('(' + fileNames.length + ' шт.) ' + fileNames.join("; ").trim());
    } else {
      $(fileInput).parent('.btn-upload').removeClass('-changed');
      $(fileInput).parent('.btn-upload').find('span').html(defaultLabel);
    }
  }, false);

});
// tabs
$(function() {
  $('.tabs__link').click(function(e) { 
    e.preventDefault();
    $(this).parent().parent().find('.tabs__link').removeClass('-active');
    $(this).addClass('-active');
  });
});