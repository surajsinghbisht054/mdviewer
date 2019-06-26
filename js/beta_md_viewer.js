// --------------------------------------------------------------
//                 Configuration - Start
// ---------------------------------------------------------------

// textarea id
var InputID = "MDEditor";

// preview div id
var OutputID = "MDViewerPreview";

// Attributes Properties
DEFAULT_PROPERTIES = 'font-style: normal;line-height: normal;font-size: xx-small;';
HEADING_ONE   = 'font-size: larger;'
HEADING_TWO   = 'font-size: large;'
HEADING_THREE = 'font-size: medium;'
HEADING_FOUR  = 'font-size: small;'
HEADING_FIVE  = 'font-size: x-small;'
HEADING_SIX   = 'font-size: xx-small;'


// --------------------------------------------------------------
//                  Configuration - End
// ---------------------------------------------------------------
//
// ++++++++++++++++++++++++++++++++++++++++++++++
//                Supported Syntax
// ++++++++++++++++++++++++++++++++++++++++++++++
// - Heading Supported
// - Code Block And Indent Code Supported
// - Horizontal lIne Supported
//
//
//

//   Working On Regex
//
//	Headlines : ((\n?)(#+ .+))
//	((\n+)(#+ .+))|((\n+)(---))|((\n+)(\*\*\*))|((\n+)(\t?)(\+))|((\n+)(\t?)(\-))
//	((\n{1})(#+ .+))|((\n{1})(---))|((\n{1})(\*\*\*))|((\n{1})(\t?)(\+))|((\n{1})(\t?)(\-))
//  ((\n{1})(#+ .+))|((\n{1})(---))|((\n{1})(___))|((\n{1})(\*\*\*))|((\n{1})(\t?|\s{4,})(\+)(.+))|((\n{1})(\t?|\s{4,})(\-)(.+))|((\n{1})(\t?|\s{4,})(\d)(.+))
//
//  Parent Extraction:
//	((\n{1})(#+ .+))|((\n{1})(---))|((\n{1})(___))|((\n{1})(\*\*\*))|((\n{1})(\+)(.+))|((\n{1})(\-)(.+))|((\n{1})(\d)(.+))
//
//
//	BLock
//	(((\n```)(.+)?(\n))(([^```]+)(\n```)))
//	(([`]{3,})([^```]+)([`]{3,}))
//

// var EXP_TABLE_H = '(\n(\|)([ \d\w\|]+)\n([ \|\-\t\:]+))'
// var EXP_TABLE_R = '((\|)[\|\w\d\. ]+(\|))'
// ((\n\n)(()|())+(\n\n))   - (( |\t)?(\d+\. )(.+))
// ================================================================================
// ============================== REGEX Collections ===============================
// ================================================================================
var EXP_HEADING = '((\n)(#+)(.+))' // Works Correctly
var EXP_HRRULER = '(((\n{1})(---))|((\n{1})(___))|((\n{1})(\\*\\*\\*)))' // works correctly
var EXP_OL_LIST = '((\n)(((    )*|(\t)*)(\d+\\. )(.*)\n)+(\n))'
EXP_OL_LIST = '(\n)(\d+\\. )(.*)'
console.log(EXP_OL_LIST)
var EXP_UL_LIST = '(((\n{1})(\\+)(.+))|((\n{1})(\-)(.+)))'
var EXP_INLINES = '(.+)'
var EXP_JOINER  = '|'
var EXP_BLOCK_C = '(\n(```)([^```]+)(```))' // works correctly
var EXP_ILINE_C = '(([`])([^`\n]+)([`]))'
var EXP_INDNT_C = '((\n(\t)|( {4,}))([^\n\*\+\\-\\|]+))'
var EXP_TABLE_H = '(\n(\\|)(.+)(\\|)\n([ \\|\\-\t\:]+)\n)'
var EXP_TABLE_R = '((\\|)(.+)(\\|))'
var EXP_TABLE_J = '(' + EXP_TABLE_H + '|' + EXP_TABLE_R + ')'

// ALL JOINED
var EXP_ALL = ''

EXP_ALL = EXP_ALL +  EXP_HRRULER + EXP_JOINER
EXP_ALL = EXP_ALL +  EXP_BLOCK_C + EXP_JOINER
EXP_ALL = EXP_ALL +  EXP_INDNT_C + EXP_JOINER
EXP_ALL = EXP_ALL +  EXP_TABLE_J + EXP_JOINER
//EXP_ALL = EXP_ALL +  + EXP_JOINER
//EXP_ALL = EXP_ALL +  + EXP_JOINER
EXP_ALL = EXP_ALL + EXP_HEADING + EXP_JOINER
EXP_ALL = EXP_ALL + EXP_OL_LIST + EXP_JOINER
EXP_ALL = EXP_ALL + EXP_UL_LIST + EXP_JOINER
EXP_ALL = EXP_ALL + EXP_INLINES



// [Parent Regex Expression ]
var Parent_Regex_Expression = new RegExp(EXP_ALL, 'g');
console.log(Parent_Regex_Expression);

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++
//    Custom Functions Inherited With String Prototype
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Replace All Function
String.prototype.replaceall = function (find, replace) {
    var str = this;
    return str.replace(new RegExp(find, 'g'), replace);
};

// Custom Slicing Technique
String.prototype.indexslice = function (x, y=0){

	var txt = this;
	tmp = '';

	// if minus
	if (x<0){
		x = txt.length + x;
	}
	if (y<0){
		y = txt.length + y-1;
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

// Text Processor function
function TextProcessor(argument) {
	// body...
};

// Syntax And Blocks Process
function BlocksProcessor(argument){
	argument = indexslice(argument,4, argument.length-4);
	return '<pre>{}</pre>'.replace("{}",argument);

};

// Heading Processor
function HeadingProcessor(arguments){
	argument = arguments.split(' ')[0];
	argument = argument.length-1;
	return '<h'+argument+'>'+ indexslice(arguments, arguments.search(' '), -1)+'<\h'+argument+'>'

};

// Link Processor
function LinkProcess(argument){

};

function tagstyle(txt){

	// Heading
	if (String.match(txt, EXP_HEADING)){
		return HeadingProcessor(txt);

	} else if (String.match(txt, EXP_HRRULER)) {
		// Horizontal Lines
		return '<hr />';
	}
	// Check if Block Codes
	else if (String.match(txt, EXP_BLOCK_C)) {
		return BlocksProcessor(txt);
	}
	else if (String.match(txt, EXP_OL_LIST)) {
		return '';

	}
	else if (String.match(txt, EXP_UL_LIST)) {
		return '';
	}
	else if (String.match(txt, EXP_TABLE_H)) {
		return '';
	}
	else if (String.match(txt, EXP_TABLE_R)) {
		return '';
	}
	else {
		return '<p>{}</p>'.replace('{}',txt);

	}
}

// Process Parent Regex
function ParentRegex(text){
	// HTML Elements Nodes
	var node = [];

	// Find Match
	var result = text.match(new RegExp(EXP_OL_LIST, 'g'));//Parent_Regex_Expression);
	console.log(result);
	// iterate result
	for (var i = 0; i < result.length; i++) {
		// create elemen
		obj = result[i];

		//obj = tagstyle(obj);

		// Set Default Properties
		//obj.style=DEFAULT_PROPERTIES;

		// Push Object Into List
		node.push(obj);
	}

	return node;
}

function InlineAdding(argument, exp, format){

	return format.replace('{}',)

}

function InlineRegex(argument){
	if (true) {

		return '<p>[Start]{}[End]</p>'.replace('{}', argument);
	}
	// inline codes
	argument = replaceAll(argument, ' `' , '<code>')
	argument = replaceAll(argument, '`' , '</code>')

	// bold
	argument = replaceAll(argument, '** ' , '</b>')
	argument = replaceAll(argument, ' `' , '<code>')

	argument = replaceAll(argument, ' `' , '<code>')
	argument = replaceAll(argument, ' `' , '<code>')

	argument = replaceAll(argument, ' `' , '<code>')
	argument = replaceAll(argument, ' `' , '<code>')

	argument = replaceAll(argument, ' `' , '<code>')
	argument = replaceAll(argument, ' `' , '<code>')


	return argument;
}

// Markdown To Html Conversion main function
function MDTOHTML(inp, out){
	// nodes
	var node = ''

	// input text
	var input_text = '\n' + inp.value;

	// if text, then call
	if (input_text) {

		// Call Parent Tag Processor Function
		var parentnodes = ParentRegex(input_text);
		for (var i = 0; i < parentnodes.length; i++) {
			node = node + InlineRegex(parentnodes[i]);
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
