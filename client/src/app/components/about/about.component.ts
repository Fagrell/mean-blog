import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  doScroll(title: string) {
    try {
      const elements = document.getElementById(title);
      elements.scrollIntoView();
      window.scrollBy(0, -80);
    } finally {

    }
  }

  ngOnInit() {
    const title = this.activatedRoute.snapshot.queryParams['title'];
    if (!title) {
      return;
    }
    this.doScroll(title);
  }

}
