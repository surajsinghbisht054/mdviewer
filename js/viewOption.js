function mdViewFunction() {
  var markdown = document.getElementById("markdown");
  var htmlpreview = document.getElementById("htmlpreview");
  // conditions to set textarea
  if (markdown.style.display === "none") {
    // show the markdwon area
    markdown.style.display = "block";
    console.log('display markdown');
    markdown.style.width = '1200px';

    // and hide htmlpreview area.
    htmlpreview.style.display = "none";
  } else {
    // hide the htmlpreview textarea
    htmlpreview.style.display = "none";
    console.log('hide htmlpreview');

  }

    MDViewerPreview.style.width="1200px";
    MDEditor.style.width = "1200px";
}


function htmlViewFunction() {
  var markdown = document.getElementById("markdown");
  var htmlpreview = document.getElementById("htmlpreview");
  // conditions to set textarea
  if (htmlpreview.style.display === "none") {
    // show the htmlpreview area
    htmlpreview.style.display = "block";
    console.log('show htmlpreview');
    // and hide markdown area
    markdown.style.display = "none";
  } else {
    // markdown are set to hide
    markdown.style.display = "none";
    console.log('hide markdown');
  }

  MDViewerPreview.style.width="1200px";
    MDEditor.style.width = "1200px";
}

function bothViewFunction(){
  // variable initialize for markdown
  var markdown = document.getElementById("markdown");
  // variable for htmlpreview
  var htmlpreview = document.getElementById("htmlpreview");

  // check if markdown is hide (bacically this contition trigger When
  // we came from htmlpreview bitton to both view)
  if (markdown.style.display === 'none'){
    // show the both htmlpreview and markdown area
    htmlpreview.style.display = "block";
    markdown.style.display = "block";

    MDViewerPreview.style.width="550px";
    MDEditor.style.width = "550px";


  }

  // this condition triggers when we came from markdown button.
  if (htmlpreview.style.display === 'none'){
    // show the both htmlpreview and markdown area
    htmlpreview.style.display = "block";
    markdown.style.display = "block";

    MDViewerPreview.style.width="550px";
    MDEditor.style.width = "550px";
  }

}
