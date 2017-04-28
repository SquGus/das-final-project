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
				'<a class="collection-item" href="#modal-todo"'+
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
	
	// paints todo details in modal
	function renderModalTodo(todo) {
		todo = $(todo);
		
		var title = todo.attr('data-title'),
				priority = todo.attr('data-priority'),
				details = todo.attr('data-details'),
				created = todo.attr('data-created'),
				elapsed = parseInt(todo.attr('data-elapsed')),
				finish = todo.attr('data-finish'),
				complete = todo.attr('data-complete'),
				duration = getDuration(created, elapsed);
		
		modalTodo.find('.modal-header').text(title);
		modalTodo.find('.modal-header').append(
			'<small class="right">'+
				'('+priority+')'+
			'</small>'
		);
		
		var html =
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
	}
	
	// returns duration in string
	function getDuration(createdAt, elapsed) {
		var elapsedTime = moment(createdAt).add(elapsed,'seconds').format('X');
		var initTime = moment(createdAt).format('X');
		var delta = elapsedTime - initTime;
		delta = moment.duration(delta, "s");
		var duration = delta.hours() + 'h ' + delta.minutes() + 'm ' + delta.seconds() + 's';
		
		return duration;
	};
	
	// manages data and sends post
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
			console.log(data);
		}).fail(function(error) {
			console.log(error);
		});
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