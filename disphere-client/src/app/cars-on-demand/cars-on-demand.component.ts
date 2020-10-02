import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { shareReplay,map } from 'rxjs/operators';

@Component({
  selector: 'cars-on-demand',
  templateUrl: './cars-on-demand.component.html',
  styleUrls: ['./cars-on-demand.component.css']
})

export class CarsOnDemandComponent implements OnInit {

	ids$: Observable<any[]>;
	loading$: Observable<boolean>;
  	errors$: Observable<any>;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {

	  const source$ = this.apollo.query({
		query: gql`	
		{
			cars {
				id
				enginepower
			}
		}`
	  }).pipe(shareReplay(1));

	  console.log(source$);

	//this.ids$ = source$.pipe(map(result => result.data && result.data.ids));
    this.loading$ = source$.pipe(map(result => result.loading));
    this.errors$ = source$.pipe(map(result => result.errors));
}
}
