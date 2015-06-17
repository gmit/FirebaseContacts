var t = {
			"Add" : "Add",
			"Cancel" : "Cancel",
			"Add contact" : "Add contact",
	}
dbName = $("#fbContacts").data('db-name');
userPrefix = (typeof $("#fbContacts").data('user-prefix') == "undefined")?"":$("#fbContacts").data('user-prefix') + "/";
if (userPrefix == "/") userPrefix = "";
lang = (typeof $("#fbContacts").data('user-language') == "undefined")?"en":$("#fbContacts").data('user-language');
var contactsRef = myDataRef.child(dbName + "/" + userPrefix);

$(document).ready(function() {
	header = "<div id='fbContactsHeader'><a id='fbContactsAddContact' class='btn btn-primary btn-lg' data-toggle='modal' data-target='#addContactModal'><i class='fa fa-plus-square'></i> Add contact</a></div>";
	body = "<div id='fbContactsBody'>";
	//contacts table
	body += "<table id='thingList' class='table table-bordered' style='width:90%;margin-right:5%;'><thead><tr><th>Name</th><th>Phone</th><th>Email</th></th><th style='width: 5%'></th></thead><tbody></tbody></table>";
	body += "</div>";
	footer = "<div id='fbContactsFooter'>Footer</div>";
	addContactPopupForm = "<div class='modal fade' id='addContactModal' tabindex='-1' role='dialog' aria-labelledby='addContactModalLabel'>  <div class='modal-dialog' role='document'><div class='modal-content'>  <div class='modal-header'><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button><h4 class='modal-title' id='addContactModalLabel'>Add contact</h4>  </div>  <div class='modal-body'><input type='text' id='txtcontactName' placeholder='Full name'><br><input type='phone' id='txtcontactPhone' placeholder='Phone'><br><input type='email' id='txtcontactEmail' placeholder='Email'></div>  <div class='modal-footer'><button type='button' class='btn btn-default' data-dismiss='modal'>Close</button><button id='addNewContact' type='button' class='btn btn-primary'>Add</button>  </div></div>  </div></div>";
	editContactPopupForm = "<div class='modal fade' id='editContactModal' tabindex='-1' role='dialog' aria-labelledby='addContactModalLabel'>  <div class='modal-dialog' role='document'><div class='modal-content'>  <div class='modal-header'><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button><h4 class='modal-title' id='addContactModalLabel'>Edit contact</h4>  </div>  <div class='modal-body'>Contct details go here</div>  <div class='modal-footer'><button type='button' class='btn btn-default' data-dismiss='modal'>Close</button><button id='editContact' type='button' class='btn btn-primary'>Add</button>  </div></div>  </div></div>";
	$("#fbContacts").empty().append(header + body + footer + addContactPopupForm + editContactPopupForm);

	$('#addNewContact').click(function(){
		event.preventDefault();
		$('#txtcontactName').css({backgroundColor: "#fff"});
		$('#txtcontactPhone').css({backgroundColor: "#fff"});
		$('#txtcontactEmail').css({backgroundColor: "#fff"});
		var contactName = $('#txtcontactName').val();
		var contactPhone = $('#txtcontactPhone').val();
		var contactEmail = $('#txtcontactEmail').val();
		if (contactName && contactPhone && contactEmail)
		{	
			contactsRef.push({
				contactName: contactName,
				contactPhone: contactPhone,
				contactEmail: contactEmail
			});
			$('#txtcontactName').val('');
			$('#txtcontactPhone').val('');
			$('#txtcontactEmail').val('');
			$('#addContactModal').modal('hide') 
		}else {
			$('#txtcontactName').css({backgroundColor: "#ff99cc"});
			$('#txtcontactPhone').css({backgroundColor: "#ff99cc"});
			$('#txtcontactEmail').css({backgroundColor: "#ff99cc"});
		}
		//console.log($(this));
	});
	
	contactsRef.on('child_added', function(snapshot) {
			var table = $('#thingList').DataTable();
			var name = "<a class='contactDetails' data-id='" + snapshot.name() + "'>" + snapshot.val().contactName + "</a>";
			var phone = "<span class='contactDetails' data-id='" + snapshot.name() + "'>" + snapshot.val().contactPhone + "</span>";
			var email = "<span class='contactDetails' data-id='" + snapshot.name() + "'>" + snapshot.val().contactEmail + "</span>";
			var removeBtn = "<i class='fa fa-minus-square removeContact' data-id='" + snapshot.name() + "'></i>";
			table.row.add( [
					name,
					phone,
					email,
					removeBtn
				] ).draw();
				// I know there should be a smarter way to do it. It's good enough for now
			$(".removeContact").unbind( "click" );
			$(".removeContact").click(function() {
				var contactToRemove = contactsRef.child($(this).data('id'));
				contactToRemove.remove();
				$(this).parent().parent().fadeOut('slow',function(){$(this).remove();});
			});
			$(".contactDetails").unbind( "click" );
			$(".contactDetails").click(function() {
				$('#editContactModal').modal('show') 
			});
			
			return true;
		});
	
	
});