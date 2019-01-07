//								[ license ]
//
//                                 Apache License
//                           Version 2.0, January 2004
//                        http://www.apache.org/licenses/
//
// Please Read LICENCE file.
//
//
// Author:
//			Suraj Singh Bisht
//			surajsinghbisht054@gmail.com
//			bitforestinfo.com
//			github.com/surajsinghbisht054
//
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
//		:- BlockQuote
//
//
// ---------------------------------------------------------------
//                 Regex Expression
// ---------------------------------------------------------------
var EXP_HEADING = '(\n(#+)(.+))' 			// header
var EXP_HRRULER = '(((\n)(---))|((\n)(___))|((\n)(\\*\\*\\*)))' // horizontal line
var EXP_OL_LIST = '((\n( *)(\\d+)(\\. )(.*))+)'	// order list
var EXP_BLOCK_C = '(\n(```)([^]+?)(```))' // code block
var EXP_UL_LIST = '((\n( *)([\-\+\*]+ )(.*))+)'  // unorder list
var EXP_HEAD_HR = '((.+)\n((={3,})|(\\-{3,})))' // ALT heading
var EXP_TABLEBD = '(\n(\\|?)([\\|\\w \\d]+)(\\|?)\n([ \\-\\|\\:]{7,})\n((\\|?)(.+)(\\|?)\n)+)' // Table
var EXP_INLINES = '(.+)'
var EXP_INDENTS = '(\n( {4,})(.+))+'
var EXP_JOINER  = '|'


// All Expression
EXP_ALL = ''
EXP_ALL = EXP_ALL + EXP_BLOCK_C + EXP_JOINER
EXP_ALL = EXP_ALL + EXP_HRRULER + EXP_JOINER
EXP_ALL = EXP_ALL + EXP_HEADING + EXP_JOINER
EXP_ALL = EXP_ALL + EXP_TABLEBD + EXP_JOINER
EXP_ALL = EXP_ALL + EXP_HEAD_HR + EXP_JOINER
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


DEFAULT_STYLE = [
//	('Styles', 'Class') <-- Index Number is Key [Use Class for Bootstrap Features]
	["border-left-style: groove;border-left-color: darkgreen;border-left-width: thick;", 'blockquote pl-1'], // 0== Blockquote
	["", 'm-5 text-danger '],	//1== Tab indents
	['','ml-1'], // 2==> Global 
	['','text-white p-3 my-3 bg-dark'], // 3==> Programming Codes 
	['','p-1 m-2 text-capitalize mt-3'], // 4==> Headings
	['','my-4'], // 5==> Horizontal Lines
	['','ml-1 my-2'], // 6==> Order List
	['','ml-1 my-2'], // 7==> UnorderList
	['','table mb-3 mt-1 table-striped'], // 8==> Table
	['','text-primary text-capitalize mx-2'], // 9 ==> Links
	['','bg-success p-1 px-2 rounded text-white'], // 10 ==> Inline Codes
	['','img-thumbnail mx-auto d-block'], // 11 ==> Image Feature

]

// Add Style
function AddStyle(exp, n, additional) {
	// Format
	var obj = '';
	if(DEFAULT_STYLE[n][0]){
	obj += ' style="'+DEFAULT_STYLE[n][0];
	obj += additional;
	obj += '"';	
	};

	if(DEFAULT_STYLE[n][1]){
	obj += ' class="';
	obj += DEFAULT_STYLE[n][1];
	obj += '"';	
	
	}

	
	exp = exp.replace('{style}',obj);
	return exp;
}




// ++++++++++++++++++++++++++++++++++++++++++++++++++++++
//    Custom Functions Inherited With String Prototype
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Escape HTML
function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }

// Replace All Function
String.prototype.replaceall = function (find, replace) {
    var str = this;
    	return str.replace(new RegExp(find, 'g'), replace)
}

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
	etag = "<h" + (tmp -1) + '{style}>{}</h'+(tmp-1)+'>';
	//console.log(argument.search(' '));
	etag = etag.replace('{}', argument.indexslice(tmp));
	return AddStyle(etag, 4)
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
		ret = '<br /><h1>{}</h1><hr {style} />'.replace('{}', argument[0]);
	}
	else{
		ret= '<h2>{}</h2><hr {style} />'.replace('{}', argument[0]);
	}
	return AddStyle(ret, 5);
}

// CODE BLock Processor
function CDBLOCKPROCESSOR(argument){
	// Input:
	//		argument = Text
	//	Output:
	//		<pre></pre> Tag Attached To Arguments
	//

	argument = argument.indexslice(4, -2);

	return AddStyle("<pre {style}>{}</pre>".replace('{}', argument), 3);
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
		tmpobj += '<th scope="col">{}</th>'.replace('{}', tbheader[i]);
	}
	tmpobj += '</tr>'

	// Iterate Table Rows
	for (var i = 0; i < tbrows.length; i++) {
		// Row Cell
		tmpobj += '<tr scope="row">'
		tbrow = tbrows[i].split('|').filter(String)
		for(var j=0; j< tbrow.length; j++){
			tmpobj += '<td>{}</td>'.replace('{}', tbrow[j])
		}
		tmpobj += '</tr>'
	}
	return AddStyle('<table {style}>{}</table>'.replace('{}', tmpobj),8);
}

// Global Processor
function GLOBALPROCESSOR(argument){
	// Input:
	//		argument = Text
	//	Output:
	//		Paragraph Tag Attached To Arguments
	//


	return AddStyle('<div {style}>{}</div>'.replace('{}', argument),2)
}

// Sub List, Currently not Supported
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
		tmpobj += '<li class="list-group-item border-dark">{}</li>'.replace('{}',argument[i])
	}
	return AddStyle('<ul {style}>{}</ul>'.replace('{}', tmpobj),7);
}

// Still, Under Construction :))
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
		tmpobj += '<li class="list-group-item border border-dark">{}</li>'.replace('{}', argument[i])
	}
	return AddStyle('<ol {style}>{}</ol>'.replace('{}', tmpobj), 6);
}


// Tab Lines Processor
function IndentProcessor(argument){
	argument = argument.replace('\n', '');
	argument = argument.replaceall('\n', '<br />');
	//console.log(argument)
	argument = '<div {style}>{0}</div>'.replace('{0}', argument);
	return AddStyle(argument, 1);
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
function LinksProcessor(argument1){
	// Input:
	//		argument = Text
	//	Output:
	//		<a> </a> Tag Attached To Arguments
	//

	tmptxt = ''
	argument = argument1.split(RegExp('(\\[.+?\\]\\(.+?\\))')).filter(String)
	
	for (var i = 0; i < argument.length; i++) {
		if(argument[i][0]=='['){
			// Link EXP
			s=argument[i];
			s=s.indexslice(1, s.length-1).split('](')
			if (argument1.match('!')) {
				
				tmptxt += '<img src="{0}" alt="{}" {style} width="50%" />'.replace('{0}', s[1]).replace('{}', s[0])
			}else{
				tmptxt += '<a href="{0}" {style}>{}</a>'.replace('{0}', s[1]).replace('{}', s[0])
			}
			
		}
		else{
			tmptxt += argument[i];			
		}
	}
	if (argument1.match('!')) {
		return AddStyle(tmptxt.replace('!',' '), 11);	
	};
	
	return AddStyle(tmptxt, 9);
}

// To Perform Internal Tags Syntax
function InternalProcessors(argument){
	
	if (argument.match('<pre')){
		return argument;
	}
	else if (argument.match('<code')) {
		return argument;
	}
	else {
	// Bold 
	argument = LittleProcessor(argument, '(\\*{2}|_{2})(.+?)(\\*{2}|_{2})', ['**', '__'],'<strong>', '</strong>');
	// Italic
	argument = LittleProcessor(argument, '(\\*{1}|_{1})(.+?)(\\*{1}|_{1})', ['*', '_'],'<i>', '</i>');
	// Strike
	argument = LittleProcessor(argument, '(~{2})(.+?)(~{2})', ['~~'],'<strike>', '</strike>');
	// Inline Codes
	argument = LittleProcessor(argument, '(`)(.+?)(`)', ['`'], '<code {style} >','</code>');
	argument = AddStyle(argument, 10);
	
	// blockquote
	//argument = LittleProcessor(argument, '(>)(.+?)(\\n)', ['>','\n'], '<code style="background: red;">','</code>');
	
	if (argument.match('&gt;')){
		//console.log(argument.split(RegExp('(.+?)(&gt;)([^<]+)')));
		argument = '<div {style} >{0}</div>'.replace('{0}',argument);
		argument = AddStyle(argument, 0, 'margin-left: '+argument.match(/&gt;/g).length+'0px;'); 
		argument = argument.replace(/&gt;/g,"");
	};
	// Links Processor
	argument = LinksProcessor(argument)

	return argument;
	}
}

function HRRULER_PROCESSOR(argument) {
	if (argument.match('_')) {
		return '<br />'
	};
	if (argument.match('-')) {
		return '<br /><hr class="bg-dark mx-1" />'
	};
	
	return '<hr class="bg-dark mx-1" /><br />'
}

function InlineRegex(argument){
	//console.log('({})'.replace('{}',argument));
	// Code
	if (REGEX_BLOCK_C.test(argument)){
		//console.log(argument)
		return CDBLOCKPROCESSOR(argument);
	} 	
	// Indent Done
	else if (REGEX_INDENTS.test(argument)){
		return IndentProcessor(argument)
	}
	// Table
	else if (REGEX_TABLEBD.test(argument)){
		return TABLEPROCESSOR(argument);
	}	
	// Heading
	else if (REGEX_HEADING.test(argument)){
		return HEADINGPROCESSOR(argument);
	}
	// Heading Horizontal Done
	else if (REGEX_HEAD_HR.test(argument)){
		return HRRULERPROCESSOR(argument);
	}
	// Horizontal Rulers Done
	else if (REGEX_HRRULER.test(argument)){
		return HRRULER_PROCESSOR(argument);
	}
	// Order List
	else if (REGEX_OL_LIST.test(argument)){
		return OrderListProcessor(argument);
	}
	// Unordered List
	else if (REGEX_UL_LIST.test(argument)){
		return UnOrderListProcessor(argument);
	}
	
	// Inlines
	else if (REGEX_INLINES.test(argument)){
		return GLOBALPROCESSOR(argument);
	}
	// Not Identified
	else{
		return '<div id="notidentified">{}</div>'.replace('{}', argument);
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
	
	input_text = escapeHtml(input_text);

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

// function to automatically, bind preview function with keyboard key
function bindkey(){

		// Event handling Mechanism
		var inptext = document.getElementById(InputID);


		//	Check if its non IE
		if (inptext.addEventListener) {
		  	inptext.addEventListener('input', preview);
		}else{
			if (inptext.attachEvent) {
				inptext.attachEvent('onpropertychange', preview);
			}
		}; 

		// Preview Call
		preview();

}
