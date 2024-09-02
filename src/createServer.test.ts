import { describe, expect, it } from 'vitest';
import { createServer } from './createServer';

describe('createServer', () => {
  const server = createServer();

  it('should return XML', async () => {
    const response = await server.inject({
      method: 'GET',
      path: '/',
    });

    expect(response.body).toMatchInlineSnapshot(`
      "<rss version="2.0">
      	<channel>
      		<title>Hacker News</title>
      		<link>https://news.ycombinator.com/</link>
      		<description>Links for the intellectually curious, ranked by readers.</description>
      		<item>
      			<title>Extreme Pi Boot Optimization</title>
      			<link>https://kittenlabs.de/blog/2024/09/01/extreme-pi-boot-optimization/</link>
      			<pubDate>Sun, 1 Sep 2024 21:36:55 +0000</pubDate>
      			<comments>https://news.ycombinator.com/item?id=41420597</comments>
      			<description>
      				<![CDATA[<a href="https://news.ycombinator.com/item?id=41420597">Comments</a>]]>
      			</description>
      		</item>
      		<item>
      			<title>Programming Zero Knowledge Proofs: From Zero to Hero</title>
      			<link>https://zkintro.com/articles/programming-zkps-from-zero-to-hero</link>
      			<pubDate>Fri, 30 Aug 2024 06:08:41 +0000</pubDate>
      			<comments>https://news.ycombinator.com/item?id=41398092</comments>
      			<description>
      				<![CDATA[<a href="https://news.ycombinator.com/item?id=41398092">Comments</a>]]>
      			</description>
      		</item>
      	</channel>
      </rss>"
    `);
    expect(response.statusCode).toBe(200);
  });
});
