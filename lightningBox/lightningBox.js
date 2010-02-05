$(function(){
  $("body").append("<ul id='lightning'></ul>");
  $("#lightning").hide();
  var bolts = $("a[rel='lightning']");
  var boltCount = bolts.length;
  var lightning = $("#lightning");
  var bolt = [];
  var jLink = [];
  var scrollPos = "";
  bolts.each( function() {
    bolt.push(this)
  });
  for (var j = 0; j < boltCount; j++) {
    jLink[j] = AddSlide( bolt[j], j, "alt");
  };
  var i = 0;
  //Make links open lightbox instead
  bolts.each( function() { 
    $(this).attr("href", "#slide" + i);
    i++;
  });
  bolts.click( function(){
    lightning.fadeIn();
    scrollPos = f_scrollTop();
  });  
  $(".close-lightning-box").click( function() {
    lightning.fadeOut();
    window.scroll(0, scrollPos);
  });  
  //disable first and last links
  $("#lightning li:first-child #lightning-nav #prev").addClass("lightning-nav-disabled").attr('href', 'javascript:void(0);');
  $("#lightning li:last-child #lightning-nav #next").addClass("lightning-nav-disabled").attr('href' , 'javascript:void(0);');
  //add some animation
  $("#lightning-nav a").click( function(){
    lightning.animate({
        opacity: 0.9,
      }, 80, function() {
        $(this).animate({
            opacity: 1,
          }, 250);
    });
  });
});
// Add Slide to DOM.
function AddSlide( imgHref, intID, alt) {
  var jParent = $( "ul#lightning" );
  var jListItem = $( "<li id='slide" + intID + "'></li>" );
  var jbox = $( "<div class='box'><img src='" + imgHref + "' /></div>");
  var jLink = $( "<img src='" + imgHref + "' />" );
  var jclose = $( "<div class='close-lightning-box'>x</div>");
  var jnav = $("<div id='lightning-nav'><a href='#slide" + (intID - 1) + "' alt='previous' id='prev'>&#8592; Prev</a><a href='#slide" + (intID + 1) + "' alt='next' id='next'>Next &#8594;</a></div>");
  // Associate data with this slide.
  jLink.data( "Data", {
    Href: imgHref,
    ID: intID,
    alt: alt
  }); 
  // Add the slides to the list item and add the list item to the DOM.
  jParent.append( jListItem.append( jbox.prepend(jclose).append(jnav) ) );
  // Return new slide.
  return( jLink );
}
//do some cross-browser scroll position magic
function f_scrollTop() {
  return f_filterResults (
    window.pageYOffset ? window.pageYOffset : 0,
    document.documentElement ? document.documentElement.scrollTop : 0,
    document.body ? document.body.scrollTop : 0
  );
}
function f_filterResults(n_win, n_docel, n_body) {
  var n_result = n_win ? n_win : 0;
  if (n_docel && (!n_result || (n_result > n_docel)))
    n_result = n_docel;
  return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
}