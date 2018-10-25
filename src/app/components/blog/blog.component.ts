import { WINDOW } from '@ng-toolkit/universal';
import { Component, OnInit , Inject} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { TransferState, makeStateKey, Title, Meta } from '@angular/platform-browser';

const STATE_KEY_TITLE = makeStateKey('title');
const STATE_KEY_BODY = makeStateKey('body');
const STATE_KEY_CREATED_BY = makeStateKey('created by');
const STATE_KEY_CREATED_AT = makeStateKey('created at');
const STATE_KEY_TAGS = makeStateKey('tags');
const STATE_KEY_HREF = makeStateKey('href');

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  public href: string = "";
  public shareHref: string = "";
  title: String = "";
  body: String = "";
  createdBy: String = "";
  createdAt: Date;
  tags: Array<string>;

  constructor(@Inject(WINDOW)
    private window: Window, 
    private router: Router,
    private route: ActivatedRoute,
    private blog: BlogService,
    private state: TransferState,
    private pageTitle: Title,
    private meta: Meta
  ) {}

  newBlogForm() {
    this.router.navigate(['/blog-edit']);
  }

  updatedSEOData() {
    this.updatedTitle();
    this.updateDescription();
  }

  updatedTitle() {
    this.pageTitle.setTitle(this.title + ' / Clean Qt');
  }

  updateDescription() {
    const tags = this.tags.join(', ');
    const description = 'Blog post covering: ' + tags;
    this.meta.updateTag({
      property: 'description',
      content: description
    });
    this.meta.updateTag({
      property: 'og:title',
      content: this.title.toString()
    });
    this.meta.updateTag({
      property: 'og:description',
      content: description
    });

    this.meta.updateTag({
      property: 'og:author',
      content: this.createdBy.toString()
    });

  }

  getHref(title) {
    return 'https://www.cleanqt.io/blog/' + this.route.snapshot.url[1];
  }

  getBlog(title) {
    this.blog.oneBlog(title).subscribe(data => {
      if(!data['success']) {
        this.router.navigate(['/home'], { skipLocationChange: true });
        return;
      }

      if (!data['blog'].public) {
        this.router.navigate(['/home'], { skipLocationChange: true });
        return;
      }

      this.title = data['blog'].title;
      this.state.set(STATE_KEY_TITLE, this.title as String);
      this.body = data['blog'].body;
      this.state.set(STATE_KEY_BODY, this.body as String);
      this.createdBy = data['blog'].createdBy;
      this.state.set(STATE_KEY_CREATED_BY, this.createdBy as String);
      this.createdAt = data['blog'].createdAt;
      this.state.set(STATE_KEY_CREATED_AT, this.createdAt as Date);
      this.tags = data['blog'].tags;
      this.state.set(STATE_KEY_TAGS, this.tags as Array<string>);

      
      this.href = this.getHref(title);
      this.state.set(STATE_KEY_HREF, this.href as string);
      this.updatedSEOData();

      if (!this.window) {
        return;
      }
      this.window.scroll(0,0);
      this.shareHref = this.window.location.href;
    });
  }

  ngOnInit() {
    this.title = this.state.get(STATE_KEY_TITLE, null as String);
    this.body = this.state.get(STATE_KEY_BODY, null as String);
    this.createdBy = this.state.get(STATE_KEY_CREATED_BY, null as String);
    this.createdAt = this.state.get(STATE_KEY_CREATED_AT, null as Date);
    this.tags = this.state.get(STATE_KEY_TAGS, null as Array<string>);
    this.href = this.state.get(STATE_KEY_HREF, null as string);

    this.route.params.subscribe(params => {

      const title = params['title'];
      if (!title) {
        this.router.navigate(['/home'], { skipLocationChange: true });
        return;
      }

      const href = this.getHref(title);
      if (!this.body || href != this.href) {
        this.getBlog(title);
        return;
      }
      
      this.updatedSEOData();

    });
  }

}
