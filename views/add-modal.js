exports.getPartial =
	'<div id="modal-add" class="modal">'+
		'<div class="modal-content">'+
			'<h4 class="modal-header">Add To-Do</h4>'+
			'<div class="row">'+
				'<form class="col s12">'+
					'<div class="row">'+
						'<div class="input-field col s6">'+
							'<input placeholder="Placeholder" id="first_name" type="text" class="validate">'+
							'<label for="first_name">First Name</label>'+
						'</div>'+
						'<div class="input-field col s6">'+
							'<input id="last_name" type="text" class="validate">'+
							'<label for="last_name">Last Name</label>'+
						'</div>'+
					'</div>'+
					'<div class="row">'+
						'<div class="input-field col s12">'+
							'<input disabled value="I am not editable" id="disabled" type="text" class="validate">'+
							'<label for="disabled">Disabled</label>'+
						'</div>'+
					'</div>'+
					'<div class="row">'+
						'<div class="input-field col s12">'+
							'<input id="password" type="password" class="validate">'+
							'<label for="password">Password</label>'+
						'</div>'+
					'</div>'+
					'<div class="row">'+
						'<div class="input-field col s12">'+
							'<input id="email" type="email" class="validate">'+
							'<label for="email">Email</label>'+
						'</div>'+
					'</div>'+
				'</form>'+
			'</div>'+
		'</div>'+
		'<div class="modal-footer">'+
			'<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a>'+
		'</div>'+
	'</div>'
;