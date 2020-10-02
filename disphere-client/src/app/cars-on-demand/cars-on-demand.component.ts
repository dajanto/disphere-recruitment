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

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
	  const source$ = this.apollo.query({
		query: gql`	
		{
			cars {
				id
			}
		}`
	  }).pipe(shareReplay(1));

    //this.ids$ = source$.pipe(map(result => result.data && result.data.ids));
    this.ids$ = source$.pipe(map(result => result.data.ids));

	// Debug
	//window.alert(source$.data);
}
}
