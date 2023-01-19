import chaihttp from "chai-http";
import chai from "chai";
import app from "../index.js";

chai.should();
chai.use(chaihttp);

const collector = {
  authorization: "",
};

describe("Authorization Api", () => {
  //Test Get
  describe("Login User", () => {
    it("It should return access token", (done) => {
      chai
        .request(app)
        .post("/api/authenticate")
        .send({
          email: "sonu@reunion.com",
          password: "reunion@123",
        })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("error");
          response.body.should.have.property("payload");
          collector.authorization = `Bearer ${response.body.payload.token}`;
          done();
        });
    });
    it("It should not return access token", (done) => {
      chai
        .request(app)
        .post("/api/authenticate")
        .send({
          email: "sonu1@reunion.com",
          password: "reunion@123",
        })
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.have.property("error").eq(true);
          response.body.should.have
            .property("message")
            .eq("User Not Registered!");
          response.body.should.not.have.property("payload");

          done();
        });
    });
  });
});

describe("User Api", () => {
  // Get Profile Details of current user.
  it("Get Profile Details of current user", (done) => {
    chai
      .request(app)
      .get("/api/user")
      .set({ authorization: collector.authorization })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("error").eq(false);
        res.body.should.have.property("message").eq("User Exist.");
        res.body.should.have.property("payload");
        done();
      });
  });
  it("Get Profile Details for manupulated authorization token of user", (done) => {
    chai
      .request(app)
      .get("/api/user")
      .set({ authorization: collector.authorization + "error" })
      .end((err, res) => {
        res.should.have.status(401);
        res.text.should.be.eq("Invalid Token");
        done();
      });
  });
});

// follow route
describe("follow and unfollow Api", () => {
  // Get Profile Details of current user.
  it("Follow 63c73ae9e13f95272f0b26ec by currently logged in user.", (done) => {
    chai
      .request(app)
      .put("/api/follow/63c73ae9e13f95272f0b26ec")
      .set({ authorization: collector.authorization })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("error").eq(false);
        res.body.should.have.property("message").eq("following");
        res.body.should.have.property("payload").should.be.a("object");
        done();
      });
  });
  it("Unollow 63c73ae9e13f95272f0b26ec by currently logged in user.", (done) => {
    chai
      .request(app)
      .put("/api/unfollow/63c73ae9e13f95272f0b26ec")
      .set({ authorization: collector.authorization })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("error").eq(false);
        res.body.should.have.property("message").eq("unfollow user.");
        res.body.should.have.property("payload").should.be.a("object");
        done();
      });
  });
  it("Try to Follow user does not exist 63c73ae9e13f95272f0b26ec1 by currently logged in user.", (done) => {
    chai
      .request(app)
      .put("/api/follow/63c73ae9e13f95272f0b26ec1")
      .set({ authorization: collector.authorization })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("error").eq(true);
        res.body.should.have
          .property("message")
          .eq("The profile you requested to follow is not available.");
        res.body.should.not.have.property("payload");
        done();
      });
  });
  it("Try to Unollow user does not exist Unollow 63c73ae9e13f95272f0b26ec1 by currently logged in user.", (done) => {
    chai
      .request(app)
      .put("/api/unfollow/63c73ae9e13f95272f0b26ec1")
      .set({ authorization: collector.authorization })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("error").eq(true);
        res.body.should.have
          .property("message")
          .eq("The profile you requested to unfollow is not available.");
        res.body.should.not.have.property("payload");
        done();
      });
  });
});

// post route
