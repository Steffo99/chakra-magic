function illuminate() {
    let illuminateButton = document.querySelector(".chakramagic-illuminate .chakramagic-button");
    let illuminateText = document.querySelector(".chakramagic-illuminate .chakramagic-text").childNodes[0];

    const read_data = () => {
        // Get player name, use this to match it to player name from API response
        const player_name = document.getElementsByClassName("profile_small_header_name")[0].children[0].textContent;
        // Get table row
        const row_list = document.getElementById("personaldata_elements_container").querySelectorAll("tr");
        // List of word that indicate this cell means yes
        const yes_marks = [
            "Yes",
            "Да",
            "Ano",
            "Ja",
            "Kyllä",
            "Oui",
            "Ναι",
            "Igen",
            "Sì",
            "はい",
            "예",
            "Tak",
            "Sim",
            "Da",
            "是",
            "Sí",
            "ใช่",
            "Evet",
            "Так",
        ];
        // Building compacted output, first cell is player name, each cell is splitted by ,
        let all_output = encodeURIComponent(player_name) + ",";
        // Each table row
        for (let i = 1; i < row_list.length; i++) {
            const col_list = row_list[i].querySelectorAll("td");
            // td count will be 0 if this is a table header (it use th)
            if (col_list.length === 0) continue;
            // Build row output from {match id}-{indicator}-{timestamp}
            let output = "";
            output += col_list[0].textContent + "-" + col_list[1].textContent + "-";
            for (let j = 2; j < col_list.length; j++) {
                output += yes_marks.indexOf(col_list[j].textContent) !== -1 ? "1" : "0";
            }
            all_output += output + ","
        }
        // Redirect user to illuminate to have this output data shown in better format
        window.location = "https://illuminate.dotasphere.com/#" + all_output;
    };
    const load_all_data = () => {
        // Get Element Handle
        const b1 = document.getElementById("load_more_button");
        const b2 = document.getElementById("inventory_history_loading");
        // Checking if there is more data by inspecting button and loading text style
        const has_more = () => {
            return (b1 && b1.style.display !== "none") || (b2 && b2.style.display !== "none");
        };
        const has_load_more = () => b1 && b1.style.display !== "none";
        const load_more = () => b1.click();
        // Loop checking the page, if it is done, read_data()
        const watch_load_more = () => {
            const interval = setInterval(() => {
                if (has_load_more()) {
                    load_more();
                } else {
                    if (!has_more()) {
                        clearInterval(interval);
                        console.log("done");
                        read_data();
                    }
                }
            }, 100);
        };
        
        // Start checking loop
        watch_load_more();
    };

    illuminateButton.setAttribute("disabled", "");
    illuminateButton.onclick = null;
    illuminateButton.setAttribute("class", "chakramagic-button chakramagic-running")

    illuminateText.nodeValue = "Loading all data..."

    load_all_data();
}

function chakraMagic() {
    let parentElement = document.querySelector("#mainContents");
    let beforeElement = document.querySelector("#personaldata_elements_container")

    let chakraElement = document.createElement("div");
    parentElement.insertBefore(chakraElement, beforeElement);
    chakraElement.setAttribute("class", "chakramagic-container");

    let illuminateElement = document.createElement("div");
    chakraElement.appendChild(illuminateElement);
    illuminateElement.setAttribute("class", "chakramagic-service chakramagic-illuminate");
    
    let illuminateButton = document.createElement("div");
    illuminateElement.appendChild(illuminateButton);
    illuminateButton.setAttribute("class", "chakramagic-button");
    illuminateButton.onclick = illuminate;

    let illuminateImage = document.createElement("img");
    illuminateButton.appendChild(illuminateImage);
    illuminateImage.setAttribute("src", "http://cdn.dota2.com/apps/dota2/images/abilities/keeper_of_the_light_illuminate_hp2.png");
    illuminateImage.setAttribute("class", "chakramagic-image");

    let illuminateText = document.createElement("span");
    illuminateElement.appendChild(illuminateText);
    illuminateText.appendChild(document.createTextNode("Parse data with Illuminate"));
    illuminateText.setAttribute("class", "chakramagic-text chakramagic-illuminate");
}

chakraMagic();
