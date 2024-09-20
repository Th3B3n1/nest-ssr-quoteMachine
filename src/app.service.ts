import { Injectable } from '@nestjs/common';
import { queries } from './queries';
import { randomInt } from 'crypto';

@Injectable()
export class AppService {
  getHello(): string 
  {
    return 'Hello World!';
  }

  getQueries(): Object
  {
    return queries;
  }

  getQuery(id: number): Object
  {
    return queries.quotes[id - 1];
  }

  deleteQuery(id: number): boolean
  {
    let localQueries = queries;
    let query = localQueries.quotes.splice(id - 1, 1);
    console.log(query);
    console.log(localQueries);
    return true;
  }

  getRandomQuote(): Object
  {
    return queries.quotes[randomInt(queries.quotes.length)];
  }

  getTopAuthors(): Map<string, number>
  {
    let dict: Map<string, number> = new Map<string, number>();
    for (let i: number = 0; i < queries.quotes.length; i++)
    {
      if (dict.has(queries.quotes[i].author))
      {
        let query = dict.get(queries.quotes[i].author);
        dict.set(queries.quotes[i].author, query += 1);
      }
      else
      {
        dict.set(queries.quotes[i].author, 1)
      }
    }
    let sortedDict: [string, number][] = Array.from(dict).sort((a, b) => a[1] - b[1]);
    let finalDict: Map<string, number> = new Map(sortedDict.reverse());
    return finalDict;
  }
}
