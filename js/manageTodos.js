$(function() {
	
	/* JQUERY VARIABLES */
	var list = $('#list');
	var modalTodo = $('#modal-todo');
	
	/* FUNCTIONS */
	// request for json data
	function getData() {
		$.get('/api/get', function() {
			
		}).done(function(data) {
			var json = JSON.parse(data);

			json.forEach(function(todo, i) {
				renderTodo(todo);
			});
		});
	};
	
	// renders todos into list
	function renderTodo(todo) {
		var html =
				'<a class="collection-item" id="'+todo.id+'" href="#modal-todo"'+
					'data-id="'+todo.id+'"'+
					'data-title="'+todo.title+'"'+
					'data-priority="'+todo.priority+'"'+
					'data-details="'+todo.details+'"'+
					'data-created="'+todo.createdAt+'"'+
					'data-elapsed="'+todo.elapsedTime+'"'+
					'data-finish="'+todo.finishAt+'"'+
					'data-complete="'+todo.isComplete+'"'+
				'>'+
					'<span class="badge '+todo.priority+'">'+
						todo.priority+
					'</span>'+
					todo.title+
				'</a>';
		list.append(html);
	};
	
	// renders todo details in modal
	function renderModalTodo(todo) {
		todo = $(todo);
		
		var id = todo.attr('data-id'),
				title = todo.attr('data-title'),
				priority = todo.attr('data-priority'),
				details = todo.attr('data-details'),
				created = todo.attr('data-created'),
				elapsed = parseInt(todo.attr('data-elapsed')),
				finish = todo.attr('data-finish'),
				complete = todo.attr('data-complete'),
				duration = getDuration(created, elapsed);
		
		modalTodo.find('.modal-header').text(title + " - ");
		modalTodo.find('.modal-header').append(
			'<span class="'+priority+'-text">'+
				priority+
			'</span>'+
			'<button class="right waves-effect waves-light btn"><i class="material-icons">play_arrow</i></button>'
		);
		
		var html =
				'<h5>'+
					details+
				'</h5>'+
				'<table>'+
					'<tbody>'+
						'<tr>'+
							'<td>Elapsed time</td>'+
							'<td>'+duration+'</td>'+
						'</tr>'+
						'<tr>'+
							'<td>Created</td>'+
							'<td>'+moment(created).format("DD/MM/YY, HH:MM:SS")+'</td>'+
						'</tr>'+
						'<tr>'+
							'<td>Finish by</td>'+
							'<td>'+moment(finish).format("DD/MM/YY, HH:MM:SS")+'</td>'+
						'</tr>'+
					'</tbody>'+
				'</table>'
				;
		
		modalTodo.find('.modal-details').html(html);
		modalTodo.find('#trigger-edit').attr('data-id', id);
	};
	
	// renders todo info on edit modal
	function renderModalEdit(todo) {
		var form = $('#form-todo-edit');
		
		var id = todo.attr('data-id'),
				title = todo.attr('data-title'),
				priority = todo.attr('data-priority'),
				details = todo.attr('data-details'),
				created = todo.attr('data-created'),
				elapsed = parseInt(todo.attr('data-elapsed')),
				finish = todo.attr('data-finish'),
				complete = todo.attr('data-complete'),
				duration = getElapsed(created, elapsed).split(':');
		
		form.find('#inputId').val(id);
		form.find('#inputTitle').val(title);
		form.find('#inputPriority').val(priority);
		form.find('#inputDetails').val(details);
		form.find('#inputDetails').trigger('autoresize');
		form.find('#inputCreatedDate').val(getDate(created));
		form.find('#inputCreatedTime').val(getTime(created));
		form.find('#inputFinishDate').val(getDate(finish));
		form.find('#inputFinishTime').val(getTime(finish));
		form.find('#inputElapsedHours').val(duration[0]);
		form.find('#inputElapsedMinutes').val(duration[1]);
		form.find('#inputElapsedSeconds').val(duration[2]);
		
		Materialize.updateTextFields();
		$('select').material_select();
	};
	
	// returns duration in string
	function getDuration(createdAt, elapsed) {
		var elapsedTime = moment(createdAt).add(elapsed,'seconds').format('X');
		var initTime = moment(createdAt).format('X');
		var delta = elapsedTime - initTime;
		delta = moment.duration(delta, "s");
		var duration = delta.hours() + 'h ' + delta.minutes() + 'm ' + delta.seconds() + 's';
		
		return duration;
	};
	
	// returns elapsed time in string
	function getElapsed(createdAt, elapsed) {
		var elapsedTime = moment(createdAt).add(elapsed,'seconds').format('X');
		var initTime = moment(createdAt).format('X');
		var delta = elapsedTime - initTime;
		delta = moment.duration(delta, "s");
		var duration = delta.hours() + ':' + delta.minutes() + ':' + delta.seconds();
		
		return duration;
	};
	
	// returns date in string
	function getDate(datetime) {
		return moment(datetime).format("DD MMM, YYYY");
	};
	
	// returns time in string
	function getTime(datetime) {
		return moment(datetime).format("HH:MM");
	};
	
	// joins elapsed time and returns seconds
	function joinElapsed(elapsedHours, elapsedMinutes, elapsedSeconds) {
		var h = parseInt(elapsedHours);
		var m = parseInt(elapsedMinutes);
		var s = parseInt(elapsedSeconds);
		
		var joined = moment.duration(h, 'h');
		joined = joined.add(moment.duration(m, 'm'));
		joined = joined.add(moment.duration(s, 's'));
		
		return joined.asSeconds();
	};
	
	// manages data and sends add POST
	function addTodo(form) {
		var name = form.find('#inputTitle').val(),
				priority = form.find('#inputPriority').val(),
				finishDate = form.find('#inputFinishDate').val(),
				finishTime = form.find('#inputFinishTime').val().split(':'),
				details = form.find('#inputDetails').val();
		
		var finishAt = moment(finishDate, 'D MMM, YYYY');
		finishAt = finishAt.add(finishTime[0], 'hours').add(finishTime[1], 'minutes');
		
		var json = {
			"title": name,
			"priority": priority,
			"details": details,
			"createdAt": moment().format(),
			"elapsedTime": 0,
			"finishAt": finishAt,
			"isComplete": false
		};
		
		$.post(
			'/api/add',
			JSON.stringify(json)
		).done(function(data) {
			location.reload();
		}).fail(function(error) {
			console.log(error);
		});
	};
	
	// manages data and sends edit POST
	function editTodo(form) {
		var id = form.find("#inputId").val(),
				name = form.find('#inputTitle').val(),
				priority = form.find('#inputPriority').val(),
				beginDate = form.find('#inputCreatedDate').val(),
				beginTime = form.find('#inputCreatedTime').val().split(':'),
				finishDate = form.find('#inputFinishDate').val(),
				finishTime = form.find('#inputFinishTime').val().split(':'),
				elapsedHours = form.find('#inputElapsedHours').val(),
				elapsedMinutes = form.find('#inputElapsedMinutes').val(),
				elapsedSeconds = form.find('#inputElapsedSeconds').val(),
				details = form.find('#inputDetails').val(),
				complete = form.find('#inputComplete'),
				elapsedTime = joinElapsed(elapsedHours, elapsedMinutes, elapsedSeconds);
		
		var isComplete = (complete == 'checked') ? true : false;
		console.log(complete);
		
		var createdAt = moment(beginDate, 'D MMM, YYYY');
		createdAt = createdAt.add(beginTime[0], 'hours').add(beginTime[1], 'minutes');
		var finishAt = moment(finishDate, 'D MMM, YYYY');
		finishAt = finishAt.add(finishTime[0], 'hours').add(finishTime[1], 'minutes');
//		
		var json = {
			"id": id,
			"title": name,
			"priority": priority,
			"details": details,
			"createdAt": createdAt,
			"elapsedTime": elapsedTime,
			"finishAt": finishAt,
			"isComplete": isComplete
		};
		
		console.log(json);
//		
//		$.post(
//			'/api/add',
//			JSON.stringify(json)
//		).done(function(data) {
//			location.reload();
//		}).fail(function(error) {
//			console.log(error);
//		});
	};
	
	/* EVENT FUNCTIONS */
	// triggers when todo is clicked
	$('body').on('click', '.collection-item', function() {
		renderModalTodo( $(this)[0] );
	});
	
	// triggers when form to add todo is submitted
	$('body').on('submit', '#form-todo-add', function(e) {
		e.preventDefault();
		var form = $(this);
		addTodo(form);
	});
	
	// triggers when edit button is pressed
	$('body').on('click', '#trigger-edit', function() {
		var id = $('#trigger-edit').attr('data-id');
		renderModalEdit( $('.collection-item#' + id) );
	});
	
	// triggers when form to add todo is submitted
	$('body').on('submit', '#form-todo-edit', function(e) {
		e.preventDefault();
		var form = $(this);
		editTodo(form);
	});
	
	
	
	/* INITIALIZATION CALLS */
	$('.modal').modal();
	$('select').material_select();
	$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 10, // Creates a dropdown of 15 years to control year
		min: new Date()
  });
	$('.timepicker').pickatime({
    autoclose: true,
    twelvehour: false,
    default: '00:00:00',
		donetext: 'OK'
  });
	var data = getData();
});