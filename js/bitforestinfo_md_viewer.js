// --------------------------------------------------------------
//                 Configuration - Start
// ---------------------------------------------------------------

// textarea id
var InputID = "MDEditor";

// preview div id
var OutputID = "MDViewerPreview"; 

// https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet

// --------------------------------------------------------------
//                  Configuration - End
// ---------------------------------------------------------------
//
// ---------------------------------------------------------------
//                 Regex Expression
// ---------------------------------------------------------------
var EXP_HEADING = '(\n(#+)(.+))' 			// header
var EXP_HRRULER = '(((\n)(---))|((\n)(___))|((\n)(\\*\\*\\*)))' // horizontal line
var EXP_OL_LIST = '((\n)(( *)(\\d+\\. )(.*)\n)+(\n))'	// order list
var EXP_BLOCK_C = '(\n(```)([^```]+)(```))' // code block
var EXP_UL_LIST = '((\n)(( *)([\-\+\*]+ )(.*)\n)+)'  // unorder list
var EXP_HEAD_HR = '((.+)\n((={3,})|(\-{3,})))' // ALT heading
var EXP_TABLEBD = '(\n(\\|?)([\\|\\w \\d]+)(\\|?)\n([ \\-\\|\\:]{7,})\n((\\|?)(.+)(\\|?)\n)+)' // Table
// EXP_TABLEBD = '(\n(\\|?)([\\|\\w \\d]+)(\\|?)\n([ \\-\\|\\:]{7,})\n((\\|?)(.+)(\\|?)\n)+)' // Table In More Detail
var EXP_INLINES = '(.+)'
var EXP_INDENTS = '(\n( {3,})(.+))'
var EXP_JOINER  = '|'


// All Expression
EXP_ALL = ''
EXP_ALL = EXP_ALL + EXP_HRRULER + EXP_JOINER
EXP_ALL = EXP_ALL + EXP_HEADING + EXP_JOINER
EXP_ALL = EXP_ALL + EXP_HEAD_HR + EXP_JOINER
EXP_ALL = EXP_ALL + EXP_BLOCK_C + EXP_JOINER
EXP_ALL = EXP_ALL + EXP_UL_LIST + EXP_JOINER
EXP_ALL = EXP_ALL + EXP_OL_LIST + EXP_JOINER
EXP_ALL = EXP_ALL + EXP_TABLEBD + EXP_JOINER
EXP_ALL = EXP_ALL + EXP_INDENTS + EXP_JOINER
EXP_ALL = EXP_ALL + EXP_INLINES

// REGEX
var REGEX_HEADING = new RegExp(EXP_HEADING);
var REGEX_HRRULER = new RegExp(EXP_HRRULER);
var REGEX_OL_LIST = new RegExp(EXP_OL_LIST);
var REGEX_BLOCK_C = new RegExp(EXP_BLOCK_C);
var REGEX_UL_LIST = new RegExp(EXP_UL_LIST);
var REGEX_HEAD_HR = new RegExp(EXP_HEAD_HR);
var REGEX_TABLEBD = new RegExp(EXP_TABLEBD);
var REGEX_INLINES = new RegExp(EXP_INLINES);
var REGEX_INDENTS = new RegExp(EXP_INDENTS);
var REGEX_EXP_ALL = new RegExp(EXP_ALL);


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++
//    Custom Functions Inherited With String Prototype
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Replace All Function
String.prototype.replaceall = function (find, replace) {
    var str = this;
    return str.replace(new RegExp(find, 'g'), replace);
};

// Custom Slicing Technique
String.prototype.indexslice = function (x, y='+'){
	var txt = this;
	tmp = '';
	// if minus
	if (x<0){
		x = txt.length + x;
	}
	if (y<0){
		y = txt.length + y-1;
	}
	if (y=='+') {
		y = txt.length;
	}
	//console.log('X : '+x+', Y : '+y);
	if (x<y) {
		for (var i = x; i < y; i++) {
			tmp = tmp + txt[i];
		}
	}else{
		for (var i = x ; i >= y; i--) {
			tmp = txt[i] +tmp ;
		}
	}
	return tmp;
}

// =======================================================
//                      [Ends here]
// =======================================================

// Heading
function HEADINGPROCESSOR(argument){
	// Numbers of #
	tmp = argument.search(' ');
	etag = "<h" + (tmp -1) + '>{}</h'+(tmp-1)+'>';
	//console.log(argument.search(' '));
	return etag.replace('{}', argument.indexslice(tmp));
}

// Horizontal Ruler
function HRRULERPROCESSOR(argument){
	if (argument.search('===')) {
		return "<h1>{}</h1><hr />".replace('{}', argument);
	}else{
		return "<h2>{}</h2><hr />".replace('{}', argument); 
	}
	
}

// CODE BLock Processor
function CDBLOCKPROCESSOR(argument){
	argument = argument.indexslice(4, -4);

	return "<pre>{}</pre>".replace('{}', argument)
}

function GLOBALPROCESSOR(argument){
	return '<p>{}</p>'.replace('{}', argument)
}

function InlineRegex(argument){
	console.log('({})'.replace('{}',argument));

	// heading Done
	if (REGEX_HEADING.test(argument)){
		return HEADINGPROCESSOR(argument);
	}
	
	// Horizontal Rulers Done
	else if (REGEX_HRRULER.test(argument)){
		return '<hr />';
	}
	// Heading Horizontal Done
	else if (REGEX_HEAD_HR.test(argument)){
		return HRRULERPROCESSOR(argument);
	}
	// Order List
	else if (REGEX_OL_LIST.test(argument)){
		return '';
	}
	// Code Block Done
	else if (REGEX_BLOCK_C.test(argument)){
		return CDBLOCKPROCESSOR(argument);
	}
	// Table
	else if (REGEX_TABLEBD.test(argument)){
		return '';
	}
	// Unordered List
	else if (REGEX_UL_LIST.test(argument)){
		return '';
	}
	// Indent Done
	else if (REGEX_INDENTS.test(argument)){
		return '<p style="margin-left: 40px; background: ghostwhite;">{}</p>'.replace('{}', argument);
	}
	// Inlines
	else if (REGEX_INLINES.test(argument)){
		return GLOBALPROCESSOR(argument);
	}
	// Not Identified
	else{
		return '<p>{}</p>'.replace('{}', argument);
	}
}




// Process Parent Regex 
function ParentRegex(text){
	// Find Match
	EXPRESSION = EXP_ALL;

	EXPRESSION = new RegExp(EXPRESSION, 'g');
	//console.log("Compiled EXPRESSION : "+ EXPRESSION);
	var result = text.match(EXPRESSION);
	//console.log("Search Result : "+ result);
	return result;
}



// Markdown To Html Conversion main function
function MDTOHTML(inp, out){
	// nodes
	var node = ''

	// Some Required Editings
	var input_text = '\n' + inp.value;
	input_text = input_text.replaceall('\t', '    ');

	// if text, then call 
	if (input_text) {

		// Call Parent Tag Processor Function
		var parentnodes = ParentRegex(input_text);
		if (parentnodes) {

			for (var i = 0; i < parentnodes.length; i++) {
				node = node + InlineRegex(parentnodes[i]);
			};
		}
	};
	return node;

}


// preview Function Automatically Gets Trigger When, User Press Any keyboard button
function preview() {

	// Get Objects
	var inptext = document.getElementById('MDEditor');
	var outtext = document.getElementById('MDViewerPreview');

	// If User Inserted Object Detected
	if ((inptext) && (outtext)) {
		// Call Markdown To html Conversion function
		var nodes = MDTOHTML(inptext, outtext);
	
		// if nodes
		if (nodes) {
			outtext.innerHTML = nodes;
		};
	};


	return;
}

// Event handling Mechanism
var inptext = document.getElementsByClassName('Editor');


//	Check if its non IE
if (inptext.Editor.addEventListener) {
  	inptext.Editor.addEventListener('input', preview);
}else{
	if (inptext.Editor.attachEvent) {
		inptext.Editor.attachEvent('onpropertychange', preview);
	}
}; 
preview();
