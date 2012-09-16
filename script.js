$(function() {
	$("#bm_generate .sortable").sortable({
		axis:   "y",
		handle: ".sort"
	});

	$("#add_row_link").bind("click", bm_ns.add_row);
	$(".del").live("click", bm_ns.delete_row);
	$("#generate_btn").bind("click", function() { bm_ns.generate_bookmarklet(true) });

	// generate it for them automatically
	bm_ns.generate_bookmarklet(false);
});


var bm_ns = {};
bm_ns.add_row = function(e) {
	$("#bm_generate .sortable").append(
		'<div class="row">' +
		'<ul>' +
			'<li class="col0 sort">&nbsp;</li>' +
			'<li class="col1"><input type="text" value="" /></li>' +
			'<li class="col2"><input type="text" value="" /></li>' +
			'<li class="col3"><input type="text" value="" /></li>' +
			'<li class="col4 colN del">x</li>' +
		'</ul>' +
		'<div class="clear"></div>' +
	'</div>');
}

bm_ns.delete_row = function(e) {
	$(e.target).closest(".row").remove();
}

bm_ns.generate_bookmarklet = function(highlight) {
	var link = "javascript:document.write('<!DOCTYPE html><html><head>&lt;meta charset=&quot;utf-8&quot;><title>Responsive Design Testing</title><style>html{min-height: 100%;} body{ height: 100%; position: relative; margin: 0; overflow-x: scroll; background: #000; }.wrapper { width: 20000px; }.frame { float: left; background: #fff; position: relative; border-left: 6px solid rgb(158, 158, 158);}h2 { margin: 0; }iframe { margin: 0; border: none;}</style></head><body><div class=&quot;wrapper&quot;>";
	$("#bm_generate .sortable .row").each(function() {
		var width  = $(this).find(".col1 input").val();
		var height = '100%';
		var label  = $(this).find(".col3 input").val();
		if (label) {
			label = "(" + label + ")";
		}
		link += "<div class=&quot;frame&quot;>"
					+ "<iframe src=&quot;' + window.location + '&quot; sandbox=&quot;allow-same-origin allow-forms&quot; seamless "
					+ "width=&quot;" + width + "&quot; height=&quot;" + height + "&quot;></iframe></div>"
	});
	link += "</div></body></html>')";
	$("#bookmarklet_link").html('<a href="' + link + '">Responsive Design Test</a>');

	if (highlight) {
		$("#bookmarklet_link").effect("highlight", { color: "#00ff00" }, 2000);
	}
}
