import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { shareReplay,map,pluck } from 'rxjs/operators';

@Component({
  selector: 'cars-on-demand',
  templateUrl: './cars-on-demand.component.html',
  styleUrls: ['./cars-on-demand.component.css']
})

export class CarsOnDemandComponent implements OnInit {

	cars$: Observable<any[]>;
	loading$: Observable<boolean>;
  	errors$: Observable<any>;
	displayedColumns: string[] = ['id','brand','model','category','color','enginepower'];

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
			}
		}`
	  }).pipe(shareReplay(1));

	this.cars$ = source$.pipe(pluck('data','cars'));

    this.loading$ = source$.pipe(map(result => result.loading));

    this.errors$ = source$.pipe(map(result => result.errors));

	}
}
