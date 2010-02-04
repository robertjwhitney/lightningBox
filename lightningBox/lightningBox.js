$(document).ready(function() {
  //hide the box no matter what the current hash is
  $("#lightning").hide();
  var bolts = $("a[rel=lightning]");
  bolts.click( function() {
    $("#lightning").fadeIn("fast");
    //stash current scroll position
    $("#close").html(f_scrollTop());
  });
  
  //get some close and nav links going
  var closeLink = "<a href='javascript:void(0);' class='lightning-close'><div class='close-lightning-box'>x</div></a>";
  $("#lightning .box").each( function() {
      var boxParent = $(this).parent();
      var nextHref = boxParent.next().attr("id");
      var prevHref = boxParent.prev().attr("id");
      var navLinks = "<div id='lightning-nav'><a href=#" + prevHref + " class='prev'>&#8592; Prev</a> <a href='#" + nextHref + "' class='next'>Next &#8594;</a></div>";
      $(this).prepend(closeLink).append(navLinks);
  });
  
  //disable first and last slide nav
  $("#lightning .first #lightning-nav .prev").addClass("lightning-nav-disabled").attr('href', 'javascript:void(0);');
  $("#lightning .last #lightning-nav .next").addClass("lightning-nav-disabled").attr('href' , 'javascript:void(0);');
  
  //create some lightning transition
  $("#lightning-nav a").click( function(){
    var lightning = $("#lightning");
    lightning.animate({
        opacity: 0.5,
      }, 80, function() {
        $(this).animate({
            opacity: 1,
          }, 250);
    });
  });
  
  //close the box
  $(".lightning-close").click( function(){
    $("#lightning").fadeOut("fast");
    //grab previous scroll position
    var returnScroll = $("#lightning-close").text();
    //set scroll position back
    window.scroll(0,returnScroll);
  });
  
  //do some scroll cross-browser voodoo
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
});