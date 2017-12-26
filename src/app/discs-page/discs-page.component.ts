import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import Disc from './model/Disc';
import 'rxjs/add/operator/toPromise';

const CurrentDiscsForLayout = gql`
  query CurrentDiscsForLayout {
    discs {
          title
          artist
          year
          id
      }
    }
`;

const submitNewDisc = gql`
  mutation CreateDiscMutation ($input: CreateDisc!) {
    createDiscMutation(input: $input) {
        title
        artist
        year
        id
    }
  }
`;

@Component({
  selector: 'app-discs-page',
  templateUrl: './discs-page.component.html',
  styleUrls: ['./discs-page.component.css']
})
export class DiscsPageComponent implements OnInit {
  loading: boolean;
  data: any;
  discs: [Disc];
    public id: number;
    public title: string;
    public artist: string;
    public year: number;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.data = this.apollo.watchQuery<any>({
      query: CurrentDiscsForLayout
    }).valueChanges;
    this.data.subscribe(({data}) => {
      this.loading = data.loading;
      this.discs = data.discs;
    });
  }

  btnAdd(): void {
    const newDisc = new Disc();
    newDisc.id = this.id;
    newDisc.title = this.title;
    newDisc.artist = this.artist;
    newDisc.year = this.year;
    // call the mutation in order to create the new disc
    this.apollo.mutate({ mutation: submitNewDisc, variables: { input: newDisc } }).subscribe(({ data }) => {
      console.log('got data', data);
      this.discs = data.createDiscMutation;
    }, (error) => {
      console.log('there was an error sending the query', error);
    });

    this.id = null;
    this.title = null;
    this.artist = null;
    this.year = null;
  }
}
