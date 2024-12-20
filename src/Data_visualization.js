import { Chart } from 'chart.js/auto';


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

    // Check if there is a header line in the file
    if(document.getElementById("header").checked){
        rows.splice(0,1);
    }

    // Store data in a 2D array 
    let csv_data =[];
    rows.forEach(row => csv_data.push(row.split(",")));

    // Push data into 3D array to enable for data to be imported from multiple files
    data_array.push(csv_data);

    try{
      //document.getElementById('Debug').innerHTML += `Rows = ${rows}, rows[0] ${rows[0]} \n`;
      //document.getElementById('Debug').innerHTML += `csv_data = ${csv_data}, csv_data[0] ${csv_data[0]}, csv_data[0][0] = ${csv_data[0][0]} \n`;
      //document.getElementById('Debug').innerHTML += `temp_data_storage = ${temp_data_storage}, temp_data_storage[0] ${temp_data_storage[0]} \n`;
      //document.getElementById('Debug').innerHTML += `data_array = ${data_array}, data_array[0] ${data_array[0]}, data_array[0][0] = ${data_array[0][0]}, data_array[0][0][0] = ${data_array[0][0][0]} \n`;
    }
    catch(e){
      alert(e);
    }

    // Find what type of plot is desired 
    const plot = document.getElementById('plot_type');
    // Plot the data
    if (plot.value == 'Bar'){
      bar_plot(data_array);
    }
    else{
      scatter_plot(data_array);
    }
}
function scatter_plot(data){
  try{
    // Get the canvas elment that will display the data
    const graph = document.getElementById("mygraph");
    // Set up dataset object in alignment with chart.js requirments
    let dataset = {datasets:[]};
    // Index used to obtain y data within loop
    let dataset_index = 0;

    data.forEach(arrays => {

        let index = 0;
        dataset['datasets'].push({ data: [], backgroundColor: 'rgb{25,0,0)', label: 'y= 2x'});

        for(let i=0; i<arrays[0].length; i++){
          // Store x and y data
          let x_data = data[dataset_index][0][i];
          let y_data = data[dataset_index][1][i];
          // Push data into dataset object in the correct format
          dataset['datasets'][dataset_index]['data'].push({x:x_data, y:y_data});

        }
        dataset_index++;
    });
    alert(`data[0] = ${data_array[0]}, data = ${data_array}`)
    // Create the chart
    new Chart(
    graph, {
    type: 'scatter',
    data: dataset,
    options: {
      scales: {
        x: {
          type: 'linear',
          position: 'bottom'
            }
          }
        }
      }
    );}
    catch(e){alert(e)}
}
function bar_plot(bar_data){
      // Get the canvas elment that will display the data
      const graph = document.getElementById("mygraph");
      // Set up dataset object in alignment with chart.js requirments
      document.getElementById("Debug").innerHTML += bar_data[1];
      let dataset = {labels: bar_data[0], datasets: [{ data: bar_data[1]}]};//, backgroundColor: ['rgba(255, 99, 132, 0.2)','rgba(255, 159, 64, 0.2)','rgba(255, 205, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(54, 162, 235, 0.2)']}]};
  
      // Create the chart
      new Chart(
      graph, {
      type: 'bar',
      data: dataset,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
            }
          }
        }
      );
}