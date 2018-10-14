import { WINDOW } from '@ng-toolkit/universal';
import { Component, OnInit , Inject} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(@Inject(WINDOW) private window: Window, 
    private activatedRoute: ActivatedRoute
  ) { }

  doScroll(title: string, offset: number) {
    try {
      const elements = document.getElementById(title);
      elements.scrollIntoView();
      this.window.scrollBy(0, offset);
    } finally {

    }
  }

  ngOnInit() {
    const title = this.activatedRoute.snapshot.queryParams['title'];
    if (!title) {
      return;
    }
    this.doScroll(title, -80);
  }

}
