// Storage service for handling large data using IndexedDB
// Falls back to sessionStorage for smaller data

const DB_NAME = 'seoAnalysisDB';
const STORE_NAME = 'analysisReports';
const DB_VERSION = 1;

// Initialize IndexedDB
const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject(new Error('Failed to open IndexedDB'));
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
};

// Store analysis data
export const storeAnalysisData = async (analysisId: string, data: any): Promise<void> => {
  try {
    // Try IndexedDB first for large data
    const db = await initDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    await new Promise<void>((resolve, reject) => {
      const request = store.put({ id: analysisId, data, timestamp: Date.now() });
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });

    // Also store the ID in sessionStorage for quick lookup
    try {
      sessionStorage.setItem('currentAnalysisId', analysisId);
    } catch (e) {
      console.warn('Could not store analysis ID in sessionStorage:', e);
    }
  } catch (error) {
    console.error('IndexedDB storage failed, trying sessionStorage:', error);
    
    // Fallback to sessionStorage (may fail for very large data)
    try {
      const dataString = JSON.stringify(data);
      if (dataString.length > 5 * 1024 * 1024) { // 5MB limit
        throw new Error('Data too large for sessionStorage. IndexedDB is required.');
      }
      sessionStorage.setItem('seoAnalysisData', dataString);
      sessionStorage.setItem('currentAnalysisId', analysisId);
    } catch (e) {
      console.error('sessionStorage also failed:', e);
      throw new Error('Failed to store analysis data. Data may be too large.');
    }
  }
};

// Retrieve analysis data
export const getAnalysisData = async (analysisId?: string): Promise<any | null> => {
  try {
    // If no ID provided, try to get from sessionStorage first
    if (!analysisId) {
      const storedId = sessionStorage.getItem('currentAnalysisId');
      if (storedId) {
        analysisId = storedId;
      } else {
        // Try to get from sessionStorage as fallback
        const sessionData = sessionStorage.getItem('seoAnalysisData');
        if (sessionData) {
          try {
            return JSON.parse(sessionData);
          } catch (e) {
            console.error('Error parsing sessionStorage data:', e);
          }
        }
        return null;
      }
    }

    // Try IndexedDB first
    try {
      const db = await initDB();
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      
      const data = await new Promise<any>((resolve, reject) => {
        const request = store.get(analysisId!);
        request.onsuccess = () => resolve(request.result?.data || null);
        request.onerror = () => reject(request.error);
      });

      if (data) {
        return data;
      }
    } catch (error) {
      console.warn('IndexedDB retrieval failed, trying sessionStorage:', error);
    }

    // Fallback to sessionStorage
    const sessionData = sessionStorage.getItem('seoAnalysisData');
    if (sessionData) {
      try {
        const parsed = JSON.parse(sessionData);
        // Verify ID matches if provided
        if (!analysisId || parsed.data?.data?.analysis_id === analysisId) {
          return parsed;
        }
      } catch (e) {
        console.error('Error parsing sessionStorage data:', e);
      }
    }

    return null;
  } catch (error) {
    console.error('Error retrieving analysis data:', error);
    return null;
  }
};

// Clear analysis data
export const clearAnalysisData = async (analysisId?: string): Promise<void> => {
  try {
    if (analysisId) {
      const db = await initDB();
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      store.delete(analysisId);
    }
    sessionStorage.removeItem('seoAnalysisData');
    sessionStorage.removeItem('currentAnalysisId');
  } catch (error) {
    console.error('Error clearing analysis data:', error);
  }
};

