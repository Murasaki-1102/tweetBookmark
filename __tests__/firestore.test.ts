import fs from "fs";
import http from "http";
import * as firebase from "@firebase/rules-unit-testing";
import { FIREBASE_PROJECT_ID } from "@env";

process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";

const COVERAGE_URL = `http://${process.env.FIRESTORE_EMULATOR_HOST}/emulator/v1/projects/${FIREBASE_PROJECT_ID}:ruleCoverage.html`;

const getAuthedFirestore = (auth?: { uid: string } | null) =>
  firebase
    .initializeTestApp({ projectId: FIREBASE_PROJECT_ID, auth })
    .firestore();

beforeAll(async () => {
  const rules = fs.readFileSync("firestore.rules", "utf8");
  await firebase.loadFirestoreRules({
    projectId: FIREBASE_PROJECT_ID,
    rules,
  });
});

afterAll(async () => {
  await Promise.all(firebase.apps().map((app) => app.delete()));

  const coverageFile = "firestore-coverage.html";
  const fstream = fs.createWriteStream(coverageFile);
  await new Promise((resolve, reject) => {
    http.get(COVERAGE_URL, (res) => {
      res.pipe(fstream, { end: true });
      res.on("end", resolve);
      res.on("error", reject);
    });
  });
});

describe("FIRESTORE - TEST", () => {
  afterEach(async () => {
    await firebase.clearFirestoreData({ projectId: FIREBASE_PROJECT_ID });
  });

  describe("User", () => {
    test("SET - Authed", async () => {
      const db = getAuthedFirestore({ uid: "alice" });
      const userRef = db.collection("users").doc("alice");
      await firebase.assertSucceeds(
        userRef.set({
          uid: "alice",
          name: "alice",
          photoUrl: "https://google.com",
        })
      );
    });

    test("SET - Not Authed", async () => {
      const db = getAuthedFirestore(null);
      const userRef = db.collection("users").doc("alice");
      await firebase.assertFails(
        userRef.set({
          uid: "alice",
          name: "alice",
          photoUrl: "https://google.com",
        })
      );
    });

    test("SET - IsValid by size", async () => {
      const db = getAuthedFirestore({ uid: "alice" });
      const userRef = db.collection("users").doc("alice");
      await firebase.assertFails(
        userRef.set({
          uid: "alice",
          name: "alice",
        })
      );
    });

    test("SET - IsValid by type", async () => {
      const db = getAuthedFirestore({ uid: "alice" });
      const userRef = db.collection("users").doc("alice");
      await firebase.assertFails(
        userRef.set({
          uid: "alice",
          name: "alice",
          photoUrl: 2,
        })
      );
    });

    test("GET - Authed", async () => {
      const db = getAuthedFirestore({ uid: "alice" });
      const userRef = db.collection("users").doc("alice");
      await firebase.assertSucceeds(userRef.get());
    });

    test("GET - Not Authed by null", async () => {
      const db = getAuthedFirestore(null);
      const userRef = db.collection("users").doc("alice");
      await firebase.assertFails(userRef.get());
    });

    test("GET - Not Authed", async () => {
      const db = getAuthedFirestore({ uid: "alice" });
      const userRef = db.collection("users").doc("bob");
      await firebase.assertFails(userRef.get());
    });
  });
});
