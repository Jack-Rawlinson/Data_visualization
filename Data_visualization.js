// Run loadfile function when a file is entered
document.getElementById("fileinput").addEventListener("change", loadfile);
let data_array = [];

function loadfile(event){
    /*
    Load data in from a CSV file
    */
    // FileReader object to handle reading in the data
    const reader = new FileReader();
    // Validate that the file entered is a csv file
    if(event.target.files[0].name.slice(-3) != "csv"){
        alert("File is not a csv");
        return
    }
    // Run load_event when file has been read, this will store the necessary data
    reader.onload = load_event;
    // Read data as a string
    reader.readAsText(event.target.files[0]);
    // Hide div for entering files and reveal div containing plotted data
    
    document.getElementById("File_input").style.display = "none";
    document.getElementById("Plot_div").style.display = "block";
}
function load_event(event){
    // Split data by rows
    let rows = event.target.result.split("\n");

    // if(document.getElementById("header").checked){
    //     rows.splice(0,1);
    // }
    // Store data in temp array to a 
    let csv_data =[];
    rows.forEach(row => csv_data.push(row.split(",")));
    // Store questions and answers in quiz_data array, false variable tells if question has already been answered or not
    csv_data.forEach(row => {data_array.push(row);});
    // Prevent user from escaping the scope of the array
    
    //if(quiz_data.length == 1){document.getElementById("next_button").disbaled = true;}
    
    // Load first question 
    
    //show_question();
    //setTimeout(timer,1000);
}