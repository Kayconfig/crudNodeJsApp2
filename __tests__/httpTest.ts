import app from "../src/app"
import request from "supertest"

// jest.setTimeout(() => {
    
// jest.setTimeout(30000)
describe("TEST GET REQUESTS", () => {
    test("should get all companies and return 200", async () => {
      await request(app)
        .get("/company")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });

    test("should get company with valid Id and return 200", async()=>{
        const companyId = "1c2fba18-ef86-43a1-aa29-833eb8c24274";
        await request(app)
            .get(`/company/${companyId}`)
            .set("Accept", "application/json")
            .expect('Content-Type', /json/)
            .expect(200);
    });

    test("should return 404 for company id that's not in the database", async()=>{
        const invalidId = "this is an invalid Id";
        await request(app)
            .get(`/company/${invalidId}`)
            .set("Accept", "application/json")
            .expect('Content-Type', /json/)
            .expect(404);
    })
  });

  describe("TEST POST REQUEST", ()=>{
  
  test("return 400, for invalid object",
  async ()=>{
    const testObj =  `{
        "organization": "Kayode TechCorp",
        "products": [
         "Programmer",
         "Ronaldo"
        ],
        "marketValue": "60%",
        "address": "Anambra",
        "ceo": "bn",
        "country": "Nigeria",
        "noOfEmployees": 3,
        "employees": [
         "james bond",
         "chan",
         "bruce lee"
        ] }`  
    await request(app)
        .post('/company')
        .send(testObj)
        .set("Accept", "application/json")
        .expect('Content-Type', "application/json; charset=utf-8")
        .expect(400)
    });

    test("return 201, successful posting",
    async ()=>{
      const testObj =  {
          "organization": "SAMPLE TechCorp",
          "products": [
           "Programmer",
           "Ronaldo"
          ],
          "marketValue": "60%",
          "address": "Anambra",
          "ceo": "bn",
          "country": "Nigeria",
          "noOfEmployees": 3,
          "employees": [
           "james bond",
           "chan",
           "bruce lee"
          ] }
      await request(app)
          .post('/company')
          .send(testObj)
          .set("Accept", "text/plain")
          .expect('Content-Type', /json/)
          .expect(201)
      });
    
      test("return 403, for objects with incomplete company attribute",
    async ()=>{
    //     //test obj doesn't have organization and products
      const testObj =  {
 
          "marketValue": "60%",
          "address": "Anambra",
          "ceo": "bn",
          "country": "Nigeria",
          "noOfEmployees": 3,
          "employees": [
           "james bond",
           "chan",
           "bruce lee"
          ] }
      await request(app)
          .post('/company')
          .send(testObj)
          .set("Accept", "text/plain")
          .expect('Content-Type', /json/)
          .expect(403)
      });
  });

describe("TEST PUT REQUEST METHOD", ()=>{
    const companyIdToUpdate = "1c2fba18-ef86-43a1-aa29-833eb8c24274" 
    test("return 400, for string input",
    async ()=>{
      const testObj =  `{
          "organization": "Kayode TechCorp",
          "products": [
           "Programmer",
           "Ronaldo"
          ],
          "marketValue": "60%",
          "address": "Anambra",
          "ceo": "bn",
          "country": "Nigeria",
          "noOfEmployees": 3,
          "employees": [
           "james bond",
           "chan",
           "bruce lee"
          ] }` 
        
      await request(app)
          .put('/company/'+companyIdToUpdate)
          .send(testObj)
          .set("Accept", "application/json")
          .expect('Content-Type', "application/json; charset=utf-8")
          .expect(400)
      });

      test("return 400, for array input",
    async ()=>{
      const testObj =  [true,'some']
        const companyIdToUpdate = "1c2fba18-ef86-43a1-aa29-833eb8c24274" 
      await request(app)
          .put('/company/'+companyIdToUpdate)
          .send(testObj)
          .set("Accept", "application/json")
          .expect('Content-Type', "application/json; charset=utf-8")
          .expect(400)
      });
  
      test("return 201, successful update",
      async ()=>{
        const testObj =  {
            "organization": "SAMPLE TechCorp",
            "products": [
             "Programmer",
             "Ronaldo"
            ],
            "marketValue": "60%",
            "address": "Anambra",
            "ceo": "bn",
            "country": "Nigeria",
            "noOfEmployees": 3,
            "employees": [
             "james bond",
             "chan",
             "bruce lee"
            ] }
        await request(app)
            .put('/company/'+companyIdToUpdate)
            .send(testObj)
            .set("Accept", "application/json")
            .expect('Content-Type', /json/)
            .expect(201)
        });
      
        test("return 403, for company not in database - the id is not recognized",
      async ()=>{
           //test obj doesn't have organization and products
        const testObj =  {
            "marketValue": "60%",
            "address": "Anambra",
            "ceo": "bn",
            "country": "Nigeria",
            "noOfEmployees": 3,
            "employees": [
             "james bond",
             "chan",
             "bruce lee"
            ] }
        const invalidId = "I happen to be an invalid Id"
        await request(app)
            .put('/company/'+invalidId)
            .send(testObj)
            .set("Accept", "application/json")
            .expect('Content-Type', /json/)
            .expect(403)
        });
})
  
describe("TEST DELETE REQUEST METHOD", ()=>{
    test("should return 200 on successful delete", async ()=>{
        const companyIdToDelete = "1c2fba18-ef86-43a1-aa29-833eb8c24274";
        await request(app)
            .delete("/company/"+companyIdToDelete)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
    })

    test("should return 403 on unsuccessful delete", async ()=>{
        const companyIdToDelete = "Invalid Id to delete";
        await request(app)
            .delete("/company/"+companyIdToDelete)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(403)
    })
})