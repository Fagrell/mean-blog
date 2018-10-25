import { WINDOW } from '@ng-toolkit/universal';
import { Component, OnInit , Inject} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(@Inject(WINDOW) private window: Window, 
    private activatedRoute: ActivatedRoute,
    private pageTitle: Title,
    private meta: Meta
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
    this.pageTitle.setTitle('About / Clean Qt');
    const description = "My name is Alexander Fagrell and I'm a software developer and have several years of experience using modern C++ and Qt. With this blog, I aim to deepen my knowledge by exploring the ins and outs of the Qt framework and to share my findings and conclusions";
    this.meta.updateTag({
      property: 'description',
      content: description
    });
    this.meta.updateTag({
      property: 'og:title',
      content: 'About the blog and the author'
    });
    this.meta.updateTag({
      property: 'og:description',
      content: description
    });

    const title = this.activatedRoute.snapshot.queryParams['title'];
    if (!title) {
      return;
    }
    this.doScroll(title, -80);
  }

}
