function mdViewFunction() {
  var markdown = document.getElementById("markdown");
  var htmlpreview = document.getElementById("htmlpreview");
  // conditions to set textarea
  if (markdown.style.display === "none") {
    // show the markdwon area
    markdwon.style.display = "block";

    // and hide htmlpreview area.
    htmlpreview.style.display = "none";
  } else {
    // hide the htmlpreview textarea
    htmlpreview.style.display = "none";
  }
}


function htmlViewFunction() {
  var markdown = document.getElementById("markdown");
  var htmlpreview = document.getElementById("htmlpreview");
  // conditions to set textarea
  if (htmlpreview.style.display === "none") {
    // show the htmlpreview area
    htmlpreview.style.display = "block";
    // and hide markdown area
    markdown.style.display = "none";
  } else {
    // markdown are set to hide
    markdown.style.display = "none";
  }
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

  }

  // this condition triggers when we came from markdown button.
  if (htmlpreview.style.display === 'none'){
    // show the both htmlpreview and markdown area
    htmlpreview.style.display = "block";
    markdown.style.display = "block";

  }

}
