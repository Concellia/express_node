const request = require("request");
const server = require("../index.js");

describe("musician applicartion", function() {
  it("should fail to connect if the wrong route is passed", function(done) {
    request.post("http://localhost:3090/playing", function(
      error,
      response,
      body
    ) {
      expect(response.statusCode).toEqual(404);
      expect(response.statusMessage).toEqual("Not Found");
      done();
    });
  });
  it("should be able to get all the musician from the database", function(done) {
    request.get("http://localhost:3090/playList", function(
      error,
      response,
      body
    ) {
      expect(response.statusMessage).toEqual("OK");
      expect(response.statusCode).toEqual(200);
      let result = JSON.parse(body);
      expect(result).toEqual(jasmine.any(Array));
      expect(result[0]).toEqual({ musian_id: 2, name: "Beyonce" });
      done();
    });
  });
  it("should be able to sort all the musician from the database alphabetically", function(done) {
    request.get("http://localhost:3090/sort", function(error, response, body) {
      expect(response.statusMessage).toEqual("OK");
      expect(response.statusCode).toEqual(200);
      let result = JSON.parse(body);
      expect(result).toEqual(jasmine.any(Array));
      expect(result[0]).toEqual({ musian_id: 125, name: "Aboza" });
      done();
    });
  });
  it("should be able to post a musician to the database", function(done) {
    request.post(
      "http://localhost:3090/playList",
      { json: true, body: { name: "Muringa" } },
      function(error, response, body) {
        expect(response.statusCode).toEqual(200);
        expect(response.statusMessage).toEqual("OK");
        expect(body).toEqual({ success: true });
        done();
      }
    );
  });
  it("should be able to edit the name of the musician", function(done) {
    request.put(
      "http://localhost:3090/playList",
      { json: true, body: { musian_id: 1, name: "Akone" } },
      function(error, response, body) {
        expect(response.statusCode).toEqual(200);
        expect(response.statusMessage).toEqual("OK");
        expect(body).toEqual({ success: true });
        done();
      }
    );
  });
  it("should be able to delete the musician on the databbase", function(done) {
    request.delete(
      "http://localhost:3090/playList",
      { json: true, body: { musian_id: 87 } },
      function(error, response, body) {
        expect(response.statusCode).toEqual(200);
        expect(response.statusMessage).toEqual("OK");
        expect(body).toEqual({ success: true });
        done();
      }
    );
  });
});

describe("adding songs applicartion", function() {
  it("should be able to get the song based on the musician from the database", function(done) {
    request.get("http://localhost:3090/songs/3", function(
      error,
      response,
      body
    ) {
      expect(response.statusMessage).toEqual("OK");
      expect(response.statusCode).toEqual(200);
      let result = JSON.parse(body);
      expect(result).toEqual(jasmine.any(Array));
      expect(result[0]).toEqual({ song_id: 5, song_name: "Hello" });
      done();
    });
  });
  it("should be able to add songs based on the musician to the database", function(done) {
    request.post("http://localhost:3090/songs/3/Assurance", function(
      error,
      response,
      body
    ) {
      expect(response.statusMessage).toEqual("Found");
      expect(response.statusCode).toEqual(302);
      expect(body).toEqual("Found. Redirecting to /songs");
      done();
    });
  });
  it("should be able to delete the song on the databbase", function(done) {
    request.delete(
      "http://localhost:3090/songs",
      { json: true, body: { song_id: 10 } },
      function(error, response, body) {
        expect(response.statusCode).toEqual(200);
        expect(response.statusMessage).toEqual("OK");
        expect(body).toEqual({ success: true });
        done();
      }
    );
  });
});
