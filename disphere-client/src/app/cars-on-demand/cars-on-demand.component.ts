import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { shareReplay,map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './cars-on-demand.component.html',
  styleUrls: ['./cars-on-demand.component.css']
})

export class CarsOnDemandComponent implements OnInit {

	carIDs$: Observable<any[]>;
	loading$: Observable<boolean>;
	errors$: Observable<any>;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
	  const source$ = this.apollo.query({
		query: gql`	
		{
			cars {
				id
				brand
				model
				category
				color
				enginepower
				hastrailhitch
				drivers
			}
		}`
	  }).subscribe();
  }
}
