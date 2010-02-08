$(function(){
  $("body").append("<ul id='lightning'></ul>");
  $("#lightning").hide();
  var bolts = $("a[rel='lightning']");
  var boltCount = bolts.length;
  var lightning = $("#lightning");
  var bolt = [];
  var jLink = [];
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
  });  
  $(".close-lightning-box").click( function() {
    lightning.fadeOut();
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