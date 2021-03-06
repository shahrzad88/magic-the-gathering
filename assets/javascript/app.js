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
var scryfall_base_api = "https://api.scryfall.com/cards/search";
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
        let card = cards[i];
        if(!card.imageUrl) {
            continue;
        }
        var scryfall_url = scryfall_base_api + "?&q=!\"" + card.name + "\"";
        $.ajax({
            url: scryfall_url,
            method: "GET"
        }).then(function (response) {
            var cardDiv = $("<div>");
            var cardName = $("<p>").text("Name: " + card.name);
            var cardCost = $("<p>").text("Mana Cost: " + card.cmc);
            var cardType = $("<p>").text("Type: " + card.types);
            var cardColor = $("<p>").text("Color: " + card.colors);
            var ebay_link = response.data[0].purchase_uris.ebay;
            var ebayIcon = $("<a>").attr('href', ebay_link);
            ebayIcon.addClass("fab fa-ebay");
            var cardImage = $("<img>").attr("src", card.imageUrl);
            var amz_link = response.data[0].purchase_uris.amazon;
            var amzIcon = $("<a>").attr('href', amz_link);
            amzIcon.addClass("fab fa-amazon");
            cardDiv.append(cardImage, cardName, cardCost, cardType, cardColor,
              ebayIcon, $("<br>"), amzIcon);
            cardDiv.addClass("newcard");
            $(".displayCards").append(cardDiv);
            $("#debug").text(mtg_base_url);
        });
    };
}

// 3. Display amazon and ebay price for each card.
    // A. Create Amazon and Ebay api calls, put in filters for both apis. 
    // B. Preset filters for amazon and ebay(etc. top rated sellers only, max
    //    price unlimited...)
    // C. Get 12 responses on price. Create loop so it can loop through price
    //    and get each attribute values on price.
    // D. Add prices into dynamic divs.
