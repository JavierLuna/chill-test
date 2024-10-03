# chill-test

A tiny library with a tiny footprint to help you run not so tiny load tests.

**Not ready to be used at all, at this point is a bored-me pet project.**

## Inspiration

While there are wonderful load testing tools around (i.e Artillery, K6, etc), they tend to go on the bloat side of the size spectrum. And if someone, idk, tries to put the entire thing in a Lambda function then the bundle size will explode. It turns out that those tools tend to care very little about size (which is understandable), but as I tried searching for new tools... it turns out that the only one that fits my use case is Artillery, but Artillery kind of doesn't want to slim down. If you are not careful when installing Artillery it will also bundle with the installation the entire "The Godfather" movie trilogy 4k restoration edition.

I was also intrigued by the "okay, how are load testing frameworks born" so I decided to take a stab at it. If I cannot make it I dont understand it right?
