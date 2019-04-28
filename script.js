var navItems = [
  "divider",
  {"label": "List", "screen": "list", "icon": "list"},
  {"label": "Chart", "screen": "chart", "icon": "pie_chart"},
  {"label": "Saved for later", "screen": "saved-for-later", "icon": "save"},
  "divider",
  {"label": "About", "screen": "about", "icon": "info"}
];

var jobTitle;
var jobLocat;
var page = 1;

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
    jobTitle = $('#job-text-field').get(0).value.toString();
    jobLocat = $('#loc-text-field').get(0).value.toString();
    var url = "https://us.jooble.org/api/";
    var key = "76f25411-d4bd-4aba-bcb1-687fad2723f8";
    var params = "{ keywords: '" + jobTitle +
                "', location: '" + jobLocat +
                "', page: '" + page + "'}";

    //create xmlHttpRequest object
    var http = new XMLHttpRequest();
    //open connection. true - asynchronous, false - synchronous
    http.open("POST", url + key, true);

    //Send the proper header information
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    //Callback when the state changes
    http.onreadystatechange = function() {
    	if(http.readyState == 4 && http.status == 200) {
        var result = JSON.parse(http.responseText);
        displayJobs(result);
    	}
    }
    //Send request to the server
    http.send(params);
  });

});

/**
 * displayJobs
 * @function
 * @param {array} arr - JSON of jobs for the cards
 */
function displayJobs(arr) {
  loadScreen('list');

  $.each(arr.jobs, function(index, value) {
    var card = $("#content template").clone();
    card.removeClass("template");

    $("#content").append(card);

    console.log(index, value);
  });

  $("#content .mdc-typography--headline3").text(arr.totalCount + " Total Results");

  window.mdc.autoInit();
}


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
