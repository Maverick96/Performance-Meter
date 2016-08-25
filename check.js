function Chart(usn){
// Load the Visualization API and the corechart package.
      google.charts.load('current', {'packages':['bar']});

      // Set a callback to run when the Google Visualization API is loaded.
      google.charts.setOnLoadCallback(drawChart);

        function drawChart(){

            var data = new google.visualization.DataTable();    //Creating a DataTable where the values will be stored
            data.addColumn('number', 'Semester');      //Creating Columns for Chart
            data.addColumn('number','Percentage');
            arr = [null,0,0,0,0,0,0];     //Array to stored total marks of each sem

            //Obtain Data to be stored in the chart from the server and storing it in an array 'arr'
              $.getJSON("http://52.38.106.192:8081/result/"+usn,function(cdata){     //To get the json in javascript object notation
    
                   rep = [null];
                   c = -1;
                    $(cdata).each(function(){     //To traverse all data of the JSON file received from the server
                           if(this.subjectCode == '10CIV28' || this.subjectCode == '10CIP18')  
                             { 
                             } 
                            else
                            {
                                if(this.attempt != 1)       //For back logs we have to consider the best out of all attempts(Which will be the last attempt)
                                {   
                                    c = rep.indexOf(this.subjectCode);
                                    rep.push(this.subjectCode);     //Add repeated subject to array
                                }
                                else
                                  c = rep.indexOf(this.subjectCode); 
                                  
                                if(c == -1)      //If not a back log subject
                                  {
                                       arr[this.sem]  = arr[this.sem] + this.internalMarks + this.externalMarks;     
                                   } 
                               c = -1;   
                            }  
                        });    //Close Loop
                        
                    for(i = 1;i < arr.length;i ++)
                      {
                          if(i == 1 || i == 2)        //For sem 1 & 2 total marks is 775 and for remaining it is 900
                            arr[i] = arr[i] / 7.75;
                          else
                            arr[i] = arr[i] / 9;
                      }               
                     //Add Rows
                     for(i = 1;i < arr.length;i ++)
                      {
                        data.addRow([i,arr[i]]);
                      }

            // Set chart options
            var options = { 'title' : 'Performance Percentage',
                            width : 900,
                            height : 500,
                            animantion : {
                              duration : 1000,
                              easing : 'out',
                              "startup" : true,
                            },
                           hAxis : { 
                            titleTextStyle : {
                              color : '#FF0000',
                              fontName : 'Arial',
                              fontSize : 25,
                              bold : true
                              }
                           },
                            explorer : {
                              axis : 'Horizontal',
                              action : ['dragToZoom','rightClickToReset']}                     
                        };

              var formatter1 = new google.visualization.NumberFormat('fractionDigits');    //To display percentage in fraction and 
                  formatter1.format(data, 1);      // 1 = column index
              var formatter2 = new google.visualization.NumberFormat({suffix:'%'});     //To add suffix '%' to column 1
                  formatter2.format(data, 1);

            // Instantiate and draw our chart, passing in some options.
            var chart = new google.charts.Bar(document.getElementById('chart_div'));
            chart.draw(data, options); 
                    });   //Close getJSON
    
       }   //Close drawChart
}