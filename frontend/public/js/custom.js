

/* temp */



$('.search_btn').click(function() {
	$('.close_btn').show();
	$('.search_box').animate({"marginRight": "100%"}, "2000");
});
$('.close_btn').click(function() {
	$('.close_btn').hide();
	$('.search_btn').show();
	$('.search_box').animate({"marginRight": "0px"}, "2000");
});

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});



//list grid view

$(document).ready(function() {
		$('#list').click(function(event) {
			event.preventDefault();
			$('#products .item').addClass('list-group-item');
			});
			$('#grid').click(function(event) {
			event.preventDefault();
			$('#products .item').removeClass('list-group-item');
			$('#products .item').addClass('grid-group-item');
		});
	});




//tab

function openPage(pageName, elmnt, color) {
    // Hide all elements with class="tabcontent" by default */
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove the background color of all tablinks/buttons
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.borderBottomColor = "";
    }

    // Show the specific tab content
    document.getElementById(pageName).style.display = "block";

    // Add the specific color to the button used to open the tab content
    elmnt.style.borderBottomColor = color;
}

// Get the element with id="defaultOpen" and click on it
// document.getElementById("defaultOpen").click(); 

/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "300px";
}
/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}


$("#plus").on('click', function() {
   $("#number").val(parseInt($('#number').val(), 10)+1);
});
$("#minus").on('click', function() {
   $("#number").val(parseInt($('#number').val(), 10)-1)
});

$("#plus1").on('click', function() {
   $("#number1").val(parseInt($('#number1').val(), 10)+1);
});
$("#minus1").on('click', function() {
   $("#number1").val(parseInt($('#number1').val(), 10)-1)
});

//


//lightbox

function openModal() {
  document.getElementById('myModal').style.display = "block";
}

function closeModal() {
  document.getElementById('myModal').style.display = "none";
}




//equalheight
// equalheight('.grid-group-item.plat_height');
  
 
