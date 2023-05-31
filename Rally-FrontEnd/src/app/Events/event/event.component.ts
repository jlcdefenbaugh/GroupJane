import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../models/event';
import { EventService } from '../services/event.service';
// import { EventViewComponent } from '../event-view/event-view.component';
import { JoinEvent } from '../models/JoinEvent';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  currentUser;
  logInStatus: Boolean;


  // private eventUrl: string;
  id: string;
  eventDetails: Event;

  joinUrl: string;
  joinedEvent: JoinEvent [] = [];
  numJoined: number = 0;
  commentDisplay: string[] = [];

  userJoined: string;


  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private eventService: EventService) {
    this.logInStatus = false;
    // this.eventUrl = 'http://localhost:8080/events/event/{id}/'
    this.joinUrl = 'http://localhost:8080/join/join/'
    this.eventDetails;
    this.id = this.route.snapshot.params['id'];

    this.joinedEvent;
    this.numJoined;
    this.commentDisplay;

    this.userJoined;

   }

  ngOnInit(): void {
    this.verifyLoggedIn();

  

    // this.eventDetails = new Event();

    // this.id = this.route.snapshot.params['id'];

    console.log(this.id);

    this.eventService.getEvent(this.id).subscribe((response: Event) => {
      this.eventDetails = response;
      console.log(response);
    
    })

    console.log(this.joinedEvent);

    this.http.get(this.joinUrl).subscribe((response: JoinEvent[]) => {
      console.log(response);
      this.joinedEvent = response;

      this.getNumJoined();
      this.getComments();

      this.getUserJoined();
     
    })

      // this.verifyOwner();



  }

  getNumJoined() {
    for(let i = 0; i < this.joinedEvent.length; i++) {
      if(this.joinedEvent[i].event.id === this.eventDetails.id) {
        this.numJoined += this.joinedEvent[i].numAttending;
      } 
    }
    return this.numJoined;
  }



  getComments() {
    for(let i = 0; i < this.joinedEvent.length; i++) {
      if(this.joinedEvent[i].event.id === this.eventDetails.id && this.joinedEvent[i].comment !== null) {
        this.commentDisplay.push(this.joinedEvent[i].comment);
      }
    }
    return this.commentDisplay;
  }

  getUserJoined() {
    for(let i = 0; i < this.joinedEvent.length; i++) {
      if(this.joinedEvent[i].userName === this.currentUser) {
        this.userJoined = this.joinedEvent[i].userName;
      }
    }
    return this.userJoined;
  }




// deleteEvent() {
//   if(confirm("Are you sure you want to delete this event?")) {
//     this.eventService.deleteEvent(this.id).subscribe(data => {
//       console.log(data);
//     })
//     this.router.navigate(["/events"])
//   .then(() => {
//     window.location.reload();
//   });
//   }
 
// }

// verifyOwner() {
//   if(this.currentUser === this.eventDetails.userName) {
//    this.ownerStatus = true;
//   }
// }


  verifyLoggedIn() {

    if (localStorage.getItem('userName') != null) {
      this.currentUser = localStorage.getItem('userName');
      this.logInStatus = true;
    }

  
  }

  logOut() {
    localStorage.clear();
    console.log(localStorage.getItem('userName'))
    this.logInStatus = false;
  }

}
