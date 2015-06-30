#Firebase contacts plugin
The best contact plugin for sites.
no code required :-)

#Installation

1. Download fbContacts.js and credential.demo.js
2. rename credential.demo.js to credential.js
3. edit credential.js and put your firebase server in there
4. add to your code : ```html <div id="fbContacts" data-user-prefix="[USER_PREFIX]" data-db-name="[DB_NAME]"> </div>
5. add dependencis :
```html
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css">
	<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
	<script src="http:////cdn.datatables.net/1.10.2/js/jquery.dataTables.min.js"></script>
	<script src="https://cdn.firebase.com/js/client/2.2.4/firebase.js"></script>
	<script src="credential.js"></script>
	<script src="fbContacts.js"></script>
```html
And have fun
#ToDo

change to jquery extend not depand on div

#License
Firebase contacts is licensed under the Creative Commons Attribution 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by/4.0/.
