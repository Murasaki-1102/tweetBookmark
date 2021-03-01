import fs from "fs";
import http from "http";
import * as firebase from "@firebase/rules-unit-testing";
import { FIREBASE_PROJECT_ID } from "@env";

process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";

const COVERAGE_URL = `http://${process.env.FIRESTORE_EMULATOR_HOST}/emulator/v1/projects/${FIREBASE_PROJECT_ID}:ruleCoverage.html`;

const getAuthedFirestore = (auth?: { uid: string } | any) =>
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

  describe("Tag", () => {
    test("SET - Authed", async () => {
      const db = getAuthedFirestore({ uid: "alice" });
      const tagRef = db.collection("users/alice/tags").doc("test");
      await firebase.assertSucceeds(
        tagRef.set({
          name: "test",
          emoji: "🙆‍♂️",
          index: 0,
          tweets: [],
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
      );
    });

    test("SET - Not Authed", async () => {
      const db = getAuthedFirestore(null);
      const tagRef = db.collection("users/alice/tags").doc("test");
      await firebase.assertFails(
        tagRef.set({
          name: "test",
          emoji: "🙆‍♂️",
          index: 0,
          tweets: [],
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
      );
    });

    test("SET - Unmatched Uid", async () => {
      const db = getAuthedFirestore({ uid: "bob" });
      const tagRef = db.collection("users/alice/tags").doc("test");
      await firebase.assertFails(
        tagRef.set({
          name: "test",
          emoji: "✅",
          index: 0,
          tweets: [],
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
      );
    });

    test("SET - IsValid by size", async () => {
      const db = getAuthedFirestore({ uid: "alice" });
      const tagRef = db.collection("users/alice/tags").doc("test");
      await firebase.assertFails(
        tagRef.set({
          emoji: "✅",
          index: 0,
          tweets: [],
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
      );
    });

    test("SET - IsValid by emoji length", async () => {
      const db = getAuthedFirestore({ uid: "alice" });
      const tagRef = db.collection("users/alice/tags").doc("test");
      await firebase.assertFails(
        tagRef.set({
          name: "test",
          emoji: "",
          index: 0,
          tweets: [],
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
      );
    });

    test("UPDATE - Matched Uid", async () => {
      const _db = getAuthedFirestore({ uid: "alice" });
      const _tagRef = _db.collection("users/alice/tags").doc("test");
      await _tagRef.set({
        name: "test",
        emoji: "✅",
        index: 0,
        tweets: [],
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      const db = getAuthedFirestore({ uid: "alice" });
      const tagRef = db.collection("users/alice/tags").doc("test");
      await firebase.assertSucceeds(
        tagRef.update({
          name: "test2",
          emoji: "✅",
          index: 0,
          tweets: [],
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
      );
    });

    test("UPDATE - Unmatched Uid", async () => {
      const _db = getAuthedFirestore({ uid: "alice" });
      const _tagRef = _db.collection("users/alice/tags").doc("test");
      await _tagRef.set({
        name: "test",
        emoji: "✅",
        index: 0,
        tweets: [],
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      const db = getAuthedFirestore({ uid: "bob" });
      const tagRef = db.collection("users/alice/tags").doc("test");
      await firebase.assertFails(
        tagRef.update({
          name: "test2",
          emoji: "✅",
          index: 0,
          tweets: [],
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
      );
    });

    test("UPDATE - IsValid", async () => {
      const _db = getAuthedFirestore({ uid: "alice" });
      const _tagRef = _db.collection("users/alice/tags").doc("test");
      await _tagRef.set({
        name: "test",
        emoji: "✅",
        index: 0,
        tweets: [],
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      const db = getAuthedFirestore({ uid: "alice" });
      const tagRef = db.collection("users/alice/tags").doc("test");
      await firebase.assertFails(
        tagRef.update({
          name: "",
          emoji: "✅",
          index: 0,
          tweets: [],
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
      );
    });

    test("DELETE - Matched Uid", async () => {
      const _db = getAuthedFirestore({ uid: "alice" });
      const _tagRef = _db.collection("users/alice/tags").doc("test");
      await _tagRef.set({
        name: "test",
        emoji: "✅",
        index: 0,
        tweets: [],
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      const db = getAuthedFirestore({ uid: "alice" });
      const tagRef = db.collection("users/alice/tags").doc("test");
      await firebase.assertSucceeds(tagRef.delete());
    });

    test("DELETE - Unmatched Uid", async () => {
      const _db = getAuthedFirestore({ uid: "alice" });
      const _tagRef = _db.collection("users/alice/tags").doc("test");
      await _tagRef.set({
        name: "test",
        emoji: "✅",
        index: 0,
        tweets: [],
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      const db = getAuthedFirestore({ uid: "bob" });
      const tagRef = db.collection("users/alice/tags").doc("test");
      await firebase.assertFails(tagRef.delete());
    });
  });
});
