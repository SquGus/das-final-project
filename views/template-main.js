exports.build = function(title, pagetitle, content) {
	// builds basic template
	return [
		'<!doctype html>',
		'<html lang="en"><meta charset="utf-8"><title>{title}</title>',
		'<link rel="stylesheet" href="/assets/style.css"/>',
		'<h1>{pagetitle}</h1>',
		'<div id="content">{content}</div>'
	].join('')
	// replaces placeholders with actual values from variables
	.replace(/{title}/g, title)
	.replace(/{pagetitle}/g, pagetitle)
	.replace(/{content}/g, content);
};