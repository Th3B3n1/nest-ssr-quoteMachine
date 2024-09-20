import { Controller, Delete, Get, Query, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  @Get("queries")
  getQueries()
  {
    return this.appService.getQueries();
  }

  @Get("query")
  getQuery(@Query() query)
  {
    return this.appService.getQuery(Number(query.id));
  }

  @Get("deleteQuery")
  deleteQuery(@Query() query)
  {
    if (this.appService.deleteQuery(Number(query.id)))
    {
      return "Delete successful 200";
    }
    else
    {
      return "Not found 404";
    }
  }

  @Get("randomQuote")
  getRandomQuote()
  {
    return this.appService.getRandomQuote();
  }

  @Get("topAuthors")
  @Render("topAuthors")
  getTopAuthors()
  {
    console.log(this.appService.getTopAuthors())
    return {
      finalDict: this.appService.getTopAuthors()
    };
  }
}
