import { Component, OnInit } from '@angular/core';
import { TripItineraryService } from '../../services/trip-itinerary.service';
import { MatDialog } from '@angular/material';
import { TripPlanningPropertiesComponent } from '../trip-planning-properties/trip-planning-properties.component';
import { ITripProperties } from '../../interfaces/trip-planning-properties';
import { IItinerary } from '../../interfaces/trip-itinerary';
import { TripSummaryService } from '../../services/trip-summary.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {

  public timeWindowDeliveryTrips = [];
  public vrpWithCCTrips = [];
  public vrpWithDVTrips = [];
  public otherTrips = [];
  public dataSource;
  public selectedAlgo;
  public orders;
  public userName;
  public properties: ITripProperties;
  public algorithms = ['Time Window Delivery', 'VRP with Capacity constraint', 'VRP with Dropping Visit'];
  public tripDate = new Date().toDateString; // trip ititnerary pipe

  single1: any[];
  single2: any[];
  single3: any[];
  single4: any[];

  public distanceCover = [];
  public totaltTime = [];
  public totalExpense = [];
  public nTrips = []; 
  public algorithm = [];

  view: any[] = [700,400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  yAxisLabel = 'Total Distance';
  xAxisLabel = 'Algorithm'
  // yAxisLabel2 = 'Total Time';
  // yAxisLabel3 = 'Total Expense';
  // yAxisLabel4 = 'Total Trips';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private tripService: TripItineraryService, private tripsummary: TripSummaryService,  private dialog: MatDialog) { }

  onSelect(event) {
    console.log(event);
  }

  ngOnInit() {
    this.properties = this.tripService.planningProperties;
    // console.log('Trip planning properties inside trip-details component-----> ');
    // console.log(this.properties);
    this.tripService.behaviourSubject.subscribe(data => {
      this.dataSource = data;

      data.forEach(d => {
        if (d.algorithm === 'VrpWithTimeWindowDelivery') {
          this.timeWindowDeliveryTrips.unshift(d);
        } 
        else
        if (d.algorithm === 'VrpWithCapacityConstraint') {
          this.vrpWithCCTrips.unshift(d);
        } else
        if (d.algorithm === 'VrpWithDroppingVisit') {
          this.vrpWithDVTrips.unshift(d);
        } else {
          this.otherTrips.unshift(d);
        }

      });

    });

    this.tripsummary.behaviourSubject.subscribe(data => {
      data.forEach((d) => {
          d.distanceSummary.forEach(summary => {
            this.distanceCover.push(summary);
          });

          d.timeSummary.forEach(summary => {
            this.totaltTime.push(summary);
          });

          d.costSummary.forEach(summary => {
            this.totalExpense.push(summary);
          });

          d.nTrips.forEach(summary => {
            this.nTrips.push(summary);
          });

          d.algorithms.forEach(summary => {
            this.algorithm.push(summary);
          });
        },
      // )}
    // );
   
    this.single1 = [
    //   {
    //     "name": this.algorithm[0],
    //     "value": this.distanceCover[0]

    //   },
    //   {
    //     "name": this.algorithm[1],
    //     "value": this.distanceCover[1]

    //   },
    //   {
    //     "name": this.algorithm[2],
    //     "value": this.distanceCover[2]
    //   }
    // ]
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    },
    {
      "name": "France",
      "value": 7200000
    }
  ]

      )}
    );

    // this.single2 = [
    //   {
    //     "name": this.algorithm[0],
    //     "value": this.totaltTime[0]
    //   },
    //   {
    //     "name": this.algorithm[1],
    //     "value": this.totaltTime[1]
    //   },
    //   {
    //     "name": this.algorithm[2],
    //     "value": this.totaltTime[2]
    //   }
    // ]

    // this.single3 = [
    //   {
    //     "name": this.algorithm[0],
    //     "value": this.totalExpense[0]
    //   },
    //   {
    //     "name": this.algorithm[1],
    //     "value": this.totalExpense[1]
    //   },
    //   {
    //     "name": this.algorithm[2],
    //     "value": this.totalExpense[2]
    //   }
    // ]

    // this.single4 = [
    //   {
    //     "name": this.algorithm[0],
    //     "value": this.nTrips[0]
    //   },
    //   {
    //     "name": this.algorithm[1],
    //     "value": this.nTrips[1]
    //   },
    //   {
    //     "name": this.algorithm[2],
    //     "value": this.nTrips[2]
    //   }
    // ]
    // console.log(this.dataSource);
}

  

  changeAlgo(algo: string) {
    this.selectedAlgo = algo;
    this.tripService.selectedAlgo = this.selectedAlgo;
    // console.log(this.selectedAlgo);
  }

  // openPropertiesDialog(): void {
  //   const dialogRef = this.dialog.open(TripPlanningPropertiesComponent, {
  //     width: '65%',
  //     data: {userName: this.userName, properties: this.properties}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     this.properties = this.tripService.planningProperties;
  //     // console.log(this.tripService.planningProperties, this.properties);
  //   });
  // }

}
