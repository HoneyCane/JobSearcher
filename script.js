var navItems = [
  "divider",
  {"label": "Map", "screen": "map", "icon": "map"},
  "divider",
  {"label": "Chart", "screen": "chart", "icon": "pie_chart"},
  "divider",
  {"label": "Saved for later", "screen": "saved-for-later", "icon": "save"},
  "divider",
  {"label": "About", "screen": "about", "icon": "info"}
];

var joobleEndpoint = "https://us.jooble.org/api/76f25411-d4bd-4aba-bcb1-687fad2723f8";

$(document).ready(function() {
  // initialize all components with auto-init attributes
  window.mdc.autoInit();

  loadDrawerNavigationElements(navItems);

  loadScreen("search");

  // a constant that references MDCDrawer object
  const drawer = $("aside")[0].MDCDrawer;

  // open the drawer when the menu icon is clicked
  $(".mdc-top-app-bar__navigation-icon").on("click", function(){
    drawer.open = true;
  });

  // close the drawer and load the selected screen
  $("body").on('click', "nav .mdc-list-item", function (event){
    drawer.open = false;
    loadScreen($(this).attr("data-screen"));
  });

  // close the drawer and load the selected screen
  $("body").on('click', "#content .mdc-button", function (event){
    var jobTitle = $('#job-text-field').get(0).value.toString();
    var location = $('#loc-text-field').get(0).value.toString();
    $.post(joobleEndpoint,
        { "keywords": jobTitle,
          "location": location
        }, function(result) {
      console.log(result);
    });
    // loadScreen('map');
  });

});

/**
 * load nav
 * @function
 * @param {array} navItems - array of items for the drawer
 */
function loadDrawerNavigationElements(navItems) {
  $.each(navItems, function(i,v) {
    if (v == "divider") {
        var divider = $("<hr>").addClass("mdc-list-divider");
        $("nav.mdc-list").append(divider);
    } else {    // create and append an anchor to the list
      var a = $("<a>").addClass("mdc-list-item");
      if (v.hasOwnProperty("icon")) {
        var icon = $("<i>").addClass("material-icons mdc-list-item__graphic");
        icon.text(v.icon);
        a.append(icon);
        a.attr("data-screen", v.screen);
      }
      a.append(v.label);
      $("nav.mdc-list").append(a);
    }

  });

  $("nav.mdc-list a:eq(0)").addClass("mdc-list-item--activated");

}

/**
 * load screen content via AJAX
 * @function
 * @param {string} screenName - name to load, without _
 */
function loadScreen(screenName) {
  $("#content").load("./pages/" + screenName + ".html", function () {
    console.log("------ Screen load: " + screenName);
});

}
