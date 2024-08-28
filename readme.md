# JavaScript Developer Technical Exercise

## Task

We'd like to track scroll depth through a news article webpage. When a user scrolls their window to 25%, 50%, 100% of the article body we'd like to inform them of their current progress.
Write a JavaScript program that will dispatch an event to the window object at each of these scroll offsets. Include the offset percentage in the details of the event.

You may choose a design pattern that you think is most appropriate for this task and can explain in interview.
Please use the following article as input. We should be able to load your JS program on to the page for testing.

[Article](https://metro.co.uk/2024/08/10/pointless-london-gallery-crowned-uks-biggest-tourist-let-down-21393090/)

## Notes

I have scraped the HTML from the article above. The script is also added to the page.

```
<script src='/src/index.js'></script>
```

I have built a class that will track a user's scroll throughout the article and will dispatch events at 25%, 50% and 100%.

I have also added attention time to these events to provide more data to the user's scroll behaviour. This data can be pushed into a data collection server and the quality of the article can be measured via scrolldepth & attention time.

Design pattern used: Observer
