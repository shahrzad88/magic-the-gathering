// 1. On page loads, display n default cards from MTG api. 
// A. Create MTG ajax request. give it filter variables for img url, type,
//    colour, and mana cost. Leave them empty for now.
// B. Call MTG api and get 12 responses. Create loop so it can loop through
//    results and get each attribute values.
// C. Create dynamic divs(JS, not HTML) for each response.
// D. Add class, add responses(img url, type, colour, mana cost) into dynamic
//    divs.
// E. Append dynamic divs into .displaycards div(every div id that can be
//    divided by 4 will be added a class with clear right).
// F. Empty .displaycards div later when new cards need to be displayed.
var mtg_base_url = "https://api.magicthegathering.io/v1/cards";

// 2. Based on user input from dropdown menus, includes type, colours,
//    mana cost, and names.
// A. Create user input variables, based on search criteria.
// B. Receive inputs from users, and store them into filter varialbes.
// C. Create on click function for when users click on search button they can
//    call the requests then display results in dynamic divs.
$(document).ready(function () {
    $.ajax({
        url: mtg_base_url,
        method: "GET"
    }).then(function (response) {
        renderNewCards(response.cards);
    });
    $("#submitSearch").on("click", function () {
        console.log("hello");
        $(".displayCards").empty();
        var name = $("#searchname").val();
        var color = $("#color option:selected").text();
        var types = $("#type option:selected").text();
        var cmc = $("#landCost option:selected").text();
        var mtg_url = mtg_base_url + "?&cmc=" + cmc + "&types=" + types +
          "&colors=" + color + "&name=" + name;
        console.log(mtg_url);
        $.ajax({
            url: mtg_url,
            method: "GET"
        }).then(function (response) {
            console.log(response.cards);
            renderNewCards(response.cards);
        });
    });
});

function renderNewCards(cards) {
    for (var i = 0; i < cards.length; i++) {
        var cardDiv = $("<div>");
        var cardName = $("<p>").text("Name: " + cards[i].name);
        var cardCost = $("<p>").text("Mana Cost: " + cards[i].cmc);
        var cardType = $("<p>").text("Type: " + cards[i].types);
        var cardColor = $("<p>").text("Color: " + cards[i].colors);
        var ebay_link = '';
        var ebay_price = '20';
        var ebayIcon = $("<a>").attr('href', ebay_link);
        ebayIcon.addClass("fab fa-ebay");
        var ebayPrice = $("<p>").text("$"+ ebay_price);
        var amzIcon = $("<i>").text("$20");
        amzIcon.addClass("fab fa-amazon");
        var amazonPrice = $("<span>").text("");
        //var releaseDate = $("<p>").text("Release Year: " + response.cards[i].releaseDate);
        var cardImage = $("<img>").attr("src", cards[i].imageUrl);
        cardDiv.append(cardImage, cardName, cardCost, cardType, cardColor,
          ebayIcon, ebayPrice, amzIcon, amazonPrice);
        cardDiv.addClass("newcard");
        $(".displayCards").append(cardDiv);
        $("#debug").text(mtg_base_url);
    };
}

// 3. Display amazon and ebay price for each card.
    // A. Create Amazon and Ebay api calls, put in filters for both apis. 
    // B. Preset filters for amazon and ebay(etc. top rated sellers only, max
    //    price unlimited...)
    // C. Get 12 responses on price. Create loop so it can loop through price
    //    and get each attribute values on price.
    // D. Add prices into dynamic divs.
