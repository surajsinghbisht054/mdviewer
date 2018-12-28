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

// Supported Syntaxes
// 		:- ALL Headers (#, ##, ###...)
//		:- Horizontal Lines (---,***, ___)
//		:- Alt heading (##\n===)
//		:- Code Blocks
//		:- Bold, Italic, Strike
//		:- Links
//		:- Inline Codes
//		:- Indent Codes
//		:- Table
//		:- order List
//		:- Unorder List
// ---------------------------------------------------------------
//                 Regex Expression
// ---------------------------------------------------------------
var EXP_HEADING = '(\n(#+)(.+))' 			// header
var EXP_HRRULER = '(((\n)(---))|((\n)(___))|((\n)(\\*\\*\\*)))' // horizontal line
var EXP_OL_LIST = '((\n( *)(\\d+)(\\. )(.*))+)'	// order list
var EXP_BLOCK_C = '(\n(```)([^```]+)(```))' // code block
var EXP_UL_LIST = '((\n( *)([\-\+\*]+ )(.*))+)'  // unorder list
var EXP_HEAD_HR = '((.+)\n((={3,})|(\\-{3,})))' // ALT heading
var EXP_TABLEBD = '(\n(\\|?)([\\|\\w \\d]+)(\\|?)\n([ \\-\\|\\:]{7,})\n((\\|?)(.+)(\\|?)\n)+)' // Table
var EXP_INLINES = '(.+)'
var EXP_INDENTS = '(\n( {3,})(.+))+'
var EXP_JOINER  = '|'


// All Expression
EXP_ALL = ''
EXP_ALL = EXP_ALL + EXP_HRRULER + EXP_JOINER
EXP_ALL = EXP_ALL + EXP_HEADING + EXP_JOINER
EXP_ALL = EXP_ALL + EXP_TABLEBD + EXP_JOINER
EXP_ALL = EXP_ALL + EXP_HEAD_HR + EXP_JOINER
EXP_ALL = EXP_ALL + EXP_BLOCK_C + EXP_JOINER
EXP_ALL = EXP_ALL + EXP_UL_LIST + EXP_JOINER
EXP_ALL = EXP_ALL + EXP_OL_LIST + EXP_JOINER
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
    	return str.replace(new RegExp(find, 'g'), replace)
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
	// Input:
	//		argument = Text
	//	Output:
	//		Heading Tag Attached To Arguments
	//

	// Numbers of #
	tmp = argument.search(' ');
	// HTML Element Tag
	etag = "<h" + (tmp -1) + '>{}</h'+(tmp-1)+'>';
	//console.log(argument.search(' '));
	return etag.replace('{}', argument.indexslice(tmp));
}

// Horizontal Ruler
function HRRULERPROCESSOR(argument){
	// Input:
	//		argument = Text
	//	Output:
	//		Horizontal Line Tag Attached To Arguments
	//

	argument = argument.split('\n')
	//console.log(argument)
	if (argument[1]=='===') {
		return '<h1>{}</h2><hr />'.replace('{}', argument[0]);
	}
	else{
		return '<h2>{}</h2><hr />'.replace('{}', argument[0]);
	}
	
}

// CODE BLock Processor
function CDBLOCKPROCESSOR(argument){
	// Input:
	//		argument = Text
	//	Output:
	//		<pre></pre> Tag Attached To Arguments
	//

	argument = argument.indexslice(4, -4);

	return "<pre>{}</pre>".replace('{}', argument)
}



// Table processing block
function TABLEPROCESSOR(argument){
	// Input:
	//		argument = Text
	//	Output:
	//		Table Tags Attached To Arguments
	//

	//console.log(argument)
	argument = argument.split('\n')
	//console.log(argument)

	tbheader = argument[1]; // String
	tbconfig = argument[2]; // STring
	tbrows = argument.slice(3).filter(String); // Array

	tbheader = tbheader.split('|').filter(String)

	//console.log('Table header : ', tbheader)
	//console.log('Table COnfig : ', tbconfig)
	//console.log('Table rows	   : ', tbrows)

	// Iterate Table Header
	tmpobj = '<tr>'
	for (var i = 0; i < tbheader.length; i++) {
		tmpobj += '<th>{}</th>'.replace('{}', tbheader[i]);
	}
	tmpobj += '</tr>'

	// Iterate Table Rows
	for (var i = 0; i < tbrows.length; i++) {
		// Row Cell
		tmpobj += '<tr>'
		tbrow = tbrows[i].split('|').filter(String)
		for(var j=0; j< tbrow.length; j++){
			tmpobj += '<td>{}</td>'.replace('{}', tbrow[j])
		}
		tmpobj += '</tr>'
	}
	return '<table>{}</table>'.replace('{}', tmpobj)
}


function GLOBALPROCESSOR(argument){
	// Input:
	//		argument = Text
	//	Output:
	//		Paragraph Tag Attached To Arguments
	//


	return '<p>{}</p>'.replace('{}', argument)
}

// Sub List not Supported
function UnOrderListProcessor(argument){
	// Input:
	//		argument = Text
	//	Output:
	//		Unorder List HTML Tag Attached To Arguments
	//

	//console.log(argument)
	argument = argument.replace(new RegExp('((\\- )|(\\+ )|(\\* ))', 'g'), '')
	
	argument = argument.split('\n').filter(String)
	//console.log(argument)

	var tmpobj = '';

	for (var i = 0; i < argument.length; i++) {
		tmpobj += '<li>{}</li>'.replace('{}',argument[i])
	}
	return '<ul>{}</ul>'.replace('{}', tmpobj)
}

function OrderListProcessor(argument){
	// Input:
	//		argument = Text
	//	Output:
	//		Ordered List HTML Tag Attached To Arguments
	//

	//console.log(argument)
	argument = argument.replace(new RegExp('((\\d+)\\. )', 'g'), '')
	//console.log(argument)
	argument = argument.split('\n').filter(String)
	//console.log(argument)
	var tmpobj = '';

	for (var i = 0; i < argument.length; i++) {
		tmpobj += '<li>{}</li>'.replace('{}', argument[i])
	}
	return '<ol>{}</ol>'.replace('{}', tmpobj)
}


// Tab Lines Processor
function IndentProcessor(argument){
	argument = argument.replaceall('\n', '<br />')
	//console.log(argument)
	return '<p style="margin-left: 40px; background: ghostwhite;">{}</p>'.replace('{}', argument);
}

// Function To Add Opening And Closing Tags In Start And End of Word
function LittleProcessor(txt, exp, element, opentag, closetag){
	// Parameters:
	//		txt = text
	//		exp = Regular Expression
	//		element = array of element to replace with opening and closing tag
	//		opentag = Opening Tag
	//		closetag = Closing Tag
	//
	tmptxt = ''
	remind = 0;
	txt = txt.split(RegExp(exp))
	//console.log(txt)
	for (var i = 0; i < txt.length; i++) {
		// If EXP Found
		if (element.indexOf(txt[i])!=-1)  {
			
			if (remind) {
				tmptxt += closetag;
				remind=0;
			}else{
				tmptxt += opentag;
				remind = 1;
			}
		}else{
			if (txt[i]) {
				tmptxt += txt[i]	
			}
		}
	}
	return tmptxt
}

// Function To process Links
function LinksProcessor(argument){
	// Input:
	//		argument = Text
	//	Output:
	//		<a> </a> Tag Attached To Arguments
	//

	tmptxt = ''
	argument = argument.split(RegExp('(\\[.+?\\]\\(.+?\\))')).filter(String)

	for (var i = 0; i < argument.length; i++) {
		if(argument[i][0]=='['){
			// Link EXP
			s=argument[i];
			s=s.indexslice(1, s.length-1).split('](')
			tmptxt += '<a href="{0}">{}</a>'.replace('{0}', s[1]).replace('{}', s[0])
		}
		else{
			tmptxt += argument[i]
		}
	}
	return tmptxt
}

// To Perform Internal Tags Syntax
function InternalProcessors(argument){
	// Bold 
	argument = LittleProcessor(argument, '(\\*{2}|_{2})(.+?)(\\*{2}|_{2})', ['**', '__'],'<strong>', '</strong>');
	// Italic
	argument = LittleProcessor(argument, '(\\*{1}|_{1})(.+?)(\\*{1}|_{1})', ['*', '_'],'<i>', '</i>');
	// Strike
	argument = LittleProcessor(argument, '(~{2})(.+?)(~{2})', ['~~'],'<strike>', '</strike>');
	// Inline Codes
	argument = LittleProcessor(argument, '(`)(.+?)(`)', ['`'], '<code style="background: lavender;">','</code>');

	// Links Processor
	argument = LinksProcessor(argument)

	return argument;
}


function InlineRegex(argument){
	//console.log('({})'.replace('{}',argument));

	// heading Done
	if (REGEX_HEADING.test(argument)){
		return HEADINGPROCESSOR(argument);
	}
	// Table
	else if (REGEX_TABLEBD.test(argument)){
		return TABLEPROCESSOR(argument);
	}
	
	// Heading Horizontal Done
	else if (REGEX_HEAD_HR.test(argument)){
		return HRRULERPROCESSOR(argument);
	}
	// Horizontal Rulers Done
	else if (REGEX_HRRULER.test(argument)){
		return '<hr />';
	}
	// Order List
	else if (REGEX_OL_LIST.test(argument)){
		return OrderListProcessor(argument);
	}
	// Code Block Done
	else if (REGEX_BLOCK_C.test(argument)){
		return CDBLOCKPROCESSOR(argument);
	}
	// Unordered List
	else if (REGEX_UL_LIST.test(argument)){
		return UnOrderListProcessor(argument);
	}
	// Indent Done
	else if (REGEX_INDENTS.test(argument)){
		return IndentProcessor(argument)
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
				node = node + InternalProcessors(InlineRegex(parentnodes[i]));
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
// Preview Call
preview();
