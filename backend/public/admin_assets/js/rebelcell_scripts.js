jQuery(document).ready(function() {
  jQuery(document).on('submit', '#admin_login_frm', (e) => {
    e.preventDefault();
    jQuery.ajax({
      type: 'post',
      url: '/admin/login',
      data: jQuery('#admin_login_frm').serialize(),
      dataType: 'json'
    }).done(res => {
      jQuery('#show_login_msg').html('<div class="alert alert-success alert-dismissable fade show" role="alert">'+res.message+'</div>');
      setTimeout(() => {
        location.href = res.redirect_url;
      }, 1000);
    }).catch((err) => {
      jQuery('#show_login_msg').html('<div class="alert alert-danger alert-dismissable fade show" role="alert">'+err.responseJSON.error+'</div>');
    });
  });


  jQuery(document).on('blur', '#post-title', function () {
    const postTitle = jQuery(this).val().replace(/\s+/g, '-').toLowerCase();
    jQuery('#post-slug').val(postTitle);
  });

  jQuery(document).on('change', '#featuredimage', function () { 
    if (this.files && this.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          jQuery("#image_preview").show();
            jQuery("#image_preview").attr('src', e.target.result);
        }

        reader.readAsDataURL(this.files[0]);
			
	  }
  });

  jQuery(document).on('change', '#category_image', function () { 
    if (this.files && this.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          jQuery("#image_preview").show();
          jQuery("#image_preview").attr('src', e.target.result);
        }

        reader.readAsDataURL(this.files[0]);	
	  }
  });

  jQuery(document).on('change', '#category_logo', function () { 
    if (this.files && this.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          jQuery("#image_preview_logo").show();
          jQuery("#image_preview_logo").attr('src', e.target.result);
        }

        reader.readAsDataURL(this.files[0]);	
	  }
  });
  jQuery(document).on('click', '#blog-post-delete', function() {
    const post_id = jQuery(this).data('post-id');
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
            try {
              fetch('/admin/delete-post/'+ post_id,   { 
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json"
                },
              }).then(response => {
                  return response.json();
              }).then(responseData => {
                if(responseData.success == true) {
                  swal({ title: "Success",
                        text: `${responseData.post.post_title} has been deleted Successfully`,
                        icon: "success"}).then(() => {
                          location.reload();
                        }) 
                    }
              }).catch(err => console.error(err));
            } catch (error) {
              console.error(error);
            }
        
      } else {
        swal("Your imaginary file is safe!");
      }
    });


    
  })




    jQuery(document).on('click', '#product-cat-delete', function() {
    const cat_id = jQuery(this).data('cat-id');
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
            try {
              fetch('/admin/delete-product-category/'+ cat_id,   { 
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json"
                },
              }).then(response => {
                  return response.json();
              }).then(responseData => {
                if(responseData.success == true) {
                  swal({ title: "Success",
                        text: `${responseData.category.category_name} has been deleted Successfully`,
                        icon: "success"}).then(() => {
                          location.reload();
                        }) 
                    }
              }).catch(err => console.error(err));
            } catch (error) {
              console.error(error);
            }
        
      } else {
        swal("Your imaginary file is safe!");
      }
    });


    
  })


  jQuery(document).on('click', '#product-delete', function() {
    const product_id = jQuery(this).data('post-id');
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
            try {
              fetch('/admin/delete-product/'+ product_id,   { 
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json"
                },
              }).then(response => {
                  return response.json();
              }).then(responseData => {
                if(responseData.success == true) {
                  swal({ title: "Success",
                        text: `${responseData.product.name} has been deleted Successfully`,
                        icon: "success"}).then(() => {
                          location.reload();
                        }) 
                    }
              }).catch(err => console.error(err));
            } catch (error) {
              console.error(error);
            }
        
      } else {
        swal("Your imaginary file is safe!");
      }
    });


    
  })
});

