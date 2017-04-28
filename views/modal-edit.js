exports.getPartial =
	'<div id="modal-edit" class="modal">'+
		'<form id="form-todo-edit" action="/api/edit" method="post">'+
			'<div class="modal-content">'+
				'<h4 class="modal-header">Edit To-Do</h4>'+
				'<div class="row">'+
					'<div class="col s12">'+
						'<div class="row">'+
							'<div class="input-field col s8">'+
								'<input id="inputId" type="hidden" class="validate">'+
								'<input id="inputTitle" type="text" class="validate">'+
								'<label for="inputTitle">To-Do Name</label>'+
							'</div>'+
							'<div class="input-field col s4">'+
								'<select id="inputPriority">'+
									'<option value="" disabled selected>Choose the priority</option>'+
									'<option value="low">Low</option>'+
									'<option value="medium">Medium</option>'+
									'<option value="high">High</option>'+
								'</select>'+
								'<label for="inputPriority">Priority</label>'+
							'</div>'+
							'<div class="input-field col s6">'+
								'<input id="inputCreatedDate" type="date" class="datepicker">'+
								'<label for="inputCreatedDate">Begin Date</label>'+
							'</div>'+
							'<div class="input-field col s6">'+
								'<input id="inputCreatedTime" type="time" class="timepicker">'+
								'<label for="inputCreatedTime">Begin Time</label>'+
							'</div>'+
							'<div class="input-field col s6">'+
								'<input id="inputFinishDate" type="date" class="datepicker">'+
								'<label for="inputFinishDate">Finish Date</label>'+
							'</div>'+
							'<div class="input-field col s6">'+
								'<input id="inputFinishTime" type="time" class="timepicker">'+
								'<label for="inputFinishTime">Finish Time</label>'+
							'</div>'+
							'<div class="input-field col s4">'+
								'<input id="inputElapsedHours" type="number" class="validate">'+
								'<label for="inputElapsedHours">Elapsed Hours</label>'+
							'</div>'+
							'<div class="input-field col s4">'+
								'<input id="inputElapsedMinutes" type="number" class="validate">'+
								'<label for="inputElapsedMinutes">Elapsed Minutes</label>'+
							'</div>'+
							'<div class="input-field col s4">'+
								'<input id="inputElapsedSeconds" type="number" class="validate">'+
								'<label for="inputElapsedSeconds">Elapsed Seconds</label>'+
							'</div>'+
							'<div class="input-field col s12">'+
								'<textarea id="inputDetails" class="materialize-textarea"></textarea>'+
								'<label for="inputDetails">To-Do Details</label>'+
							'</div>'+
							'<div class="input-field col s12">'+
								'<input type="checkbox" id="inputComplete">'+
								'<label for="inputComplete">Complete?</label>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>'+
			'<div class="modal-footer">'+
				'<button type="submit" class="modal-action waves-effect waves-green btn-flat">Save</button>'+
				'<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a>'+
			'</div>'+
		'</form>'+
	'</div>'
;