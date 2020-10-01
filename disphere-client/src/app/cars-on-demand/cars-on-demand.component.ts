import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { shareReplay,map } from 'rxjs/operators';

@Component({
  selector: 'app-cars-on-demand',
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
	  }).pipe(shareReplay(1));
  }
}
