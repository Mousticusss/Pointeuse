
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { setHours, setMinutes } from 'date-fns';



import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import {Observable} from "rxjs/Observable";
import {DataBase} from "../../providers/database";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {getSystemData} from "@ionic/app-scripts";
import {Subject} from "rxjs/Subject";



const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};


/**
 * Generated class for the CalendarPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage  {

  refresh: Subject<any> = new Subject();
  constructor(public db:DataBase){
    this.getEvent()
  }
  view: string = 'day';
  events: CalendarEvent[]
  viewDate: Date = new Date();

  getEvent(){
    let e:CalendarEvent[]=[];
    this.db.getPeoplesWithDate().then(data  =>  console.log("data  " , data) )

    this.db.getPeoplesWithDate().then(data =>{

      console.log(" V in v " +  Object.keys(data).length);



     // if (Object.keys(data).length > 0)
      for(var i = 0; i <  Object.keys(data).length; i++ ){

       // console.log("  Object.keys(data).length " +   Object.keys(data).length);
        console.log("data[i]  " +  data[i]);
        console.log("data[i]  " +  data[i].number);
        console.log("data[i]  " +  data[i].date);
     e.push({
        title: data[i].number,
        start:  setHours(setMinutes(data[i].date, 0), 3),
        color: colors.blue
      })

    }
    }
  );
    this.events= e;
    this.refresh.next();
  }


}
