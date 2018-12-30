## MdViewer 
Simple Javascript Codes, That Can Convert Your Markdown Codes Into HTML.

### Author Information
---
```
Author:
		Suraj Singh Bisht
			Surajsinghbisht054@gmail.com
				www.bitforestinfo.com
					github.com/surajsinghbisht054

```
### About This Project
---
```
I Created This Project Just For Fun, Practise And May Be for Any Type Of Profit. In this project, my
goal was to convert simple Markdown Text as Argument And Preview Those Codes As HTML Converted Preview.

So, now after all of my hardwork, now You Can Use This Project Javascript code Directly Anywhere To Convert
Your Markdown Text Into HTML Elements.

Just Embed Javascript From Repo.   
```


### How its Works?
```
Actually, I am little mad boy, That's Why I wrote these javascript Codes from completely scratch (Even not study anyone else related project. So, there are complete chance that my code solution can blow your mind... hahaha). I Used Lots of Regular Expression Functions, Many Javascript Other Built-In Functions To Acheive My Goals.

Actually, i am still a noob, so forgive me if i have used any wrong code here in this script. but please Please, 
don't forget to email me if you have anything good comment about my code or Any type of suggestions about my codes.
```
### How To Simply Use It?
```
I Used HTML Element <textarea> as an Input Source, And <div> as Output Preview Tag. 
I used lots of own wrote regular expressions and functions to split,join,test,find,slice,format
and much More.
```

### How You Can Simply Use it?
```

METHOD To Use:
	Use <textarea  id="MDEditor"> as Input.
	Use <div  id="MDViewerPreview"> as Output.

	Add Header:

	<!--	http://cdn.jsdelivr.net/gh/surajsinghbisht054/mdviewer/css/mdviewer.css -->
	<link rel="stylesheet" type="text/css" href="./css/mdviewer.css">

	<!-- http://cdn.jsdelivr.net/gh/surajsinghbisht054/mdviewer/js/bitforestinfo_md_viewer.js -->
	<script src="./js/bitforestinfo_md_viewer.js"></script>
	
	Add In Bottom:
	
		<script type="text/javascript">
			// Bind Keys To Automatically Trigger Preveiw Function, At Every Key press event
			bindkey();
			// Or Manually, Call
			preview();

		</script>


	[ --- If You Want To Use Internal Functionality In Custom Way, Then ]
	
		// Call Markdown To html Conversion function
		var nodes = MDTOHTML(inptext, outtext); 

		// Parameters:
		// 		inptext is a object = document.getElementById(<textarea>);
		//		outtext is a object = document.getElementById(<div>);
		//
		// 		nodes is return object, its a HTML tag string.  
		//
		// if nodes
		if (nodes) {
			outtext.innerHTML = nodes;
		};
		//
		// Simple~

```