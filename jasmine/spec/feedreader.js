/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        //Ensures that url is defined and is not empty
        it("have URLs defined and not empty", function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        // Ensures that name is defined and is not empty
        it("have names defined and not empty", function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    //'The menu' test suite tests the visibility of the menu element
    describe('The menu', function() {
        //Ensures that the menu element is hidden by default
        it('menu is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        //Ensures that the visibility of the menu element is toggled
        //on click
        it('menu is toggled off or on the screen', function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toEqual(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });
    });

    //The 'Initial Entries' test suite ensures that the feed container
    //always has at least one entry in the feed container
    describe('Initial Entries', function() {

        //before the testing framework is run, the loadFeed() function should have
        //been invoked
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        //Ensures that the feed container has atleast one entry from the
        //the Ajax response
        it('feed container has atleast 1 entry', function() {
            var entryNumber = $('.feed .entry').length;
            expect(entryNumber).toBeGreaterThan(0);
        });
    });

    //The 'New Feed Selection' test suite ensures that the content is changed
    //,every time a new RSS feed is loaded.
    describe("New Feed Selection", function() {
        var initFeedSelection;

        //before the testing framework is run, the loadFeed() function should have
        //been invoked
        beforeEach(function(done) {
            loadFeed(0, function() {
                initFeedSelection = document.querySelector(".feed").innerHTML;

                loadFeed(1, function() {
                    done();
                });
            });
        });

        //ensures that the content is changed everytime new RSS Feed is loaded
        it("content gets changed every time a new RSS feed is loaded", function(done) {
            var newFeedSelection = document.querySelector(".feed").innerHTML;
            expect(initFeedSelection).not.toBe(newFeedSelection);
            done();
        });
    });

}());
