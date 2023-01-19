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
