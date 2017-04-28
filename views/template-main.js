var modalAdd = require('../views/modal-add');
var modalEdit = require('../views/modal-edit');
var modalTodo = require('../views/modal-todo');

exports.build = function(title, pagetitle, content) {
	// builds basic template
	return [
		'<!doctype html>',
		'<html lang="en"><meta charset="utf-8"><title>{title}</title>',
		'<link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">',
		'<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/css/materialize.min.css">',
		'<link rel="stylesheet" href="/assets/style.css"/>',
		'<meta name="viewport" content="width=device-width, initial-scale=1.0"/>',
		'<body>',
			'<header>',
				'<div class="navbar-fixed">',
					'<nav>',
						'<div class="nav-wrapper">',
							'<a class="brand-logo center">{pagetitle}</a>',
						'</div>',
					'</nav>',
				'</div>',
			'</header>',
			'<main>',
				'<div class="container">',
					'<div class="row">',
						'<div class="col s12">',
							'{content}',
						'</div>',
					'</div>',
				'</div>',
				'<div class="fixed-action-btn left">',
    			'<a class="btn-floating btn-large red" href="#modal-add">',
      			'<i class="large material-icons">add</i>',
					'</a>',
				'</div>',
				'<div class="fixed-action-btn">',
    			'<a class="btn-floating btn-large red">',
      			'<i class="large material-icons">av_timer</i>',
					'</a>',
				'</div>',
				modalAdd.getPartial,
				modalEdit.getPartial,
				modalTodo.getPartial,
			'</main>',
			'<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>',
			'<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/js/materialize.min.js"></script>',
			'<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>',
			'<script src="js/clockPicker.min.js"></script>',
			'<script src="js/manageTodos.js"></script>',
		'</body>',
	].join('')
	// replaces placeholders with actual values from variables
	.replace(/{title}/g, title)
	.replace(/{pagetitle}/g, pagetitle)
	.replace(/{content}/g, content);
};