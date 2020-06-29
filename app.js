
  // 1. Use the D3 library to read in `samples.json`.

   //2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
   
  // * Use `sample_values` as the values for the bar chart.
   
   //* Use `otu_ids` as the labels for the bar chart.
   
  // * Use `otu_labels` as the hovertext for the chart.

  var url = "samples.json";
  function builddata(id){
    var resultArray = allData.metadata.filter(sample => sample.id == id);
    metadata = resultArray[0];
    var pannel = d3.select("#sample-metadata");
    pannel.html("");
    pannel.append("h6").text("id :" + metadata.id);
    pannel.append("h6").text("ethnicity :" + metadata.ethnicity);
    pannel.append("h6").text("gender :" + metadata.gender);
    pannel.append("h6").text("location :" + metadata.location);
    pannel.append("h6").text("bbtype :" + metadata.bbtype);
    pannel.append("h6").text("age :" + metadata.age);
    pannel.append("h6").text("wfreq :" + metadata.wfreq);
    plotHistorgram(id);
    plotBubble(id);
  }

  function plotHistorgram(id){
    var resultArray = allData.samples.filter(sample => sample.id == id);
    var result = resultArray[0];

    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;

    //console.log(otu_labels)
    var trace = [
      {
        x: sample_values.slice(0,10).reverse(),
        y: otu_ids.slice(0,10).map(OTUID => 'OTU ' + OTUID).reverse(),
        text: otu_labels.slice(0,10).reverse(),
        marker: {color: 'blue'},
        type:"bar",
        orientation: "h",
    }];

    var layout = {
      title: "Top 10 OTU",
      yaxis:{
          tickmode:"linear",
      },
      margin: {
        l: 100,
         r: 100,
         t: 100,
         b: 30
     }
    };
    Plotly.newPlot("bar-div", trace, layout);
  }

 



  function plotBubble(id){
    //d3.json("sample.json").then((data)=>{
    var resultArray = allData.samples.filter(sample => sample.id == id);
    var result = resultArray[0];

    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;

    //console.log(otu_labels)
    var trace = [
      {
        x: sample_values.slice(0,10).reverse(),
        y: otu_ids.slice(0,10).map(OTUID => 'OTU ' + OTUID).reverse(),
        text: otu_labels.slice(0,10).reverse(),
        marker: {color: 'blue'},
        type:"bar",
        orientation: "h",
    }];

    var layout = {
      title: "Top 10 OTU",
      yaxis:{
          tickmode:"linear",
      },
      margin: {
        l: 100,
         r: 100,
         t: 100,
         b: 30
     }
    };

    var trace1 = [
      {

      x: otu_ids,
      y: sample_values,
      mode: "markers",
      marker: {
          size: sample_values,
          color:otu_ids,
          colorscale: "Earth"
      },
      text: otu_labels
    }
  ];
    var layout1 = {
      title: "Bacteria",
      xaxis:{title: "OTU ID"},
      //height:600,
      //width: 1000
      margin:{t:0},
      margin: {t:30}
     };
    

    Plotly.newPlot("bubble", trace1, layout1);



  }



  function optionChanged(newdata){
    //plotHistorgram(newdata);
    builddata(newdata);
    plotHistorgram(newdata);
    plotBubble(newdata);
  }



  var allData;

  function init(){
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");
    //Reading the json file
    d3.json("samples.json").then(function(data){
      allData = data;
      // get the id data to the dropdwown menu
      data.names.forEach(function(name) {
        dropdown.append("option").text(name).property("value", name);
      }); 

      // call the functions to display the data and the plots to the page
      builddata(data.metadata[0].id);
      plotHistorgram(data.metadata[0].id);
      plotBubble(data.names[0]);

  });
}



   init(); 


     //![bar Chart](Images/hw01.png)

     
     
     
     
     
     
        
       
     
       
     
     
       