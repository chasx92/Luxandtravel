const DB_NAME = "profilefinder_fidelity";
const DB_VERSION = 1;
const SCREENSHOT_STORE = "screenshots";

type ScreenshotRecord = {
  sessionId: string;
  screenshots: string[];
  updatedAt: string;
};

function openFidelityDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(new Error("IndexedDB is not available"));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(SCREENSHOT_STORE)) {
        db.createObjectStore(SCREENSHOT_STORE, { keyPath: "sessionId" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveFidelityScreenshots(sessionId: string, screenshots: string[]) {
  const db = await openFidelityDb();

  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(SCREENSHOT_STORE, "readwrite");
    const store = transaction.objectStore(SCREENSHOT_STORE);
    const record: ScreenshotRecord = {
      sessionId,
      screenshots,
      updatedAt: new Date().toISOString(),
    };

    store.put(record);
    transaction.oncomplete = () => {
      db.close();
      resolve();
    };
    transaction.onerror = () => {
      db.close();
      reject(transaction.error);
    };
  });
}

export async function loadFidelityScreenshots(sessionId: string): Promise<string[]> {
  const db = await openFidelityDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(SCREENSHOT_STORE, "readonly");
    const store = transaction.objectStore(SCREENSHOT_STORE);
    const request = store.get(sessionId);

    request.onsuccess = () => {
      db.close();
      const record = request.result as ScreenshotRecord | undefined;
      resolve(Array.isArray(record?.screenshots) ? record.screenshots : []);
    };

    request.onerror = () => {
      db.close();
      reject(request.error);
    };
  });
}
