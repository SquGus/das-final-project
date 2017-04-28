$(function() {
	
	/* JQUERY VARIABLES */
	var list = $('#list');
	var modalTodo = $('#modal-todo');
	
	/* FUNCTIONS */
	// request for json data
	function getData() {
		$.get('/api/data', function() {
			
		}).done(function(data) {
			var json = JSON.parse(data);

			json.forEach(function(todo, i) {
				addTodo(todo);
			});
		});
	};
	
	// adds todos to list
	function addTodo(todo) {
		var html =
				'<a class="collection-item" href="#modal-todo"'+
					'data-title="'+todo.title+'"'+
					'data-priority="'+todo.priority+'"'+
					'data-details="'+todo.details+'"'+
					'data-created="'+todo.createdAt+'"'+
					'data-elapsed="'+todo.elapsedTime+'"'+
					'data-finish="'+todo.finishAt+'"'+
				'>'+
					'<span class="badge '+todo.priority+'">'+
						todo.priority+
					'</span>'+
					todo.title+
				'</a>';
		list.append(html);
	};
	
	// paints todo details in modal
	function renderTodo(todo) {
		todo = $(todo);
		
		var title = todo.attr('data-title'),
				priority = todo.attr('data-priority'),
				details = todo.attr('data-details'),
				created = todo.attr('data-created'),
				elapsed = parseInt(todo.attr('data-elapsed')),
				finish = todo.attr('data-finish');
		
		modalTodo.find('.modal-header').text(title);
		modalTodo.find('.modal-header').append(
			'<small class="right">'+
				'('+priority+')'+
			'</small>'
		);
		
		var elapsedTime = moment(created).add(elapsed,'seconds').format('X');
		var initTime = moment(created).format('X');
		
		var delta = elapsedTime - initTime;
		delta = moment.duration(delta, "s");
		var duration = delta.hours() + ':' + delta.minutes() + ':' + delta.seconds();
				
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
	
	/* EVENT FUNCTIONS */
	$('body').on('click', '.collection-item', function() {
		renderTodo( $(this)[0] );
	});
	
	
	/* INITIALIZATION CALLS */
	$('.modal').modal();
	var data = getData();
});