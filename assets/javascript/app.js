// 1. On page loads, display n default cards from MTG api. 
    // A. Create MTG ajax request. give it filter variables for img url, type, colour, and mana cost. Leave them empty for now.
    // B. Call MTG api and get 12 responses. Create loop so it can loop through results and get each attribute values.
    // C. Create dynamic divs(JS, not HTML) for each response.
    // D. Add class, add responses(img url, type, colour, mana cost) into dynamic divs.
    // E. Append dynamic divs into .displaycards div(every div id that can be divided by 4 will be added a class with clear right).
    // F. Empty .displaycards div later when new cards need to be displayed.

        var MTGapi = "https://api.magicthegathering.io/v1/cards";

        $.ajax({
          url: MTGapi,
          method: "GET"
        }).then(function(response) {

            for (var i = 0; i < response.cards.length; i++) {
           
              var cardDiv = $("<div>");
              var cardName = $("<p>").text("Name: " + response.cards[i].name);
              var cardCost =$("<p>").text("Mana Cost: " + response.cards[i].cmc);
              var cardType =$("<p>").text("Type: " + response.cards[i].types);
              var cardColor =$("<p>").text("Color: " + response.cards[i].colors);
              var amzIcon = $("<i>");
              amzIcon.addClass('fab fa-amazon');
            //   var releaseDate = $("<p>").text("Release Year: " + response.cards[i].releaseDate);
              var cardImage = $("<img>").attr("src",response.cards[i].imageUrl); 

                  cardDiv.append(cardImage, cardName, cardCost, cardType, cardColor, ebayPrice, amzIcon);
                  cardDiv.addClass("newcard");
              
              $(".displayCards").append(cardDiv);
            };
            });



// 2. Based on user input from dropdown menus, includes type, colours, mana cost, and names.
    // A. Create user input variables, based on search criteria.
    // B. Receive inputs from users, and store them into filter varialbes.
    // C. Create on click function for when users click on search button they can call the requests then display results in dynamic divs.

    $( document ).ready(function() {

        $("#submitSearch").on("click", function() {
            $(".displayCards").empty();

        //   alert("working");
        var cmc = $( "#landCost option:selected" ).text();
        var types = $( "#type option:selected" ).text();
        var color = $( "#color option:selected" ).text();
        var name = $("#searchname").val();
        // var releaseDate = $("#releaseYear").val();
       
            var MTGapi = "https://api.magicthegathering.io/v1/cards?&" + "cmc=" + cmc + "&types=" + types + "&colors=" + color + "&name=" + name;

        $.ajax({
          url: MTGapi,
          method: "GET"
        }).then(function(response) {

            for (var i = 0; i < response.cards.length; i++) {
           
              var cardDiv = $("<div>");
              var cardName = $("<p>").text("Name: " + response.cards[i].name);
              var cardCost =$("<p>").text("Mana Cost: " + response.cards[i].cmc);
              var cardType =$("<p>").text("Type: " + response.cards[i].types);
              var cardColor =$("<p>").text("Color: " + response.cards[i].colors);
              var cardImage = $("<img>").attr("src",response.cards[i].imageUrl); 

                  cardDiv.append(cardImage, cardName, cardCost, cardType, cardColor);
                  cardDiv.addClass("newcard");
              
              $(".displayCards").append(cardDiv);
              $("#debug").text(MTGapi);
            };
        });
        });
    });

// 3. Display amazon and ebay price for each card.
    // A. Create Amazon and Ebay api calls, put in filters for both apis. 
    // B. Preset filters for amazon and ebay(etc. top rated sellers only, max price unlimited...)
    // C. Get 12 responses on price. Create loop so it can loop through price and get each attribute values on price.
    // D. Add prices into dynamic divs.